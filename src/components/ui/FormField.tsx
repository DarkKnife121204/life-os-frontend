import type { ReactNode } from "react";

type FormFieldProps = {
    label: string;
    children: ReactNode;
    required?: boolean;
    className?: string;
};

export default function FormField({label, children, required = false, className = ""}: FormFieldProps) {
    return (
        <div className={className}>
            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                {label}

                {required && (
                    <span className="text-pink-400"> *</span>
                )}
            </label>

            {children}
        </div>
    );
}