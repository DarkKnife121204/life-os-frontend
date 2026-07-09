import Card from "@/components/ui/Card";
import CalendarCell from "./CalendarCell";
import { getMonthDays } from "../utils/getMonthDays.ts";
import { getEventsByDate } from "../utils/getEventsByDate";
import { FULL_CALENDAR_VIEWS } from "../constants/calendar.constants.ts"
import type {CalendarEvent} from "../types/calendar.types.ts";

type CalendarGridProps = {
    selectedDate: Date;
    events: CalendarEvent[];
    isLoading?: boolean;
    onEventClick?: (event: CalendarEvent) => void;
    onMoreClick: (date: string) => void;
};
export default function CalendarGrid({ selectedDate, events, isLoading = false, onEventClick, onMoreClick}: CalendarGridProps) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const calendarDays = getMonthDays(year, month);

    return (
        <Card className="h-full flex flex-col overflow-hidden">
            <div className="grid grid-cols-7 border-b border-cyan-400/10 shrink-0">
                {FULL_CALENDAR_VIEWS.map((day) => (
                    <div key={day} className="h-11 flex items-center justify-center border-r border-cyan-400/10 last:border-r-0 text-sm text-zinc-200">
                        {day}
                    </div>
                ))}
            </div>

            {isLoading && events.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
                    Loading events...
                </div>
            ) : (
                <div className="grid flex-1 grid-cols-7 grid-rows-5">
                    {calendarDays.map((item) => {
                        const { dayEvents } = getEventsByDate(events, item.date);

                        return (
                            <CalendarCell key={item.date} day={item.day} date={item.date} events={dayEvents} isCurrentMonth={item.isCurrentMonth} isSunday={item.isSunday}
                                          isToday={item.isToday} onEventClick={onEventClick} onMoreClick={onMoreClick}/>
                        );
                    })}
                </div>
            )}
        </Card>
    );
}