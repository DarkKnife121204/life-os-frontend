import { useState } from "react";
import { useCalendarPage } from "@/features/calendar/hooks/useCalendarPage.ts";
import { useEventShowModal } from "@/features/calendar/hooks/useEventShowModal.ts";
import { useEventEditModal } from "@/features/calendar/hooks/useEventEditModal.ts";
import { useEventCreateModal } from "@/features/calendar/hooks/useEventCreateModal.ts";
import { useMoreEventsModal } from "@/features/calendar/hooks/useMoreEventsModal.ts";
import { useEventFilterModal } from "@/features/calendar/hooks/useEventFilterModal.ts";
import { CalendarEventProvider } from "@/features/calendar/context/CalendarEventContext";
import CalendarToolbar from "../../features/calendar/components/CalendarToolbar.tsx";
import CalendarGrid from "../../features/calendar/components/CalendarGrid.tsx";
import MiniCalendar from "../../features/calendar/components/MiniCalendar.tsx";
import UpcomingEvents from "../../features/calendar/components/UpcomingEvents.tsx";
import CalendarStats from "../../features/calendar/components/CalendarStats.tsx";
import CalendarWeek from "../../features/calendar/components/CalendarWeek.tsx";
import CalendarDay from "../../features/calendar/components/CalendarDay.tsx";
import CalendarAllEvents from "../../features/calendar/components/CalendarAllEvents.tsx";
import EventShowModal from "../../features/calendar/components/EventShowModal.tsx";
import EventEditModal from "../../features/calendar/components/EventEditModal.tsx";
import EventCreateModal from "../../features/calendar/components/EventCreateModal.tsx";
import MoreEventsModal from "../../features/calendar/components/MoreEventsModal.tsx";
import EventFilterModal from "../../features/calendar/components/EventFilterModal.tsx";
import type { CalendarView, CalendarEvent, CalendarEventFilters } from "@/features/calendar/types/calendar.types.ts";

export default function CalendarPage() {
    const [view, setView] = useState<CalendarView>("Month");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { selectedEventId, setSelectedEventId, openShowModal, closeShowModal } = useEventShowModal();
    const { editingEvent, openEditModal, closeEditModal } = useEventEditModal();
    const { isCreateModalOpen, openCreateModal, closeCreateModal } = useEventCreateModal();
    const { moreEventsDate, openMoreEventsModal, closeMoreEventsModal } = useMoreEventsModal();
    const { isFilterModalOpen, openFilterModal, closeFilterModal } = useEventFilterModal();
    const [filters, setFilters] = useState<CalendarEventFilters>({});
    const {
        events,
        isLoading,
        allEventsPage,
        setAllEventsPage,
        allEventsMeta,
        currentMonthEvents,
        allEventsSortField,
        allEventsSortDirection,
        handleAllEventsSort,
        updateEventInList,
        addEventToList,
    } = useCalendarPage({ view, selectedDate, filters });
    const moreEvents = moreEventsDate ? events.filter((event) => event.date === moreEventsDate) : [];

    function handleOpenEditModal(event: CalendarEvent) {
        closeShowModal();
        openEditModal(event);
    }

    function handleCloseEditModal() {
        const eventId = editingEvent?.id;

        closeEditModal();

        if (eventId) {
            setSelectedEventId(eventId);
        }
    }

    return (
        <>
            <CalendarEventProvider
                value={{
                    openEvent: openShowModal,
                    openMoreEvents: openMoreEventsModal,
                }}
            >
                <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1400px)_minmax(300px,1fr)] gap-4">
                    <div className="min-w-0 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
                        <CalendarToolbar
                            view={view}
                            setView={setView}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            onCreate={openCreateModal}
                            onFilter={openFilterModal}
                        />

                        <div className="flex-1 min-h-0 overflow-auto">
                            <div className="min-w-[760px] h-full">
                                {view === "Month" && (
                                    <CalendarGrid selectedDate={selectedDate} events={events} isLoading={isLoading} />
                                )}
                                {view === "Week" && (
                                    <CalendarWeek selectedDate={selectedDate} events={events} isLoading={isLoading} />
                                )}
                                {view === "Day" && (
                                    <CalendarDay selectedDate={selectedDate} events={events} isLoading={isLoading} />
                                )}
                                {view === "All Events" && (
                                    <CalendarAllEvents
                                        events={events}
                                        isLoading={isLoading}
                                        meta={allEventsMeta}
                                        page={allEventsPage}
                                        setPage={setAllEventsPage}
                                        sortField={allEventsSortField}
                                        sortDirection={allEventsSortDirection}
                                        onSort={handleAllEventsSort}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <aside className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 min-w-0">
                        <MiniCalendar />
                        <UpcomingEvents events={currentMonthEvents} />
                        <CalendarStats events={currentMonthEvents} />
                    </aside>
                </section>

                <EventShowModal
                    eventId={selectedEventId}
                    onClose={closeShowModal}
                    onEdit={handleOpenEditModal}
                    onEventUpdated={updateEventInList}
                />
                <EventEditModal
                    event={editingEvent}
                    onClose={handleCloseEditModal}
                    onEventUpdated={updateEventInList}
                />
                <EventCreateModal
                    isOpen={isCreateModalOpen}
                    onClose={closeCreateModal}
                    onEventCreated={addEventToList}
                />
                <MoreEventsModal date={moreEventsDate} events={moreEvents} onClose={closeMoreEventsModal} />
                <EventFilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} onApply={setFilters} />
            </CalendarEventProvider>
        </>
    );
}
