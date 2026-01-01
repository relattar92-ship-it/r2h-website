import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle } from "lucide-react";

export default function ReportsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">Authority <span className="text-[#C0C0C0]">Reports</span></h1>
                <p className="text-gray-400">Generated Documents for DEWA / ADDC Submission</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Package Card */}
                <Card className="col-span-1 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <CardHeader>
                        <CardTitle>Full Submission Package</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-6 bg-white/5 rounded-2xl text-center border border-white/10 border-dashed">
                            <FileText className="w-16 h-16 text-[#E5E4E2] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white">Project_EXPO2030_Rev02.zip</h3>
                            <p className="text-sm text-gray-500 mt-2">Contains: Load Schedule (XLSM), Single Line Diagram (DXF), Calcs (PDF)</p>
                        </div>

                        <Button className="w-full h-12 text-lg">
                            <Download className="w-5 h-5 mr-2" /> Download Package (45 MB)
                        </Button>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-400" /> Voltage Drop Calcs Included
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-400" /> Cable Pulse Verification
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <CheckCircle className="w-4 h-4 text-emerald-400" /> DEWA Regulations Checklist
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* History */}
                <Card>
                    <CardHeader>
                        <CardTitle>Generation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Rev 02 - Final Submission", date: "Just now", status: "Ready" },
                                { name: "Rev 01 - Draft", date: "2 days ago", status: "Archived" },
                                { name: "Initial Calculation", date: "1 week ago", status: "Archived" },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                    <div>
                                        <p className="text-white font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.date}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{item.status}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
