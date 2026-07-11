import { useEffect, useState } from "react";

type UseAllEventsSearchParams = {
    value: string;
    onChange: (value: string) => void;
    delay?: number;
};

export function useAllEventsSearch({ value, onChange, delay = 400 }: UseAllEventsSearchParams) {
    const [search, setSearch] = useState(value);

    useEffect(() => {
        setSearch(value);
    }, [value]);

    useEffect(() => {
        const normalizedSearch = search.trim();

        if (normalizedSearch === value) {
            return;
        }

        const timeout = window.setTimeout(() => {
            onChange(normalizedSearch);
        }, delay);

        return () => window.clearTimeout(timeout);
    }, [search, value, onChange, delay]);

    return {
        search,
        setSearch,
    };
}
