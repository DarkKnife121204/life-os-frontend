import React from "react";
import Card from "@/components/ui/Card";

type StatCardProps = {
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
};

export default function StatCard({ icon: Icon, value, label, color }: StatCardProps) {
    return (
        <Card className="min-h-20 px-4 py-3 md:px-5 flex items-center gap-4 md:gap-5">
            <div className={`shrink-0 text-3xl md:text-4xl ${color} drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]`}>
                <Icon className="h-8 w-8 md:h-10 md:w-10" />
            </div>

            <div className="min-w-0">
                <div className="text-xl md:text-2xl leading-none">{value}</div>

                <div className="mt-2 truncate text-xs md:text-sm text-zinc-400">{label}</div>
            </div>
        </Card>
    );
}
