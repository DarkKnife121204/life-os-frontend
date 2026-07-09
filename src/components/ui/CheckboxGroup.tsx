import type { CheckboxGroupOption, CheckboxGroupProps } from "../types/types.ts";
import MarkIcon from "../icons/mark.svg?react";
import { toggleValue } from "../utils/toggleValue";

function FilterIcon({ option }: { option: CheckboxGroupOption }) {
    const Icon = option.image;

    if (!Icon) return null;

    return (
        <span
            className={`flex h-8 w-8 items-center justify-center rounded-xl bg-black/20 ${option.color ?? "text-cyan-400"}`}
        >
            <Icon className="h-5 w-5" />
        </span>
    );
}

export default function CheckboxGroup({
    title,
    options,
    values,
    onChange,
    variant = "default",
    layout = "list",
}: CheckboxGroupProps) {
    const isDot = variant === "dot";
    const isGrid = layout === "grid";

    return (
        <div>
            <h3 className="mb-4 text-sm text-zinc-100">{title}</h3>

            <div className={isGrid ? "grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4" : "space-y-2"}>
                {options.map((option) => {
                    const checked = values.includes(option.value);

                    return (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-4 text-sm text-zinc-100"
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => onChange(toggleValue(option.value, values))}
                                className="hidden"
                            />

                            <span
                                className={`flex shrink-0 items-center justify-center border text-sm transition ${isGrid ? "h-7 w-7 rounded-md" : "h-5 w-5 rounded"}
                                ${checked ? "border-cyan-400 bg-cyan-400 text-white shadow-[0_0_12px_rgba(0,255,255,0.25)]" : "border-cyan-500/30 bg-[#030D14]"}`}
                            >
                                {checked && <MarkIcon className="h-4 w-4 text-zinc-800" />}
                            </span>

                            {isDot ? (
                                <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-xl bg-black/20 ${option.color ?? "text-cyan-400"}`}
                                >
                                    <span className="h-4 w-4 rounded-full bg-current" />
                                </span>
                            ) : (
                                <FilterIcon option={option} />
                            )}

                            <span>{option.label}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
