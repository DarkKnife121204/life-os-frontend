import { getMinutesFromTime } from "./date";
import type { CalendarEvent } from "../types/calendar.types.ts";

function formatTotalTime(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) {
        return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
}

export function getCalendarStats(events: CalendarEvent[]) {
    const totalMinutes = events.reduce((sum, event) => {
        const startMinutes = getMinutesFromTime(event.startTime);
        const endMinutes = getMinutesFromTime(event.endTime);

        return sum + Math.max(endMinutes - startMinutes, 0);
    }, 0);

    return [
        {
            label: "Events",
            value: String(events.length),
        },
        {
            label: "Total Time",
            value: formatTotalTime(totalMinutes),
        },
        {
            label: "Meetings",
            value: String(events.filter((event) => event.type === "Meeting").length),
        },
        {
            label: "Task",
            value: String(events.filter((event) => event.type === "Task").length),
        },
    ];
}
