import type { ReactNode } from "react";

type ModalProps = {
    children: ReactNode;
    maxWidth?: string;
};

export default function Modal({ children, maxWidth = "max-w-[750px]" }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center px-4 py-6">
                <div
                    className={`relative w-full overflow-visible rounded-2xl border border-cyan-500/30 bg-[#030D14] p-6 shadow-[0_0_40px_rgba(0,255,255,0.12)] md:p-8 ${maxWidth}`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
