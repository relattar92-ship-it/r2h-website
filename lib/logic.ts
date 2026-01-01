/**
 * THE ENGINE - Core Engineering Logic
 * Compliance: IEC 60364, DEWA Regulations v2.0
 */

// --- CONSTANTS ---

// Ambient Temperature Adjustment Factor for 50°C (DEWA Standard)
// Assuming XLPE insulation, Cables in air
const K_TEMP_50C = 0.82;

// Voltage Drop Limits
const VD_LIMIT_SUBMAIN = 4.0; // %
const VD_LIMIT_LIGHTING = 2.5; // %

// --- TYPES ---

export type MotorType = 'DOL' | 'Star-Delta' | 'VFD';

export interface MotorCalculationResult {
    iRun: number;
    iStart: number;
    suggestedBreaker: number; // Amps
    suggestedCable: string; // mm2
    protectionSetting: number; // Ir
}

export interface VoltageDropResult {
    dropVolts: number;
    dropPercent: number;
    isCompliant: boolean;
}

// --- CABLE SIZING ENGINE ---

/**
 * Calculates current carrying capacity requirements with derating.
 * @param loadCurrent Load Current in Amperes
 * @returns Minimum current carrying capacity required (Iz)
 */
export function calculateRequiredAmpacity(loadCurrent: number): number {
    // Iz = Ib / (K_temp * ...)
    // Simplified for this MVP to just Temperature derating for 50C
    return loadCurrent / K_TEMP_50C;
}

/**
 * Basic look-up for Cu/XLPE/PVC cables (Simplified Table)
 * Returns cable size in mm2.
 */
export function suggestCableSize(requiredAmpacity: number): string {
    // Approximate ratings for Multicore Cu/XLPE in air at 30C base (before derating applied in logic)
    const cableTable = [
        { size: '1.5', amps: 24 },
        { size: '2.5', amps: 33 },
        { size: '4', amps: 45 },
        { size: '6', amps: 57 },
        { size: '10', amps: 76 },
        { size: '16', amps: 96 },
        { size: '25', amps: 127 },
        { size: '35', amps: 157 },
        { size: '50', amps: 190 },
        { size: '70', amps: 242 },
        { size: '95', amps: 293 },
        { size: '120', amps: 339 },
        { size: '150', amps: 389 },
        { size: '185', amps: 444 },
        { size: '240', amps: 522 },
        { size: '300', amps: 601 },
    ];

    for (const cable of cableTable) {
        if (cable.amps >= requiredAmpacity) {
            return cable.size;
        }
    }
    return "Busbar Required";
}

/**
 * Calculates Voltage Drop
 * @param current Load Current (A)
 * @param distance Length of run (m)
 * @param cableSize Cable size in mm2 (string)
 * @param voltage System Voltage (default 400V 3-phase)
 * @param type 'Sub-main' or 'Lighting'
 */
export function calculateVoltageDrop(
    current: number,
    distance: number,
    cableSize: string,
    voltage: number = 400,
    type: 'Sub-main' | 'Lighting' = 'Sub-main'
): VoltageDropResult {
    // mV/A/m table (approximate for Cu/XLPE/SWA/PVC)
    const mvAmTable: Record<string, number> = {
        '1.5': 25,
        '2.5': 15,
        '4': 9.5,
        '6': 6.4,
        '10': 3.8,
        '16': 2.4,
        '25': 1.55,
        '35': 1.15,
        '50': 0.87,
        '70': 0.6,
        '95': 0.45,
        '120': 0.37,
        '150': 0.31,
        '185': 0.25,
        '240': 0.20,
        '300': 0.17
    };

    const mv = mvAmTable[cableSize] || 0;

    // Vd = (mV * I * L) / 1000
    const dropVolts = (mv * current * distance) / 1000;
    const dropPercent = (dropVolts / voltage) * 100;

    const limit = type === 'Lighting' ? VD_LIMIT_LIGHTING : VD_LIMIT_SUBMAIN;

    return {
        dropVolts,
        dropPercent,
        isCompliant: dropPercent <= limit
    };
}

// --- MOTOR STARTER WIZARD ---

export function calculateMotorParams(powerKW: number, type: MotorType, voltage: number = 400, pf: number = 0.85): MotorCalculationResult {
    // P = sqrt(3) * V * I * PF
    // I = P / (sqrt(3) * V * PF)
    // P is in Watts

    const iRun = (powerKW * 1000) / (Math.sqrt(3) * voltage * pf);

    let iStartFactor = 1;
    if (type === 'DOL') iStartFactor = 6;
    if (type === 'Star-Delta') iStartFactor = 2; // ~1/3 of DOL
    if (type === 'VFD') iStartFactor = 1.1; // Soft start

    const iStart = iRun * iStartFactor;

    // Breaker selection rule of thumb: Next standard size > I_run * 1.25 (thermal min)
    // Or handle startup. For this calculator, we focus on thermal setting.
    const protectionSetting = iRun; // Ir should be set to full load current

    const ampacityReq = calculateRequiredAmpacity(iRun);
    const suggestedCable = suggestCableSize(ampacityReq);

    // Standard Breaker Sizes
    const breakers = [10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 400, 630];
    const suggestedBreaker = breakers.find(b => b >= iRun * 1.1) || 630;

    return {
        iRun,
        iStart,
        suggestedBreaker,
        suggestedCable,
        protectionSetting
    };
}

// --- POWER FACTOR CORRECTION ---

/**
 * Calculate Capacitor Bank size (kVAR) to achieve Target PF
 */
export function calculateKVAR(activePowerKW: number, currentPF: number, targetPF: number = 0.98): number {
    if (currentPF >= targetPF) return 0;

    // Q = P * (tan(phi1) - tan(phi2))
    // phi = arccos(pf)

    const phi1 = Math.acos(currentPF);
    const phi2 = Math.acos(targetPF);

    const tanPhi1 = Math.tan(phi1);
    const tanPhi2 = Math.tan(phi2);

    const kvar = activePowerKW * (tanPhi1 - tanPhi2);
    return Number(kvar.toFixed(2));
}

// --- EARTHING (ADIABATIC) ---

/**
 * Calculates Minimum CPC Size using Adiabatic Equation
 * S = (I * sqrt(t)) / k
 */
export function calculateECC(faultCurrentKA: number, timeSeconds: number, conductor: 'Copper' | 'Aluminum' = 'Copper'): number {
    const k = conductor === 'Copper' ? 115 : 76; // PVC Insulation
    const faultCurrentAmps = faultCurrentKA * 1000;

    // S = (I * sqrt(t)) / k
    const s = (faultCurrentAmps * Math.sqrt(timeSeconds)) / k;
    return Number(s.toFixed(2));
}
