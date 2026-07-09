import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isInvalid?: boolean;
};

export default function Textarea({ isInvalid = false, className = "", ...props }: TextareaProps) {
    return (
        <textarea
            {...props}
            className={`w-full resize-none rounded-xl border px-3 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:text-cyan-300 hover:text-cyan-300
                ${
                    isInvalid
                        ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                        : "border-cyan-500/30 focus:border-cyan-400/60 hover:border-cyan-400/60 focus:shadow-[0_0_16px_rgba(0,255,255,0.14)] hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                }
                ${className}`}
        />
    );
}
