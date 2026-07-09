import { useState } from "react";
import type { CustomDropdownProps } from "../types/types.ts";
import PrevIcon from "../../components/icons/prev.svg?react";

export default function CustomDropdown({ value, options, onChange, isInvalid = false }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="relative w-full sm:w-auto">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`w-full h-[50px] cursor-pointer rounded-xl border px-3 py-3 pr-11 text-left outline-none transition
                ${
                    isInvalid
                        ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                        : isOpen
                          ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                          : "border-cyan-500/30 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                }`}
            >
                {selectedOption?.label ?? value}
                <PrevIcon
                    className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-90" : "-rotate-90"}`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute left-0 top-14 z-[9999] w-full rounded-xl border border-cyan-400/30 bg-[#06121a]/95
                    p-2 space-y-1 shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl"
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`flex h-9 w-full cursor-pointer items-center rounded-lg px-4 text-sm transition
                                ${
                                    value === option.value
                                        ? "bg-cyan-400/10 text-cyan-300"
                                        : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
