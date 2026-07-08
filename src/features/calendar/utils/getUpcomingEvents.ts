import type { CalendarEvent } from "../types/calendar.types.ts";
import { getDateTime } from "./date";

export function getUpcomingEvents(events: CalendarEvent[], limit = 4): CalendarEvent[] {
    const now = new Date();

    return events
        .filter((event) => getDateTime(event.date, event.startTime) >= now)
        .sort((a, b) => {
            return getDateTime(a.date, a.startTime).getTime() - getDateTime(b.date, b.startTime).getTime();
        })
        .slice(0, limit);
}