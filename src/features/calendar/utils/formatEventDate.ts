import { getDateTime } from "./date";

export function formatEventDate(date: string, time: string): string {
    const eventDate = getDateTime(date, time);

    return eventDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    }) + `, ${time}`;
}