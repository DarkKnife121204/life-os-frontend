import { useState } from "react";
import type {CustomTimeDropdownProps} from "../types/types.ts";
import PrevIcon from "../../components/icons/prev.svg?react";
import ClockIcon from "../../components/icons/clock.svg?react";

export default function CustomTimeDropdown({ value, onChange }: CustomTimeDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour = "00", selectedMinute = "00"] = value.split(":");
    const hours = Array.from({ length: 24 }, (_, index) =>
        String(index).padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, index) =>
        String(index).padStart(2, "0")
    );

    function changeHour(hour: string) {
        onChange(`${hour}:${selectedMinute}`);
    }
    function changeMinute(minute: string) {
        onChange(`${selectedHour}:${minute}`);
    }

    return (
        <div className="relative">
            <button type="button" onClick={() => setIsOpen((prev) => !prev)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border bg-[#030D14] px-3 py-3 text-left outline-none transition
                    ${isOpen
                        ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                        : "border-cyan-500/30 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
            }`}>
                <ClockIcon className="h-6 w-6 shrink-0 text-cyan-300" />
                <span className="flex-1 font-semibold">
                    {value}
                </span>
                <PrevIcon className={`h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : "-rotate-90"}`}/>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-[58px] z-50 grid w-[150px] grid-cols-2 gap-2 rounded-xl border border-cyan-400/30 bg-[#06121a]/95 p-2
                    shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl">
                    <div className="max-h-56 space-y-1 overflow-y-auto [scrollbar-width:none]">
                        {hours.map((hour) => (
                            <button key={hour} type="button" onClick={() => changeHour(hour)}
                                className={`flex h-9 w-full cursor-pointer items-center justify-center rounded-lg text-sm transition
                                    ${selectedHour === hour
                                        ? "bg-cyan-400/10 text-cyan-300"
                                        : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                            }`}>
                                {hour}
                            </button>
                        ))}
                    </div>
                    <div className="max-h-56 space-y-1 overflow-y-auto [scrollbar-width:none]">
                        {minutes.map((minute) => (
                            <button key={minute} type="button" onClick={() => changeMinute(minute)}
                                className={`flex h-9 w-full cursor-pointer items-center justify-center rounded-lg text-sm transition
                                    ${selectedMinute === minute
                                        ? "bg-cyan-400/10 text-cyan-300"
                                        : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                            }`}>
                                {minute}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}