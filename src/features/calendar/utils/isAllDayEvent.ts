export function isAllDayEvent(startTime: string, endTime: string) {
    return startTime === "00:00" && endTime === "23:59";
}