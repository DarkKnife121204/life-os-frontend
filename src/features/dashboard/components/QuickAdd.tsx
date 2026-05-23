import QuickButton from "./QuickButton";

import CheckIcon from "../../../components/icons/check.svg?react";
import TaskIcon from "../../../components/icons/tasks.svg?react";
import NoteIcon from "../../../components/icons/note.svg?react";
import CloudIcon from "../../../components/icons/cloud.svg?react";

import Card from "../../../components/ui/Card";

export default function QuickAdd() {
    return (
        <Card className="h-[300px] p-8">
            <h2 className="text-xl font-[Orbitron] mb-4">
                Quick Add
            </h2>

            <div className="grid grid-cols-4 gap-5">
                <QuickButton icon={CheckIcon} label="New Task" />
                <QuickButton icon={TaskIcon} label="New Event" purple />
                <QuickButton icon={NoteIcon} label="New Note" />
                <QuickButton icon={CloudIcon} label="Upload" />
            </div>

            <button className="h-14 mt-2 w-full rounded-xl bg-cyan-400 text-slate-950 font-[Orbitron] flex items-center justify-center gap-4 hover:bg-cyan-300 transition">
                Quick Add
            </button>
        </Card>
    );
}