import { useState } from "react";
import { updateCalendarEvent } from "../api/calendarApi.ts";
import type {UseUpdateCalendarEventProps, UpdateCalendarEventPayload} from "../types/calendar.types.ts";

export function useUpdateCalendarEvent({onEventUpdated, onClose}: UseUpdateCalendarEventProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function updateEvent(
        eventId: number,
        payload: UpdateCalendarEventPayload
    ) {
        if (isSaving) return;

        try {
            setIsSaving(true);

            const updatedEvent = await updateCalendarEvent(eventId, payload);

            onEventUpdated(updatedEvent);
            onClose();
        } catch (error) {
            console.error("Failed to update event", error);
        } finally {
            setIsSaving(false);
        }
    }

    return {
        isSaving,
        updateEvent,
    };
}