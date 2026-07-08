import { useState } from "react";
import { createCalendarEvent } from "../api/calendarApi.ts";
import type { CalendarEvent, CreateCalendarEventPayload } from "../types/calendar.types.ts";

type UseCreateCalendarEventProps = {
    onEventCreated: (event: CalendarEvent) => void;
    onClose: () => void;
};

export function useCreateCalendarEvent({ onEventCreated, onClose }: UseCreateCalendarEventProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function createEvent(payload: CreateCalendarEventPayload) {
        try {
            setIsSaving(true);

            const createdEvent = await createCalendarEvent(payload);

            onEventCreated(createdEvent);
            onClose();
        } catch (error) {
            console.error("Failed to create calendar event", error);
        } finally {
            setIsSaving(false);
        }
    }

    return {
        isSaving,
        createEvent,
    };
}