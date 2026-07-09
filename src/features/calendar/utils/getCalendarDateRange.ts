import type { CalendarEvent, CalendarView, DateRange } from "../types/calendar.types";
import { formatDate } from "@/components/utils/date";

export function getCalendarRequestRange(view: CalendarView, selectedDate: Date): DateRange | null {
    if (view === "All Events") {
        return null;
    }

    if (view === "Day") {
        const date = formatDate(selectedDate);

        return {
            from_date: date,
            to_date: date,
        };
    }

    if (view === "Week") {
        const start = new Date(selectedDate);
        const day = start.getDay() === 0 ? 7 : start.getDay();

        start.setDate(start.getDate() - day + 1);

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return {
            from_date: formatDate(start),
            to_date: formatDate(end),
        };
    }

    const start = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
    const end = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2, 0);

    return {
        from_date: formatDate(start),
        to_date: formatDate(end),
    };
}

export function isRangeCovered(loadedRange: DateRange | null, requestedRange: DateRange): boolean {
    if (!loadedRange) {
        return false;
    }

    return (
        loadedRange.from_date <= requestedRange.from_date &&
        loadedRange.to_date >= requestedRange.to_date
    );
}

export function mergeRanges(currentRange: DateRange | null, newRange: DateRange): DateRange {
    if (!currentRange) {
        return newRange;
    }

    return {
        from_date: currentRange.from_date < newRange.from_date
            ? currentRange.from_date
            : newRange.from_date,

        to_date: currentRange.to_date > newRange.to_date
            ? currentRange.to_date
            : newRange.to_date,
    };
}

export function mergeEvents(currentEvents: CalendarEvent[], newEvents: CalendarEvent[]): CalendarEvent[] {
    const eventsMap = new Map<number, CalendarEvent>();

    currentEvents.forEach((event) => {
        eventsMap.set(event.id, event);
    });

    newEvents.forEach((event) => {
        eventsMap.set(event.id, event);
    });

    return Array.from(eventsMap.values());
}

export function filterEventsByRange(events: CalendarEvent[], range: DateRange | null): CalendarEvent[] {
    if (!range) {
        return events;
    }

    return events.filter((event) => {
        return event.date >= range.from_date && event.date <= range.to_date;
    });
}