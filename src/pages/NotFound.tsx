import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DashboardIcon from '../components/icons/dashboard.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from '../components/icons/arrow.svg?react';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden
            bg-gradient-to-b from-[#06111f] via-[#050914] to-[#02040a] text-white font-[Orbitron] px-6
        ">
            <div className="relative flex flex-col items-center text-center">

                <div className="absolute -top-24 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
                <div className="absolute top-10 -left-28 w-72 h-72 rounded-full bg-blue-600/5 blur-3xl" />
                <div className="absolute top-14 -right-28 w-72 h-72 rounded-full bg-purple-600/5 blur-3xl" />

                <div className="relative mb-8 opacity-80">
                    <div className="w-36 h-32 rounded-xl border border-cyan-200/20 bg-slate-900/40 backdrop-blur-md rotate-[8deg]
                        shadow-[0_0_35px_rgba(0,255,255,0.08)]
                    ">
                        <div className="flex gap-2 px-4 py-3 border-b border-cyan-200/10">
                            <span className="w-2 h-2 rounded-full bg-cyan-200/30" />
                            <span className="w-2 h-2 rounded-full bg-cyan-200/20" />
                            <span className="w-2 h-2 rounded-full bg-cyan-200/10" />
                        </div>

                        <div className="flex justify-center gap-8 text-3xl text-cyan-100/50">
                            <span>×</span>
                            <span>×</span>
                        </div>

                        <div className="text-4xl text-cyan-100/50">
                            ⌒
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#02040a]/80 rounded-b-xl" />
                    </div>

                    <div className="
                        absolute -bottom-4 left-1/2 -translate-x-1/2
                        w-52 h-6 rounded-full bg-black/50 blur-md
                    " />
                </div>

                <h1 className="relative text-[120px] leading-none font-black tracking-widest bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                    bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(0,255,255,0.22)]
                ">
                    404
                </h1>

                <h2 className="mt-6 text-3xl font-semibold tracking-wide text-white">
                    Page not found
                </h2>

                <p className="mt-5 max-w-md text-base leading-7 text-slate-400 font-[Orbitron]">
                    The page you&apos;re looking for doesn&apos;t exist
                    <br />
                    or has been moved.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-6">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="h-14 px-8 rounded-xl bg-cyan-400 text-slate-950 inline-flex items-center justify-center gap-2 font-bold font-[Orbitron]
                            shadow-[0_0_24px_rgba(0,255,255,0.35)] hover:bg-cyan-300 hover:scale-[1.03] active:scale-95 transition
                        "
                    >
                        <DashboardIcon className="w-5 h-5"></DashboardIcon> <span>Go to Dashboard</span>
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="h-14 px-8 rounded-xl border border-slate-500/50 bg-slate-950/30 text-white inline-flex items-center justify-center gap-2
                            font-semibold font-[Orbitron] hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.12)] active:scale-95 transition
                        "
                    >
                        <ArrowIcon className="w-5 h-5"></ArrowIcon> <span>Go Back</span>
                    </button>
                </div>
            </div>
        </div>
    );
}