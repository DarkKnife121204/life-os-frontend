import { useState } from "react";
import type { CalendarEvent } from "../types/calendar.types.ts";

export function useEventEditModal() {
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

    function openEditModal(event: CalendarEvent) {
        setEditingEvent(event);
    }

    function closeEditModal() {
        setEditingEvent(null);
    }

    return {
        editingEvent,
        openEditModal,
        closeEditModal,
    };
}
