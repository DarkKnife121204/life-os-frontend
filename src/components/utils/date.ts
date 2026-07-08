export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function getDateFromValue(value: string) {
    if (!value) return new Date();

    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
}

export function isSameDate(firstDate: Date, secondDate: Date) {
    return formatDate(firstDate) === formatDate(secondDate);
}

export function getCalendarDays(currentDate: Date) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const startDate = new Date(year, month, 1 - firstDayIndex);

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + index);

        return date;
    });
}

export function getPrevMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}

export function getNextMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}