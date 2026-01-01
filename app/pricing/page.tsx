import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Download } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="max-w-6xl mx-auto py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-white">Select Your Clearance Level</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Choose the package that suits your consultancy needs.
                    Upgrade to Authority for the offline Windows application and AI consultant.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Associate */}
                <PricingCard
                    id="associate"
                    title="Associate"
                    price="Free"
                    features={["Basic Motor Wizard", "Lighting Voltage Drop", "Online Access Only"]}
                />

                {/* Senior */}
                <PricingCard
                    id="senior"
                    title="Senior Engineer"
                    price="$49/mo"
                    highlight
                    features={["Full Cable Sizing Engine", "Sub-main Voltage Drop", "Fault Level Reports", "Basic AI Consultant"]}
                />

                {/* Authority */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E5E4E2] to-[#C0C0C0] rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative h-full p-8 rounded-2xl bg-[#030509] border border-white/10 flex flex-col">
                        <h3 className="text-xl font-semibold text-white mb-2">Authority</h3>
                        <div className="text-4xl font-bold text-white mb-6">$199<span className="text-lg font-normal text-gray-500">/mo</span></div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {["Everything in Senior", "Unlimited Projects", "Advanced AI Consultant", "Direct Authority Export", "Offline Windows App"].map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check className="w-5 h-5 text-[#E5E4E2] shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <Link href="/auth/signup?plan=authority" className="w-full mb-2">
                            <Button className="w-full">
                                Get Started
                            </Button>
                        </Link>

                        <Button variant="secondary" className="w-full flex items-center justify-center gap-2 text-xs opacity-50 cursor-not-allowed">
                            <Download className="w-3 h-3" /> Download Windows Program (After Signup)
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}

function PricingCard({ id, title, price, features, highlight = false }: { id: string, title: string, price: string, features: string[], highlight?: boolean }) {
    return (
        <div className={`p-8 rounded-2xl border flex flex-col ${highlight ? 'bg-white/10 border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'bg-white/5 border-white/10'}`}>
            <h3 className={`text-xl font-semibold mb-2 ${highlight ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
            <div className="text-4xl font-bold text-white mb-6">{price}</div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check className={`w-5 h-5 shrink-0 ${highlight ? 'text-[#E5E4E2]' : 'text-gray-500'}`} />
                        {feat}
                    </li>
                ))}
            </ul>

            <Link href={`/auth/signup?plan=${id}`} className="w-full">
                <Button variant={highlight ? 'primary' : 'secondary'} className="w-full">
                    Get Started
                </Button>
            </Link>
        </div>
    )
}
