export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-black via-zinc-950 to-rose-950 text-white">
            <div className="flex flex-col items-center justify-center px-12 py-10 rounded-3xl bg-[#020617]/70 backdrop-blur-xl border
                 border-rose-500/20 [box-shadow:0_0_15px_#f87171,0_0_40px_#ef4444,0_0_80px_#b91c1c]">

                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40 bg-rose-500/20"></div>

                <h1 className="relative text-7xl font-bold font-[Orbitron] text-rose-400 tracking-widest [text-shadow:0_0_10px_#ef4444,0_0_20px_#ef4444] animate-pulse">
                    404
                </h1>

                <p className="relative mt-4 text-lg text-rose-200 font-[Orbitron] tracking-wide opacity-80">
                    Страница не найдена
                </p>
            </div>
        </div>
    );
}