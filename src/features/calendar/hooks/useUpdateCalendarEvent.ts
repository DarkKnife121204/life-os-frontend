import { useState } from "react";
import { updateCalendarEvent, type UpdateCalendarEventPayload } from "../api/calendarApi.ts";
import type { CalendarEvent } from "../types/calendar.types.ts";

type UseUpdateCalendarEventProps = {
    onEventUpdated: (event: CalendarEvent) => void;
    onClose: () => void;
};

export function useUpdateCalendarEvent({ onEventUpdated, onClose }: UseUpdateCalendarEventProps) {
    const [isSaving, setIsSaving] = useState(false);

    async function updateEvent(eventId: number, payload: UpdateCalendarEventPayload) {
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
