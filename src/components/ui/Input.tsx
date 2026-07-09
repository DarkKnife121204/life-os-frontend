import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    isInvalid?: boolean;
    icon?: ReactNode;
};

export default function Input({ isInvalid = false, icon, className = "", ...props }: InputProps) {
    const stateClasses = isInvalid
        ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
        : "border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)] focus-within:border-cyan-400/60 focus-within:shadow-[0_0_16px_rgba(0,255,255,0.14)]";

    if (icon) {
        return (
            <div className={`flex items-center gap-4 rounded-xl border px-3 py-3 transition ${stateClasses}`}>
                {icon}

                <input
                    {...props}
                    className={`w-full bg-transparent text-white outline-none transition placeholder:text-zinc-500 focus:text-cyan-300 hover:text-cyan-300 ${className}`}
                />
            </div>
        );
    }

    return (
        <input
            {...props}
            className={`w-full rounded-xl border px-3 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:text-cyan-300 hover:text-cyan-300
            ${stateClasses} ${className}`}
        />
    );
}
