import { FULL_CALENDAR_VIEWS } from "../constants/calendar.constants";
import type { CalendarWeekDay } from "../types/calendar.types.ts";
import { formatDate } from "@/components/utils/date";

export function getWeekDays(selectedDate: Date): CalendarWeekDay[] {
    const currentDay = selectedDate.getDay() === 0 ? 7 : selectedDate.getDay();

    const monday = new Date(selectedDate);
    monday.setDate(selectedDate.getDate() - currentDay + 1);

    const today = formatDate(new Date());

    return FULL_CALENDAR_VIEWS.map((label, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);

        const formattedDate = formatDate(date);

        return {
            date: formattedDate,
            label,
            day: date.getDate(),
            weekend: index >= 5,
            active: formattedDate === today,
        };
    });
}
