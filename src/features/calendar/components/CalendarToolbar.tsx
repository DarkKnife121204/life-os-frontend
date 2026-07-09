import PrevIcon from "@/components/icons/prev.svg?react";
import {getPrevDateByView, getNextDateByView} from "../utils/calendarNavigation";
import {CALENDAR_VIEWS} from "../constants/calendar.constants";
import {MONTH_NAMES} from "@/components/constants/constants";
import type {CalendarView} from "../types/calendar.types.ts";
import type {Dispatch, SetStateAction} from "react";

type CalendarToolbarProps = {
    view: CalendarView;
    setView: (view: CalendarView) => void;
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    onCreate: () => void;
    onFilter: () => void;
};

export default function CalendarToolbar({view, setView, selectedDate, setSelectedDate, onCreate, onFilter}: CalendarToolbarProps) {
    const title = `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

    const handleToday = () => {setSelectedDate(new Date());};
    const handlePrev = () => {setSelectedDate((prevDate) => getPrevDateByView(view, prevDate));};
    const handleNext = () => {setSelectedDate((prevDate) => getNextDateByView(view, prevDate));};

    return (
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
                <button onClick={handleToday} className="h-10 rounded-lg border border-cyan-400/15 bg-[#030D14] px-4 text-sm text-zinc-300 transition
                    hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)] cursor-pointer ">
                    Today
                </button>
                <div className="flex overflow-hidden rounded-lg border border-cyan-400/15 bg-[#030D14] transition hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                    <button onClick={handlePrev} className="flex items-center justify-center h-10 w-10 text-zinc-300 transition hover:bg-cyan-400/10 hover:text-cyan-300 cursor-pointer ">
                        <PrevIcon className="h-6 w-6 transition-transform duration-300" />
                    </button>
                    <button onClick={handleNext} className="flex items-center justify-center h-10 w-10 text-zinc-300 transition hover:bg-cyan-400/10 hover:text-cyan-300 cursor-pointer ">
                        <PrevIcon className="h-6 w-6 transition-transform duration-300 rotate-180" />
                    </button>
                </div>
                <h2 className="text-xl md:text-2xl">
                    {title}
                </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex overflow-hidden rounded-lg border border-cyan-400/15 bg-[#030D14] transition hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                    {CALENDAR_VIEWS.map((item) => (
                        <button key={item} onClick={() => setView(item)} className={`h-10 px-4 text-sm transition cursor-pointer 
                            ${view === item
                                ? "bg-cyan-400/10 text-cyan-300 shadow-[inset_0_0_12px_rgba(0,255,255,0.08)]"
                                : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                            }`}>
                            {item}
                        </button>
                    ))}
                </div>
                <button onClick={onFilter} className="h-10 cursor-pointer rounded-lg border border-cyan-400/15 bg-[#030D14] px-4 text-sm text-zinc-300 transition
                    hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                >
                    Filter
                </button>
                <button onClick={onCreate}
                        className="h-10 cursor-pointer rounded-lg bg-cyan-400 px-4 text-sm text-black hover:shadow-[0_0_18px_rgba(0,255,255,0.35)] transition hover:bg-cyan-300">
                    + New Event
                </button>
            </div>
        </div>
    );
}