import { useState } from "react";
import type { CalendarEvent } from "../types/calendar.types.ts";

export function useEventShowModal() {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    function openShowModal(event: CalendarEvent) {
        setSelectedEventId(event.id);
    }

    function closeShowModal() {
        setSelectedEventId(null);
    }

    return {
        selectedEventId,
        setSelectedEventId,
        openShowModal,
        closeShowModal,
    };
}