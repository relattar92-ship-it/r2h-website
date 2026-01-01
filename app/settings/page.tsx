import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-white mb-2">System <span className="text-[#C0C0C0]">Settings</span></h1>
                <p className="text-gray-400">Configure R2H.AI Preferences</p>
            </header>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Profile Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Engineer Name" placeholder="Ramy Hasan" />
                        <Input label="Registry Number" placeholder="DXB-ENG-10293" />
                    </div>
                    <Input label="Company Name" placeholder="R2H Engineering Consultants" />
                    <div className="pt-4">
                        <Button>Save Changes</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
