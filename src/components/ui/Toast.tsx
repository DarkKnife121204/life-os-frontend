import { useEffect, useState } from "react";

type ToastProps = {
    title: string;
    message: string;
    status?: number;
    onClose?: () => void;
};

export default function Toast({ title, message, status, onClose }: ToastProps) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true);

            setTimeout(() => {
                onClose?.();
            }, 300);
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`font-[Orbitron] w-56 rounded-2xl border border-red-500/40 bg-[#090912]/95 px-5 py-4 text-red-300
                backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.35)] ${closing ? "animate-slide-out" : "animate-slide-in"}
            `}
        >
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-bold tracking-wider text-red-400">{title}</h3>

                        {status && <span className="text-xs text-red-400/60">{status}</span>}
                    </div>

                    <p className="text-xs leading-relaxed text-red-200/80">{message}</p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setClosing(true);
                        setTimeout(() => onClose?.(), 300);
                    }}
                    className="text-red-400/50 transition hover:text-red-300 text-3xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
