import { createContext, useContext, useState } from "react";
import Toast from "../../components/ui/Toast.tsx";

type ToastType = {
    id: number;
    title: string;
    message: string;
    status?: number;
};

type ToastContextType = {
    showToast: (data: Omit<ToastType, "id">) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};

let idCounter = 0;

export default function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastType[]>([]);

    const showToast = (data: Omit<ToastType, "id">) => {
        const id = ++idCounter;

        setToasts((prev) => [...prev, { ...data, id }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        title={toast.title}
                        message={toast.message}
                        status={toast.status}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}