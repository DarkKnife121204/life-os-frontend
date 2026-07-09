import { useState } from "react";

export function useEventFilterModal() {
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    function openFilterModal() {
        setIsFilterModalOpen(true);
    }

    function closeFilterModal() {
        setIsFilterModalOpen(false);
    }

    return {
        isFilterModalOpen,
        openFilterModal,
        closeFilterModal,
    };
}