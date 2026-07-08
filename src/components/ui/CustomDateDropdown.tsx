import { useState } from "react";
import type {CustomDateDropdownProps} from "../types/types.ts";
import {MONTH_NAMES, MINI_CALENDAR_VIEWS} from "../constants/constants.ts";
import {getCalendarDays, getDateFromValue, getNextMonth, getPrevMonth, isSameDate, formatDate} from "../utils/date.ts";
import PrevIcon from "../../components/icons/prev.svg?react";
import CalendarIcon from "../../components/icons/calendar.svg?react";

export default function CustomDateDropdown({ value, onChange, isInvalid}: CustomDateDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(getDateFromValue(value));

    const selectedDate = getDateFromValue(value);
    const today = new Date();
    const calendarDays = getCalendarDays(currentDate);

    function selectDate(date: Date) {
        onChange(formatDate(date));
        setCurrentDate(date);
        setIsOpen(false);
    }

    function goPrevMonth() {
        setCurrentDate((prev) => getPrevMonth(prev));
    }

    function goNextMonth() {
        setCurrentDate((prev) => getNextMonth(prev));
    }

    return (
        <div className="relative z-50">
            <button type="button" onClick={() => setIsOpen((prev) => !prev)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border bg-[#030D14] px-3 py-3 text-left outline-none transition
                ${isInvalid ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                    : isOpen ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                        : "border-cyan-500/30 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                }`}>
                <CalendarIcon className="h-6 w-6 shrink-0 text-cyan-300" />
                <span className="flex-1 text-sm">
                    {value}
                </span>
                <PrevIcon className={`h-6 w-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90" : "-rotate-90"}`}/>
            </button>

            {isOpen && (
                <div className="absolute left-1/2 top-full z-[9999] mt-2 w-[300px] -translate-x-1/2 rounded-2xl border border-cyan-400/30
                    bg-[#06121a]/95 p-4 shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between">
                        <button type="button" onClick={goPrevMonth}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                        >
                            <PrevIcon className="h-5 w-5" />
                        </button>
                        <div className="text-sm font-semibold text-white">
                            {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </div>
                        <button type="button" onClick={goNextMonth}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-300 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                        >
                            <PrevIcon className="h-5 w-5 rotate-180" />
                        </button>
                    </div>
                    <div className="mb-2 grid grid-cols-7 gap-1">
                        {MINI_CALENDAR_VIEWS.map((day) => (
                            <div key={day} className="flex h-1 items-center justify-center text-xs font-semibold text-cyan-300">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date) => {
                            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                            const isSelected = isSameDate(date, selectedDate);
                            const isToday = isSameDate(date, today);

                            return (
                                <button key={formatDate(date)} type="button" onClick={() => selectDate(date)}
                                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-sm transition
                                        ${isSelected
                                            ? "bg-cyan-400 text-black shadow-[0_0_16px_rgba(0,255,255,0.35)]"
                                            : isToday
                                                ? "border border-cyan-400/60 text-cyan-300"
                                                : isCurrentMonth
                                                    ? "text-zinc-200 hover:bg-cyan-400/10 hover:text-cyan-300"
                                                    : "text-zinc-600 hover:bg-cyan-400/5 hover:text-zinc-400"
                                }`}>
                                    {date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}