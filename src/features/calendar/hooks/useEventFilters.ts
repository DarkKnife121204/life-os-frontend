import { useState } from "react";
import { colorOptions, priorityOptions, statusOptions, typeOptions } from "@/components/constants/constants";

export function useEventFilters() {
    const [search, setSearch] = useState("");

    const [types, setTypes] = useState<string[]>(typeOptions.map((option) => option.value));

    const [priorities, setPriorities] = useState<string[]>(priorityOptions.map((option) => option.value));

    const [statuses, setStatuses] = useState<string[]>(statusOptions.map((option) => option.value));

    const [colors, setColors] = useState<string[]>(colorOptions.map((option) => option.value));

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    function resetFilters() {
        setSearch("");
        setTypes(typeOptions.map((option) => option.value));
        setPriorities(priorityOptions.map((option) => option.value));
        setStatuses(statusOptions.map((option) => option.value));
        setColors(colorOptions.map((option) => option.value));
        setFromDate("");
        setToDate("");
    }

    function getFilters() {
        return {
            search: search || undefined,
            type: types.length === typeOptions.length ? undefined : types,
            priority: priorities.length === priorityOptions.length ? undefined : priorities,
            status: statuses.length === statusOptions.length ? undefined : statuses,
            color: colors.length === colorOptions.length ? undefined : colors,
            from_date: fromDate || undefined,
            to_date: toDate || undefined,
        };
    }

    return {
        search,
        setSearch,
        types,
        setTypes,
        priorities,
        setPriorities,
        statuses,
        setStatuses,
        colors,
        setColors,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        resetFilters,
        getFilters,
    };
}
