import Card from "../../../components/ui/Card.tsx";
import EventCard from "./EventCard";
import {getWeekDays} from "../utils/getWeekDays.ts";
import {getEventPosition} from "../utils/getEventPosition";
import { getEventsByDate } from "../utils/getEventsByDate";
import type {CalendarEvent} from "../types/calendar.types.ts";
import {CALENDAR_WEEK_DAYS} from "../constants/calendar.constants.ts";

type CalendarWeekProps = {
    selectedDate: Date;
    events: CalendarEvent[];
    isLoading?: boolean;
    onEventClick?: (event: CalendarEvent) => void;
};

export default function CalendarWeek({ selectedDate, events, isLoading = false, onEventClick}: CalendarWeekProps) {
    const calendarWeekDays = getWeekDays(selectedDate);

    const ALL_DAY_ROW_HEIGHT = 52;
    const EVENT_ROW_HEIGHT = 40;

    const maxAllDayEventsCount = Math.max(
        ...calendarWeekDays.map((day) => {
            const { allDayEvents } = getEventsByDate(events, day.date);

            return allDayEvents.length;
        })
    );

    const allDayHeight = Math.max(
        ALL_DAY_ROW_HEIGHT,
        maxAllDayEventsCount * EVENT_ROW_HEIGHT + 50
    );
    return (
        <Card className="h-full min-h-0 overflow-hidden flex flex-col">
            <div className="shrink-0 grid grid-cols-[90px_repeat(7,minmax(160px,1fr))] border-b border-cyan-400/10">
                <div className="h-12 flex items-center justify-center border-r border-cyan-400/10 text-sm text-zinc-400">
                    GMT +3
                </div>

                {calendarWeekDays.map((day) => (
                    <div key={day.date}
                         className={`h-12 flex items-center justify-center border-r border-cyan-400/10 last:border-r-0 text-sm ${day.weekend ? "text-fuchsia-400" : "text-zinc-100"}`}>
                        <span>{day.label}</span>

                        <span className={`ml-1 flex h-7 w-7 items-center justify-center rounded-full
                            ${day.active ? "border border-cyan-400 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.45)]" : ""}`}>
                            {day.day}
                        </span>
                    </div>
                ))}
            </div>
            {isLoading && events.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
                    Loading events...
                </div>
            ) : (
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="grid grid-cols-[90px_repeat(7,minmax(160px,1fr))] min-w-[1190px]">
                        <div className="border-r border-cyan-400/10">
                            <div style={{height: `${allDayHeight}px`}} className="border-b border-cyan-400/10 px-3 py-3 text-sm text-zinc-400">
                                All-day
                            </div>

                            {CALENDAR_WEEK_DAYS.slice(1).map((hour) => (
                                <div key={hour} className="h-[52px] border-b border-cyan-400/10 px-3 py-3 text-sm text-zinc-400">
                                    {hour}
                                </div>
                            ))}
                        </div>

                        {calendarWeekDays.map((day) => {
                            const {allDayEvents, timedEvents} = getEventsByDate(events, day.date);

                            return (
                                <div key={day.date}
                                     className="relative min-h-[728px] border-r border-cyan-400/10 last:border-r-0">
                                    <div style={{height: `${allDayHeight}px`}} className="border-b border-cyan-400/10 px-2 py-2">
                                        <div className="flex flex-col gap-2">
                                            {allDayEvents.map((event) => (
                                                <EventCard key={event.id} event={event} compact onClick={onEventClick}/>
                                            ))}
                                        </div>
                                    </div>

                                    {CALENDAR_WEEK_DAYS.slice(1).map((hour) => (
                                        <div key={hour} className="h-[52px] border-b border-cyan-400/10"/>
                                    ))}

                                    {timedEvents.map((event) => {
                                        const position = getEventPosition(event.startTime, event.endTime);

                                        return (
                                            <div key={event.id} style={position}
                                                 className="absolute left-2 right-2 [&>div]:h-full [&>div]:overflow-hidden">
                                                <EventCard event={event} onClick={onEventClick}/>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Card>
    );
}