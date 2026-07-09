import type {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
    primary:
        "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_18px_rgba(0,255,255,0.35)]",

    secondary:
        "border border-cyan-500/30 text-white hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]",

    success:
        "bg-emerald-400 text-black hover:bg-emerald-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)]",

    danger:
        "bg-pink-500 text-black hover:bg-pink-400 hover:shadow-[0_0_18px_rgba(236,72,153,0.35)]",
};

export default function Button({children, variant = "primary", className = "", ...props}: ButtonProps) {
    return (
        <button{...props} className={`cursor-pointer rounded-xl transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}