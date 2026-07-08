import {DOT_PRIORITY_CLASSES, STATUS_CLASSES} from "../constants/calendar.constants.ts";
import type { CalendarEvent, EventShowModalProps} from "../types/calendar.types.ts";
import { useCalendarEvent } from "../hooks/useCalendarEvent.ts";
import {ModalRow} from "./ModalRow.tsx";
import CloseIcon from "../../../components/icons/close.svg?react";
import CalendarIcon from "../../../components/icons/calendar.svg?react";
import ClockIcon from "../../../components/icons/clock.svg?react";
import LocationIcon from "../../../components/icons/location.svg?react";
import StatusIcon from "../../../components/icons/status.svg?react";
import DescriptionIcon from "../../../components/icons/description.svg?react";
import EditIcon from "../../../components/icons/edit.svg?react";
import DeleteIcon from "../../../components/icons/delete.svg?react";
import RestoreIcon from "../../../components/icons/restore.svg?react";
import CompleteIcon from "../../../components/icons/completed.svg?react";

export default function EventShowModal({eventId, onClose, onEdit, onEventUpdated}: EventShowModalProps) {
    const {event, deleteEvent, restoreEvent, completeEvent,} = useCalendarEvent(eventId);

    async function handleAction(action: () => Promise<CalendarEvent | null>) {
        const updatedEvent = await action();
        if (!updatedEvent) return;
        onEventUpdated(updatedEvent);
    }

    if (!eventId) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="max-h-[100%] w-full max-w-[550px] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#030D14] p-6 shadow-[0_0_40px_rgba(0,255,255,0.12)] md:p-8">
                {!event && (
                    <div className="min-h-[610px]" />
                )}
                {event && (
                    <>
                        <div className="mb-1 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-4">
                                    <span className={`h-4 w-4 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`}/>
                                    <h2 className="text-xl">
                                        {event.title}
                                    </h2>
                                </div>
                                <div className="my-2">
                                    <span className="rounded-lg text-sm bg-cyan-400/10 px-3 py-2 text-cyan-300">
                                        {event.type}
                                    </span>
                                </div>
                            </div>
                            <button onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cyan-400/15 bg-[#030D14]
                                text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                                <CloseIcon className="h-6 w-6"/>
                            </button>
                        </div>
                        <div className="divide-y divide-cyan-500/15 border-y border-cyan-500/15">
                            <ModalRow icon={<DescriptionIcon/>} title="Description" value={event.description || "No description"}/>
                            <ModalRow icon={<CalendarIcon/>} title="Type" value={event.type}/>
                            <ModalRow icon={<CalendarIcon />} title="Date" value={event.date}/>
                            <ModalRow icon={<ClockIcon />} title="Start" value={event.startTime}/>
                            <ModalRow icon={<ClockIcon />} title="End" value={event.endTime}/>
                            <ModalRow icon={<LocationIcon />} title="Location" value={event.location || "No location"}/>
                            <ModalRow icon={<span className={`block h-5 w-5 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`} />} title="Priority" value={event.priority}/>
                            <div className="grid grid-cols-[20px_1fr] gap-5 py-2">
                                <div className="pt-1 text-cyan-300">
                                    <StatusIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="mb-1 text-sm font-semibold text-zinc-100">Status</h3>
                                    <span className={`inline-flex rounded-lg px-2 py-1 text-sm ${STATUS_CLASSES[event.status]}`}>{event.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className={`mt-4 grid grid-cols-1 gap-4 ${event.status === "Upcoming" ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                            <button onClick={() => onEdit(event)} className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-cyan-400
                                py-4  text-black hover:shadow-[0_0_18px_rgba(0,255,255,0.35)] transition hover:bg-cyan-300">
                                <EditIcon className="h-5 w-5"/>
                                Edit
                            </button>
                            {event.status === "Cancelled" ? (
                                <button onClick={() => handleAction(restoreEvent)} className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-emerald-400
                                    py-4 text-black transition hover:bg-emerald-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)]">
                                    <RestoreIcon className="h-5 w-5"/>
                                    Restore
                                </button>
                            ) : (
                                <>
                                    {event.status === "Upcoming" ? (
                                        <button onClick={() => handleAction(completeEvent)} className="cursor-pointer flex items-center justify-center gap-2 rounded-xl
                                            bg-emerald-400 py-4 text-black transition hover:bg-emerald-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)]">
                                            <CompleteIcon className="h-5 w-5"/>
                                            Complete
                                        </button>
                                    ) : null}
                                    <button onClick={() => handleAction(deleteEvent)} className="cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-pink-500
                                        py-4 text-black transition hover:bg-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.35)]">
                                        <DeleteIcon className="h-5 w-5"/>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
