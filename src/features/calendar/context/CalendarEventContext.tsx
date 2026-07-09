import { createContext, useContext } from "react";
import type { CalendarEvent } from "../types/calendar.types";

type CalendarEventContextType = {
    openEvent: (event: CalendarEvent) => void;
    openMoreEvents: (date: string) => void;
};

const CalendarEventContext = createContext<CalendarEventContextType | null>(null);

export function useCalendarEventContext() {
    const context = useContext(CalendarEventContext);

    if (!context) {
        throw new Error("Ups");
    }

    return context;
}

export const CalendarEventProvider = CalendarEventContext.Provider;
