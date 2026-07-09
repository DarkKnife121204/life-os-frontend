import Card from "../../../components/ui/Card";
import {getUpcomingEvents} from "../utils/getUpcomingEvents";
import {formatEventDate} from "../utils/formatEventDate";
import {BG_COLOR_CLASSES, TEXT_COLOR_CLASSES, EVENT_TYPE_ICON} from "../constants/calendar.constants";
import type {CalendarEvent} from "../types/calendar.types.ts";

type CalendarUpcomingProps = {
    events: CalendarEvent[];
};

export default function UpcomingEvents({events}: CalendarUpcomingProps) {
    const upcomingEvents = getUpcomingEvents(events);

    return (
        <Card className="min-h-[300px] p-4">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-base">Upcoming Events</h3>
            </div>

            <div className="space-y-4">
                {upcomingEvents.map((event) => {
                    const Icon = EVENT_TYPE_ICON[event.type];

                    return (
                        <div key={event.id} className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${BG_COLOR_CLASSES[event.color]}  ${TEXT_COLOR_CLASSES[event.color]}`}>
                                <Icon className="h-5 w-5" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm text-zinc-100">
                                    {event.title}
                                </div>

                                <div className="mt-1 text-xs text-zinc-400">
                                    {formatEventDate(event.date, event.startTime)}
                                </div>
                            </div>

                            <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] ${BG_COLOR_CLASSES[event.color]}  ${TEXT_COLOR_CLASSES[event.color]}`}>
                                {event.type}
                            </span>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}