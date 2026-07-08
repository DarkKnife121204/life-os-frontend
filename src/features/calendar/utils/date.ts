export function getMinutesFromTime(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}

export function getDateTime(date: string, time: string): Date {
    return new Date(`${date}T${time}`);
}