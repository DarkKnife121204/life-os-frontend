import { DOT_PRIORITY_CLASSES, STATUS_CLASSES } from "../constants/calendar.constants.ts";
import type { CalendarEvent } from "../types/calendar.types.ts";
import { useCalendarEvent } from "../hooks/useCalendarEvent.ts";
import { ModalRow } from "./ModalRow.tsx";
import Modal from "@/components/ui/Modal.tsx";
import ModalCloseButton from "@/components/ui/ModalCloseButton.tsx";
import Button from "@/components/ui/Button.tsx";
import CalendarIcon from "@/components/icons/calendar.svg?react";
import ClockIcon from "@/components/icons/clock.svg?react";
import LocationIcon from "@/components/icons/location.svg?react";
import StatusIcon from "@/components/icons/status.svg?react";
import DescriptionIcon from "@/components/icons/description.svg?react";
import EditIcon from "@/components/icons/edit.svg?react";
import DeleteIcon from "@/components/icons/delete.svg?react";
import RestoreIcon from "@/components/icons/restore.svg?react";
import CompleteIcon from "@/components/icons/completed.svg?react";

type EventShowModalProps = {
    eventId: number | null;
    onClose: () => void;
    onEdit: (event: CalendarEvent) => void;
    onEventUpdated: (event: CalendarEvent) => void;
};

export default function EventShowModal({ eventId, onClose, onEdit, onEventUpdated }: EventShowModalProps) {
    const { event, deleteEvent, restoreEvent, completeEvent } = useCalendarEvent(eventId);

    async function handleAction(action: () => Promise<CalendarEvent | null>) {
        const updatedEvent = await action();
        if (!updatedEvent) return;
        onEventUpdated(updatedEvent);
    }

    if (!eventId) return null;

    return (
        <Modal>
            {!event && <div className="min-h-[610px]" />}
            {event && (
                <>
                    <div className="mb-1 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-4">
                                <span className={`h-4 w-4 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`} />
                                <h2 className="text-xl">{event.title}</h2>
                            </div>
                            <div className="my-2">
                                <span className="rounded-lg text-sm bg-cyan-400/10 px-3 py-2 text-cyan-300">
                                    {event.type}
                                </span>
                            </div>
                        </div>
                        <ModalCloseButton onClick={onClose} />
                    </div>
                    <div className="divide-y divide-cyan-500/15 border-y border-cyan-500/15">
                        <ModalRow
                            icon={<DescriptionIcon />}
                            title="Description"
                            value={event.description || "No description"}
                        />
                        <ModalRow icon={<CalendarIcon />} title="Type" value={event.type} />
                        <ModalRow icon={<CalendarIcon />} title="Date" value={event.date} />
                        <ModalRow icon={<ClockIcon />} title="Start" value={event.startTime} />
                        <ModalRow icon={<ClockIcon />} title="End" value={event.endTime} />
                        <ModalRow icon={<LocationIcon />} title="Location" value={event.location || "No location"} />
                        <ModalRow
                            icon={
                                <span
                                    className={`block h-5 w-5 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`}
                                />
                            }
                            title="Priority"
                            value={event.priority}
                        />
                        <div className="grid grid-cols-[20px_1fr] gap-5 py-2">
                            <div className="pt-1 text-cyan-300">
                                <StatusIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-sm font-semibold text-zinc-100">Status</h3>
                                <span
                                    className={`inline-flex rounded-lg px-2 py-1 text-sm ${STATUS_CLASSES[event.status]}`}
                                >
                                    {event.status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`mt-4 grid grid-cols-1 gap-4 ${event.status === "Upcoming" ? "md:grid-cols-3" : "md:grid-cols-2"}`}
                    >
                        <Button onClick={() => onEdit(event)} className="flex items-center justify-center gap-2 py-4">
                            <EditIcon className="h-5 w-5" />
                            Edit
                        </Button>
                        {event.status === "Cancelled" ? (
                            <Button
                                variant="success"
                                onClick={() => handleAction(restoreEvent)}
                                className="flex items-center justify-center gap-2 py-4"
                            >
                                <RestoreIcon className="h-5 w-5" />
                                Restore
                            </Button>
                        ) : (
                            <>
                                {event.status === "Upcoming" ? (
                                    <Button
                                        variant="success"
                                        onClick={() => handleAction(completeEvent)}
                                        className="flex items-center justify-center gap-2 py-4"
                                    >
                                        <CompleteIcon className="h-5 w-5" />
                                        Complete
                                    </Button>
                                ) : null}
                                <Button
                                    variant="danger"
                                    onClick={() => handleAction(deleteEvent)}
                                    className="flex items-center justify-center gap-2 py-4"
                                >
                                    <DeleteIcon className="h-5 w-5" />
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </Modal>
    );
}
