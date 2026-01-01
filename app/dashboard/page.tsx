import { MainDashboard } from "@/components/MainDashboard";

export default function Home() {
  return (
    <div className="relative z-10">
      <MainDashboard />

      {/* Background Decor Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gray-500/5 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}
