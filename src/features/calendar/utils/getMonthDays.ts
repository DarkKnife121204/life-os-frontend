import { formatDate } from "@/components/utils/date";
import type { CalendarDay } from "../types/calendar.types.ts";

export function getMonthDays(year: number, month: number): CalendarDay[] {
    const firstDay = new Date(year, month, 1);
    const firstWeekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay();

    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - (firstWeekDay - 1));

    const today = formatDate(new Date());
    const days: CalendarDay[] = [];

    for (let i = 0; i < 35; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        const formattedDate = formatDate(currentDate);

        days.push({
            day: currentDate.getDate(),
            date: formattedDate,
            isCurrentMonth: currentDate.getMonth() === month,
            isSunday: currentDate.getDay() === 0,
            isToday: formattedDate === today,
        });
    }

    return days;
}
