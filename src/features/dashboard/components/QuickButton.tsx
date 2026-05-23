import React from "react";

type QuickButtonProps = {
    icon: React.ElementType;
    label: string;
    purple?: boolean;
};

export default function QuickButton({
                                        icon: Icon,
                                        label,
                                        purple = false,
                                    }: QuickButtonProps) {
    return (
        <button className="h-32 rounded-xl border border-cyan-400/10 bg-slate-950/30 flex flex-col items-center justify-center gap-4 hover:border-cyan-400/40 transition">
            <Icon
                className={`w-10 h-10 ${
                    purple ? "text-fuchsia-400" : "text-cyan-300"
                }`}
            />

            <span className="text-sm text-zinc-200 whitespace-nowrap">
                {label}
            </span>
        </button>
    );
}