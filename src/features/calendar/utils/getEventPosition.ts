import { getMinutesFromTime } from "./date";

export function getEventPosition(startTime: string, endTime: string, allDayHeight = 52) {
    const hourHeight = 52;

    const startTotalMinutes = getMinutesFromTime(startTime);
    const endTotalMinutes = getMinutesFromTime(endTime);

    const top = allDayHeight + (startTotalMinutes / 60) * hourHeight;
    const height = ((endTotalMinutes - startTotalMinutes) / 60) * hourHeight;

    return {
        top: `${top}px`,
        height: `${Math.max(height, 42)}px`,
    };
}
