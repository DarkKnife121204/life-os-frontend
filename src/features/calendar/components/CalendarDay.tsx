import Card from "@/components/ui/Card.tsx";
import EventCard from "./EventCard";
import { getEventPosition } from "../utils/getEventPosition.ts";
import { getEventsByDate } from "../utils/getEventsByDate";
import { formatDate } from "@/components/utils/date";
import type { CalendarEvent } from "../types/calendar.types.ts";
import { CALENDAR_WEEK_DAYS } from "../constants/calendar.constants.ts";

type CalendarWeekProps = {
    selectedDate: Date;
    events: CalendarEvent[];
    isLoading?: boolean;
};

export default function CalendarDay({ selectedDate, events, isLoading = false }: CalendarWeekProps) {
    const selectedDateString = formatDate(selectedDate);

    const { dayEvents, allDayEvents, timedEvents } = getEventsByDate(events, selectedDateString);

    const ALL_DAY_ROW_HEIGHT = 52;
    const EVENT_ROW_HEIGHT = 40;

    const allDayHeight = Math.max(ALL_DAY_ROW_HEIGHT, allDayEvents.length * EVENT_ROW_HEIGHT + 50);
    return (
        <Card className="h-full min-h-0 overflow-hidden flex flex-col">
            <div className="shrink-0 flex items-center justify-between border-b border-cyan-400/10 px-5 py-4">
                <div>
                    <h3 className="text-base text-zinc-100">
                        {selectedDate.toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-400">{dayEvents.length} events scheduled</p>
                </div>
            </div>

            {isLoading && events.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">Loading events...</div>
            ) : (
                <div className="flex-1 min-h-0 overflow-y-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="grid grid-cols-[90px_1fr] min-w-[760px]">
                        <div className="border-r border-cyan-400/10">
                            <div
                                style={{ height: `${allDayHeight}px` }}
                                className="border-b border-cyan-400/10 px-4 py-4 text-sm text-zinc-400"
                            >
                                All-day
                            </div>

                            {CALENDAR_WEEK_DAYS.slice(1).map((hour) => (
                                <div
                                    key={hour}
                                    className="h-[52px] border-b border-cyan-400/10 px-4 py-3 text-sm text-zinc-400"
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>

                        <div className="relative min-h-[1300px]">
                            <div
                                style={{ height: `${allDayHeight}px` }}
                                className="border-b border-cyan-400/10 px-2 py-2"
                            >
                                <div className="flex flex-col gap-2">
                                    {allDayEvents.map((event) => (
                                        <EventCard
                                            key={event.id}
                                            event={event}
                                            compact
                                            showDescription
                                            showType
                                            showStatus
                                        />
                                    ))}
                                </div>
                            </div>

                            {CALENDAR_WEEK_DAYS.slice(1).map((hour) => (
                                <div key={hour} className="h-[52px] border-b border-cyan-400/10" />
                            ))}

                            {timedEvents.map((event) => {
                                const position = getEventPosition(event.startTime, event.endTime, allDayHeight);

                                return (
                                    <div
                                        key={event.id}
                                        style={position}
                                        className="absolute left-2 right-2 [&>div]:h-full [&>div]:overflow-hidden"
                                    >
                                        <EventCard
                                            event={event}
                                            showDescription
                                            showType
                                            showStatus
                                            timeView={"inline"}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
