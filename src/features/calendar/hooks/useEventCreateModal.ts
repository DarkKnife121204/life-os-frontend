import { useState } from "react";

export function useEventCreateModal() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    function openCreateModal() {
        setIsCreateModalOpen(true);
    }

    function closeCreateModal() {
        setIsCreateModalOpen(false);
    }

    return {
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
    };
}
