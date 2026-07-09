import type { ComponentType, SVGProps } from "react";

export type DropdownOption = {
    label: string;
    value: string;
};

export type CustomDropdownProps = {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    isInvalid?: boolean;
};

export type CustomTimeDropdownProps = {
    value: string;
    onChange: (value: string) => void;
    isInvalid?: boolean;
};

export type CustomDateDropdownProps = {
    value: string;
    onChange: (value: string) => void;
    isInvalid?: boolean;
};

export type CheckboxGroupOption = {
    label: string;
    value: string;
    color?: string;
    image?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type CheckboxGroupProps = {
    title: string;
    options: CheckboxGroupOption[];
    values: string[];
    onChange: (values: string[]) => void;
    variant?: "default" | "dot";
    layout?: "list" | "grid";
};
