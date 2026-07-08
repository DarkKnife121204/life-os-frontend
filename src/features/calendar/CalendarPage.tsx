import {useState} from "react";
import {useCalendarPage} from "./hooks/useCalendarPage.ts";
import { useCalendarModals } from "./hooks/useCalendarModals.ts";
import Header from "../../components/layout/Header";
import CalendarToolbar from "./components/CalendarToolbar";
import CalendarGrid from "./components/CalendarGrid";
import MiniCalendar from "./components/MiniCalendar";
import UpcomingEvents from "./components/UpcomingEvents";
import CalendarStats from "./components/CalendarStats";
import CalendarWeek from "./components/CalendarWeek";
import CalendarDay from "./components/CalendarDay";
import CalendarAllEvents from "./components/CalendarAllEvents";
import EventShowModal from "./components/EventShowModal.tsx";
import EventEditModal from "./components/EventEditModal.tsx";
import EventCreateModal from "./components/EventCreateModal.tsx";
import MoreEventsModal from "./components/MoreEventsModal.tsx";
import EventFilterModal from "./components/EventFilterModal.tsx";
import type {CalendarView, CalendarEventFilters} from "./types/calendar.types";

export default function CalendarPage() {
    const [view, setView] = useState<CalendarView>("Month");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {selectedEventId, editingEvent, openShowModal, closeShowModal, openEditModal, closeEditModal, openCreateModal, closeCreateModal, isCreateModalOpen,
        openMoreEventsModal, closeMoreEventsModal, moreEventsDate, isFilterModalOpen, openFilterModal, closeFilterModal} = useCalendarModals();
    const [filters, setFilters] = useState<CalendarEventFilters>({});
    const {events, isLoading, allEventsPage, setAllEventsPage, allEventsMeta, currentMonthEvents, allEventsSortField, allEventsSortDirection, handleAllEventsSort,
            updateEventInList, addEventToList} = useCalendarPage({view, selectedDate, filters});
    const moreEvents = moreEventsDate
        ? events.filter((event) => event.date === moreEventsDate)
        : [];
    return (
        <main className="min-h-screen w-full overflow-x-hidden px-4 py-[9px] md:px-5 xl:px-6 text-white font-[Orbitron]">
            <Header title="Calendar"/>

            <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1400px)_minmax(300px,1fr)] gap-4">
                <div className="min-w-0 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
                    <CalendarToolbar view={view} setView={setView} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onCreate={openCreateModal} onFilter={openFilterModal}/>

                    <div className="flex-1 min-h-0 overflow-auto">
                        <div className="min-w-[760px] h-full">
                            {view === "Month" && <CalendarGrid selectedDate={selectedDate} events={events} isLoading={isLoading}
                                onEventClick={openShowModal} onMoreClick={openMoreEventsModal}/>}
                            {view === "Week" && <CalendarWeek selectedDate={selectedDate} events={events} isLoading={isLoading}
                                onEventClick={openShowModal}/>}
                            {view === "Day" && <CalendarDay selectedDate={selectedDate} events={events} isLoading={isLoading}
                                onEventClick={openShowModal}/>}
                            {view === "All Events" && <CalendarAllEvents events={events} isLoading={isLoading} meta={allEventsMeta} page={allEventsPage} setPage={setAllEventsPage}
                                sortField={allEventsSortField} sortDirection={allEventsSortDirection} onSort={handleAllEventsSort} onEventClick={openShowModal}/>}
                        </div>
                    </div>
                </div>

                <aside className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 min-w-0">
                    <MiniCalendar/>
                    <UpcomingEvents events={currentMonthEvents} />
                    <CalendarStats events={currentMonthEvents} />
                </aside>
            </section>

            <EventShowModal eventId={selectedEventId} onClose={closeShowModal} onEdit={openEditModal} onEventUpdated={updateEventInList}/>
            <EventEditModal event={editingEvent} onClose={closeEditModal} onEventUpdated={updateEventInList}/>
            <EventCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onEventCreated={addEventToList}/>
            <MoreEventsModal date={moreEventsDate} events={moreEvents} onClose={closeMoreEventsModal} onEventClick={openShowModal}/>
            <EventFilterModal isOpen={isFilterModalOpen} onClose={closeFilterModal} onApply={setFilters} />
        </main>
    );
}