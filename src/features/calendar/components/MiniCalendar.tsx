import { useState } from "react";
import Card from "../../../components/ui/Card";
import {getMonthDays} from "../utils/getMonthDays.ts";
import {getPrevMonth, getNextMonth} from "../utils/calendarNavigation";
import {MINI_CALENDAR_VIEWS, MONTH_NAMES} from "../../../components/constants/constants.ts";
import PrevIcon from "../../../components/icons/prev.svg?react";

export default function MiniCalendar() {
    const [miniDate, setMiniDate] = useState(new Date());

    const year = miniDate.getFullYear();
    const month = miniDate.getMonth();
    const miniDays = getMonthDays(year, month);
    const title = `${MONTH_NAMES[month]} ${year}`;

    const handlePrev = () => {setMiniDate((prevDate) => getPrevMonth(prevDate));};
    const handleNext = () => {setMiniDate((prevDate) => getNextMonth(prevDate));};

    return (
        <Card className="p-4">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base">{title}</h3>

                <div className="flex gap-2">
                    <button onClick={handlePrev} className="flex items-center justify-center h-8 w-8 cursor-pointer  rounded-lg border border-cyan-400/15 bg-[#030D14]
                        text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                        <PrevIcon className="h-5 w-5 transition-transform duration-300"/>
                    </button>

                    <button onClick={handleNext} className="flex items-center justify-center h-8 w-8 cursor-pointer  rounded-lg border border-cyan-400/15 bg-[#030D14]
                        text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                        <PrevIcon className="h-5 w-5 transition-transform duration-300 rotate-180"/>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center text-xs">
                {MINI_CALENDAR_VIEWS.map((day) => (
                    <div key={day} className="text-zinc-300">
                        {day}
                    </div>
                ))}

                {miniDays.map((item) => {
                    return (
                        <button key={item.date} type="button" className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs transition
                            ${item.isToday 
                                ? "bg-cyan-400/80 text-black shadow-[0_0_18px_rgba(0,255,255,0.45)]"
                                : !item.isCurrentMonth
                                    ? "text-zinc-600"
                                    : item.isSunday
                                        ? "text-pink-500 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.12)]"
                                        : "text-zinc-100 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(0,255,255,0.12)]"
                            }`}>
                            {item.day}
                        </button>
                    );
                })}
            </div>
        </Card>
    );
}