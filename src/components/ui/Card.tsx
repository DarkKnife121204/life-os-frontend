import React from "react";

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
    return (
        <div
            className={`rounded-xl border border-cyan-400/10 bg-black/20 shadow-[0_0_18px_rgba(0,255,255,0.04)] ${className}`}
        >
            {children}
        </div>
    );
}