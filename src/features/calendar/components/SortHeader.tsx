import ArrowIcon from "@/components/icons/arrow.svg?react";
import type {SortDirection} from "../types/calendar.types.ts";

type CalendarTableSortHeaderProps<T extends string> = {
    label: string;
    field: T;
    activeField: T | null;
    direction: SortDirection | null;
    onSort: (field: T) => void;
};

export default function CalendarTableSortHeader<T extends string>({label, field, activeField, direction, onSort}: CalendarTableSortHeaderProps<T>) {
    const isActive = activeField === field;

    return (
        <th className="h-12 px-4 py-3">
            <button type="button" onClick={() => onSort(field)} className="flex items-center gap-1 text-left transition hover:text-cyan-300 cursor-pointer">
                <span>{label}</span>

                <ArrowIcon className={`h-5 w-5 shrink-0 ${isActive && direction ? "opacity-100" : "opacity-0"} ${direction === "asc" ? "-rotate-90" : "rotate-90"}`}/>
            </button>
        </th>
    );
}