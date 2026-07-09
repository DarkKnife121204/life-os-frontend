import { useEffect, useState } from "react";
import {
    getCalendarEvent,
    deleteCalendarEvent,
    restoreCalendarEvent,
    completeCalendarEvent,
} from "../api/calendarApi.ts";
import type { CalendarEvent } from "../types/calendar.types.ts";

export function useCalendarEvent(eventId: number | null) {
    const [event, setEvent] = useState<CalendarEvent | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function loadEvent(id: number, clearBeforeLoad = false) {
        try {
            if (clearBeforeLoad) {
                setEvent(null);
            }

            setIsLoading(true);

            const data = await getCalendarEvent(id);

            setEvent(data);
        } catch (error) {
            console.error("Failed to load calendar event", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteEvent() {
        if (!event) return null;

        const updatedEvent = await deleteCalendarEvent(event.id);

        setEvent(updatedEvent);

        return updatedEvent;
    }

    async function restoreEvent() {
        if (!event) return null;

        const updatedEvent = await restoreCalendarEvent(event.id);

        setEvent(updatedEvent);

        return updatedEvent;
    }

    async function completeEvent() {
        if (!event) return null;

        const updatedEvent = await completeCalendarEvent(event.id);

        setEvent(updatedEvent);

        return updatedEvent;
    }

    useEffect(() => {
        if (!eventId) {
            setEvent(null);
            return;
        }

        loadEvent(eventId, true);
    }, [eventId]);

    return {
        event,
        isLoading,
        deleteEvent,
        restoreEvent,
        completeEvent,
    };
}
