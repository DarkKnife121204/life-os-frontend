import type { CalendarEvent } from "../types/calendar.types.ts";
import { isAllDayEvent } from "./isAllDayEvent";

export function getEventsByDate(events: CalendarEvent[], date: string) {
    const dayEvents = events.filter((event) => event.date === date);

    const allDayEvents = dayEvents.filter((event) =>
        isAllDayEvent(event.startTime, event.endTime)
    );

    const timedEvents = dayEvents.filter((event) =>
        !isAllDayEvent(event.startTime, event.endTime)
    );

    return {
        dayEvents,
        allDayEvents,
        timedEvents,
    };
}