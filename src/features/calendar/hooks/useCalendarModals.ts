import { useState } from "react";
import type { CalendarEvent } from "../types/calendar.types.ts";

export function useCalendarModals() {
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [moreEventsDate, setMoreEventsDate] = useState<string | null>(null);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    function openShowModal(event: CalendarEvent) {
        setSelectedEventId(event.id);
    }

    function closeShowModal() {
        setSelectedEventId(null);
    }

    function openEditModal(event: CalendarEvent) {
        setSelectedEventId(null);
        setEditingEvent(event);
    }

    function closeEditModal() {
        const eventId = editingEvent?.id ?? null;

        setEditingEvent(null);

        if (eventId) {
            setSelectedEventId(eventId);
        }
    }

    function openCreateModal() {
        setIsCreateModalOpen(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpen(false);
    }

    function openMoreEventsModal(date: string) {
        setSelectedEventId(null);
        setEditingEvent(null);
        setMoreEventsDate(date);
    }

    function closeMoreEventsModal() {
        setMoreEventsDate(null);
    }

    function openFilterModal() {
        setIsFilterModalOpen(true);
    }

    function closeFilterModal() {
        setIsFilterModalOpen(false);
    }

    return {
        selectedEventId,
        editingEvent,
        openShowModal,
        closeShowModal,
        openEditModal,
        closeEditModal,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        moreEventsDate,
        openMoreEventsModal,
        closeMoreEventsModal,
        isFilterModalOpen,
        openFilterModal,
        closeFilterModal,
    };
}