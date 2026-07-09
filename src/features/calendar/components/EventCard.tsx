import {isAllDayEvent} from "../utils/isAllDayEvent";
import {BG_COLOR_CLASSES, DOT_PRIORITY_CLASSES, TEXT_COLOR_CLASSES, STATUS_CLASSES} from "../constants/calendar.constants.ts";
import type {CalendarEvent} from "../types/calendar.types.ts";

type EventCardProps = {
    event: CalendarEvent;
    compact?: boolean;
    showDescription?: boolean;
    showType?: boolean;
    showStatus?: boolean;
    timeView?: "hidden" | "inline" | "block";
    onClick?: (event: CalendarEvent) => void;
};

export default function EventCard({event, compact = false, showDescription = false, showType = false, showStatus = false,
                                      timeView = compact ? "hidden" : "block", onClick}: EventCardProps) {
    const isAllDay = isAllDayEvent(event.startTime, event.endTime);
    const timeText = isAllDay ? "All day" : `${event.startTime} - ${event.endTime}`;

    return (
        <div onClick={() => onClick?.(event)} className={`flex cursor-pointer items-center justify-between rounded-md border-l-2 px-2 text-xs 
            backdrop-blur-xl transition hover:scale-[1.01] hover:brightness-125
            ${compact ? "h-[40px] py-1" : "py-1"} ${BG_COLOR_CLASSES[event.color]} ${TEXT_COLOR_CLASSES[event.color]}`}>
            <div className="flex h-full min-w-0 gap-2">
                {timeView === "inline" && (
                    <>
                        <div className={`flex shrink-0 flex-col gap-1 text-sm ${TEXT_COLOR_CLASSES[event.color]}`}>
                            <span>{event.startTime}</span>
                            <span>{event.endTime}</span>
                        </div>

                        <div className={`w-[2px] min-h-full shrink-0 ${BG_COLOR_CLASSES[event.color]}`}/>
                    </>
                )}

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-zinc-100">
                        <div className="flex min-w-0 items-center gap-1">
                            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`}/>

                            <span className="truncate text-xs">
                                {event.title}
                            </span>
                        </div>
                    </div>

                    {timeView === "block" && (
                        <div className="mt-1 text-zinc-300">
                            {timeText}
                        </div>
                    )}

                    {showDescription && event.description && (
                        <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                            {event.description}
                        </p>
                    )}
                </div>
            </div>
            <div className={`flex items-center justify-center gap-2`}>
                {showType && (
                    <span className={` rounded-md px-2 py-1 text-xs ${BG_COLOR_CLASSES[event.color]} ${TEXT_COLOR_CLASSES[event.color]}`}>
                        {event.type}
                    </span>
                )}

                {showStatus && (
                    <span className={` rounded-md px-2 py-1 text-xs ${STATUS_CLASSES[event.status]}`}>
                        {event.status}
                    </span>
                )}
            </div>
        </div>
    );
}