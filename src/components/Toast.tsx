import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    status?: number;
    onClose?: () => void;
};

export default function Toast({ message, status, onClose }: ToastProps) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosing(true);

            setTimeout(() => {
                onClose?.();
            }, 300);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`font-[Orbitron] bg-dark border border-red-500/40 text-red-400 px-5 py-4 rounded-xl shadow-lg
                [box-shadow:0_0_5px_#f87171,0_0_10px_#ef4444,0_0_15px_#b91c1c]
                ${closing ? "animate-slide-out" : "animate-slide-in"}`}
        >
            <div className="flex items-center gap-2">
                {status && <span>[{status}]</span>}
                <span>{message}</span>
            </div>
        </div>
    );
}