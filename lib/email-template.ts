/**
 * Generates the HTML content for the R2H.AI Verification Email
 * Theme: Lightning Silver (Top Premium)
 */
export function generateOTPEmail(otp: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #020305; color: #ededed; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .card { background: #0a0a0a; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 40px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 30px; letter-spacing: 2px; color: #ffffff; }
        .logo span { color: #C0C0C0; }
        .title { font-size: 18px; color: #E5E4E2; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px; }
        .otp-box { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 20px; font-size: 32px; font-family: 'Courier New', monospace; letter-spacing: 8px; font-weight: bold; color: #ffffff; margin: 30px 0; display: inline-block; }
        .text { font-size: 14px; color: #888888; line-height: 1.6; margin-bottom: 10px; }
        .footer { font-size: 12px; color: #444444; margin-top: 40px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="logo">R2H<span>.AI</span></div>
            <div class="title">Verification Code</div>
            
            <p class="text">Use the following One-Time Password to access your Engineering Workspace.</p>
            
            <div class="otp-box">${otp}</div>
            
            <p class="text">This code expires in 5 minutes.</p>
            <p class="text" style="font-size: 12px;">If you did not request this, please ignore this email.</p>
        </div>
        
        <div class="footer">
            &copy; 2025 R2H AI ENGINEERING. PRECISION SECURED.
        </div>
    </div>
</body>
</html>
    `;
}
