import type {CalendarEvent} from "../types/calendar.types.ts";
import EventCard from "./EventCard";

type CalendarCellProps = {
    day: number;
    date: string;
    events: CalendarEvent[];
    isCurrentMonth: boolean;
    isSunday: boolean;
    isToday: boolean;
    onEventClick?: (event: CalendarEvent) => void;
    onMoreClick: (date: string) => void;
};

export default function CalendarCell({day, date, events, isCurrentMonth, isSunday, isToday, onEventClick, onMoreClick,}: CalendarCellProps) {
    const visibleEvents = events.slice(0, 1);
    const hiddenEventsCount = events.length - visibleEvents.length;

    return (
        <div className="min-h-[118px] md:min-h-[132px] xl:min-h-[145px] border-r border-b border-cyan-400/10 last:border-r-0 p-3">
            <div className="mb-3">
                <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm transition ${
                    isToday
                        ? "bg-cyan-400/80 text-black shadow-[0_0_18px_rgba(0,255,255,0.45)]"
                        : !isCurrentMonth
                            ? "text-zinc-500"
                            : isSunday
                                ? "text-pink-500"
                                : "text-zinc-100"
                }`}>
                    {day}
                </span>
            </div>

            <div className="space-y-2">
                {visibleEvents.map((event) => (
                    <EventCard key={event.id} event={event} onClick={onEventClick}/>
                ))}

                {hiddenEventsCount > 0 && (
                    <button type="button" onClick={() => onMoreClick(date)} className="text-xs cursor-pointer text-zinc-300 hover:text-cyan-300 transition">
                        +{hiddenEventsCount} more
                    </button>
                )}
            </div>
        </div>
    );
}