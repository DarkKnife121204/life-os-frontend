import QuickButton from "./QuickButton";

import CheckIcon from "@/components/icons/check.svg?react";
import TaskIcon from "@/components/icons/tasks.svg?react";
import NoteIcon from "@/components/icons/note.svg?react";
import CloudIcon from "@/components/icons/cloud.svg?react";

import Card from "@/components/ui/Card";

export default function QuickAdd() {
    return (
        <Card className="min-h-[260px] p-4 md:p-5 xl:p-6">
            <h2 className="mb-4 text-xl leading-tight">
                Quick Add
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-2 gap-3 md:gap-4">
                <QuickButton icon={CheckIcon} label="New Task" />
                <QuickButton icon={TaskIcon} label="New Event" purple />
                <QuickButton icon={NoteIcon} label="New Note" />
                <QuickButton icon={CloudIcon} label="Upload" />
            </div>

            <button className="mt-4 flex h-12 md:h-14 w-full cursor-pointer items-center justify-center gap-4 rounded-xl bg-cyan-400 text-sm md:text-base text-slate-950
                hover:bg-cyan-300 hover:shadow-[0_0_18px_rgba(0,255,255,0.35)] transition">
                Quick Add
            </button>
        </Card>
    );
}