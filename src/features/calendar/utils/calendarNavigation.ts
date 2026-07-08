import type { CalendarView } from "../types/calendar.types";

function addMonths(date: Date, amount: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + amount);

    return newDate;
}

function addDays(date: Date, amount: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);

    return newDate;
}

export function getPrevMonth(date: Date): Date {
    return addMonths(date, -1);
}

export function getNextMonth(date: Date): Date {
    return addMonths(date, 1);
}

export function getPrevWeek(date: Date): Date {
    return addDays(date, -7);
}

export function getNextWeek(date: Date): Date {
    return addDays(date, 7);
}

export function getPrevDay(date: Date): Date {
    return addDays(date, -1);
}

export function getNextDay(date: Date): Date {
    return addDays(date, 1);
}

export function getPrevDateByView(view: CalendarView, date: Date): Date {
    if (view === "Day") {
        return getPrevDay(date);
    }

    if (view === "Week") {
        return getPrevWeek(date);
    }

    return getPrevMonth(date);
}

export function getNextDateByView(view: CalendarView, date: Date): Date {
    if (view === "Day") {
        return getNextDay(date);
    }

    if (view === "Week") {
        return getNextWeek(date);
    }

    return getNextMonth(date);
}