import PrevIcon from "@/components/icons/prev.svg?react";
import SearchIcon from "@/components/icons/search.svg?react";
import Card from "@/components/ui/Card.tsx";
import CalendarTableSortHeader from "./SortHeader";
import { getPaginationPages } from "../utils/pagination";
import { useCalendarEventContext } from "../context/CalendarEventContext";
import Input from "@/components/ui/Input.tsx";
import { useAllEventsSearch } from "../hooks/useAllEventsSearch";
import {
    BG_COLOR_CLASSES,
    TEXT_COLOR_CLASSES,
    DOT_PRIORITY_CLASSES,
    STATUS_CLASSES,
    TEXT_PRIORITY_CLASSES,
    TABLE_HEADERS,
} from "../constants/calendar.constants.ts";
import type { CalendarEvent, PaginationMeta, SortDirection, SortField } from "../types/calendar.types.ts";
import type { Dispatch, SetStateAction } from "react";

type CalendarAllEventsProps = {
    events: CalendarEvent[];
    isLoading: boolean;
    meta: PaginationMeta | null;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;

    sortField: SortField | null;
    sortDirection: SortDirection | null;
    onSort: (field: SortField) => void;
    search: string;
    onSearchChange: (search: string) => void;
};

export default function CalendarAllEvents({
    events,
    isLoading = false,
    meta,
    page,
    setPage,
    sortField,
    sortDirection,
    onSort,
    search,
    onSearchChange,
}: CalendarAllEventsProps) {
    const paginationPages = meta ? getPaginationPages(meta.current_page, meta.last_page) : [];
    const { openEvent } = useCalendarEventContext();
    const { search: searchValue, setSearch: setSearchValue } = useAllEventsSearch({
        value: search,
        onChange: onSearchChange,
    });
    return (
        <Card className="h-full min-h-0 overflow-hidden flex flex-col">
            <div className="flex h-full min-h-0 flex-col p-5">
                <div className="shrink-0 mb-5 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_165px_120px_150px_auto_auto]">
                    <div className="relative max-w-xl">
                        <Input
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            placeholder="Search events..."
                            className="h-10 pr-10 text-sm"
                        />

                        <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                    </div>
                </div>

                {isLoading && events.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center text-sm text-zinc-400">
                        Loading events...
                    </div>
                ) : (
                    <div className="flex-1 min-h-0 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <table className="w-full min-w-[980px] border-collapse text-sm">
                            <thead className="sticky top-0 z-10 bg-[#031018]">
                                <tr className="border-b border-cyan-400/10 bg-cyan-400/5 text-left text-xs text-zinc-300">
                                    {TABLE_HEADERS.map((header) => (
                                        <CalendarTableSortHeader
                                            key={header.field}
                                            label={header.label}
                                            field={header.field}
                                            activeField={sortField}
                                            direction={sortDirection}
                                            onSort={onSort}
                                        />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr
                                        key={event.id}
                                        onClick={() => openEvent(event)}
                                        className="cursor-pointer border-b border-cyan-400/10 transition hover:bg-cyan-400/2"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${DOT_PRIORITY_CLASSES[event.priority]}`}
                                                />
                                                <div>
                                                    <div className="font-semibold text-zinc-100">{event.title}</div>
                                                    <div className="mt-1 text-xs text-zinc-400">
                                                        {event.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-md px-2.5 py-1 text-xs ${BG_COLOR_CLASSES[event.color]} ${TEXT_COLOR_CLASSES[event.color]}`}
                                            >
                                                {event.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-zinc-200">{event.date}</td>
                                        <td className="px-4 py-3 text-zinc-200">{event.startTime}</td>
                                        <td className="px-4 py-3 text-zinc-200">{event.endTime}</td>
                                        <td className="px-4 py-3 text-zinc-200">{event.location}</td>
                                        <td className="px-4 py-3">
                                            <div
                                                className={`flex items-center gap-2 ${TEXT_PRIORITY_CLASSES[event.priority]}`}
                                            >
                                                {event.priority}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-md px-3 py-1 text-xs ${STATUS_CLASSES[event.status]}`}
                                            >
                                                {event.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="shrink-0 mt-5 flex items-center justify-between text-sm text-zinc-400">
                    <span>
                        Showing {events.length} of {meta?.total ?? events.length} events
                    </span>

                    {meta && (
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                disabled={page <= 1 || isLoading}
                                onClick={() => setPage((prev) => prev - 1)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg border border-cyan-400/10 text-zinc-500
                                        hover:bg-cyan-400/10 hover:text-cyan-300 transition hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]
                                        disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                            >
                                <PrevIcon className="h-6 w-6 transition-transform duration-300" />
                            </button>

                            {paginationPages.map((pageNumber) => {
                                const isActive = pageNumber === meta.current_page;

                                return (
                                    <button
                                        key={pageNumber}
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setPage(pageNumber)}
                                        className={`h-8 min-w-8 rounded-lg border px-2 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40
                                        ${
                                            isActive
                                                ? "border-cyan-400/50 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                                : "border-cyan-400/10 text-zinc-500 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                type="button"
                                disabled={page >= meta.last_page || isLoading}
                                onClick={() => setPage((prev) => prev + 1)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg border border-cyan-400/10 text-zinc-500
                                    hover:bg-cyan-400/10 hover:text-cyan-300 transition hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]
                                    disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                            >
                                <PrevIcon className="h-6 w-6 transition-transform duration-300 rotate-180" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
