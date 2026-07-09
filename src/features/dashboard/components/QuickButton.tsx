import React from "react";

type QuickButtonProps = {
    icon: React.ElementType;
    label: string;
    purple?: boolean;
};

export default function QuickButton({ icon: Icon, label, purple = false }: QuickButtonProps) {
    return (
        <button
            className="flex h-20 md:h-22 xl:h-18 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-cyan-400/10
                bg-slate-950/30 px-2 hover:border-cyan-400/40 transition"
        >
            <Icon className={`h-7 w-7 md:h-9 md:w-9 xl:h-7 xl:w-7 ${purple ? "text-fuchsia-400" : "text-cyan-300"}`} />

            <span className="max-w-full truncate text-xs md:text-sm text-zinc-200">{label}</span>
        </button>
    );
}
