import { useEffect, useMemo, useRef, useState } from "react";
import { getCalendarEvents } from "../api/calendarApi";
import {
    filterEventsByRange,
    getCalendarRequestRange,
    isRangeCovered,
    mergeEvents,
    mergeRanges,
} from "../utils/getCalendarDateRange";
import type {
    CalendarEvent,
    DateRange,
    PaginationMeta,
    SortField,
    SortDirection,
    CalendarView,
    CalendarEventFilters,
} from "../types/calendar.types";

type UseCalendarEventsProps = {
    view: CalendarView;
    selectedDate: Date;
    filters: CalendarEventFilters;
};

export function useCalendarPage({ view, selectedDate, filters }: UseCalendarEventsProps) {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [allEventsPage, setAllEventsPage] = useState(1);
    const [allEventsMeta, setAllEventsMeta] = useState<PaginationMeta | null>(null);

    const allEventsPerPage = 20;

    const cachedEventsRef = useRef<CalendarEvent[]>([]);
    const loadedRangeRef = useRef<DateRange | null>(null);

    const [allEventsSortField, setAllEventsSortField] = useState<SortField | null>(null);
    const [allEventsSortDirection, setAllEventsSortDirection] = useState<SortDirection | null>(null);

    function handleAllEventsSort(field: SortField) {
        setAllEventsPage(1);

        if (allEventsSortField !== field) {
            setAllEventsSortField(field);
            setAllEventsSortDirection("asc");
            return;
        }

        if (allEventsSortDirection === "asc") {
            setAllEventsSortDirection("desc");
            return;
        }

        setAllEventsSortField(null);
        setAllEventsSortDirection(null);
    }

    useEffect(() => {
        if (view !== "All Events") {
            setAllEventsPage(1);
        }
    }, [view]);

    useEffect(() => {
        cachedEventsRef.current = [];
        loadedRangeRef.current = null;
        setAllEventsPage(1);
    }, [filters]);

    useEffect(() => {
        async function loadEvents() {
            if (view === "All Events") {
                try {
                    setIsLoading(true);

                    const response = await getCalendarEvents({
                        ...filters,
                        page: allEventsPage,
                        per_page: allEventsPerPage,
                        sort: allEventsSortField ?? undefined,
                        order: allEventsSortDirection ?? undefined,
                    });

                    setEvents(response.events);
                    setAllEventsMeta(response.meta);
                } catch (error) {
                    console.error("Failed to load calendar events", error);
                } finally {
                    setIsLoading(false);
                }

                return;
            }

            const requestedRange = getCalendarRequestRange(view, selectedDate);

            if (!requestedRange) {
                return;
            }

            if (isRangeCovered(loadedRangeRef.current, requestedRange)) {
                const filteredEvents = filterEventsByRange(cachedEventsRef.current, requestedRange);

                setEvents(filteredEvents);
                return;
            }

            try {
                setIsLoading(true);

                const response = await getCalendarEvents({
                    ...requestedRange,
                    ...filters,
                });

                cachedEventsRef.current = mergeEvents(cachedEventsRef.current, response.events);

                loadedRangeRef.current = mergeRanges(loadedRangeRef.current, requestedRange);

                const filteredEvents = filterEventsByRange(cachedEventsRef.current, requestedRange);

                setEvents(filteredEvents);
            } catch (error) {
                console.error("Failed to load calendar events", error);
            } finally {
                setIsLoading(false);
            }
        }

        loadEvents();
    }, [view, selectedDate, allEventsPage, allEventsSortField, allEventsSortDirection, filters]);

    const currentMonthEvents = useMemo(() => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();

        return events.filter((event) => {
            const eventDate = new Date(event.date);

            return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        });
    }, [events, selectedDate]);

    function updateEventInList(updatedEvent: CalendarEvent) {
        setEvents((prevEvents) => prevEvents.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)));

        cachedEventsRef.current = cachedEventsRef.current.map((item) =>
            item.id === updatedEvent.id ? updatedEvent : item,
        );
    }

    function addEventToList(createdEvent: CalendarEvent) {
        cachedEventsRef.current = mergeEvents(cachedEventsRef.current, [createdEvent]);

        if (view === "All Events") {
            setEvents((prevEvents) => mergeEvents(prevEvents, [createdEvent]));

            return;
        }

        const requestedRange = getCalendarRequestRange(view, selectedDate);

        if (!requestedRange) {
            return;
        }

        const filteredEvents = filterEventsByRange(cachedEventsRef.current, requestedRange);

        setEvents(filteredEvents);
    }

    return {
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
    };
}
