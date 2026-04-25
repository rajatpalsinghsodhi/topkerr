import Link from "next/link";
import { cn } from "@/lib/cn";
import type {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  ReactNode,
} from "react";

type ButtonProps =
  | ({
      href: string;
      children: ReactNode;
      variant?: "solid" | "ghost";
      className?: string;
    } & Omit<ComponentPropsWithoutRef<"a">, "href">)
  | ({
      href?: never;
      children: ReactNode;
      variant?: "solid" | "ghost";
      className?: string;
      type?: "button" | "submit" | "reset";
      onClick?: MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
    } & Omit<ComponentPropsWithoutRef<"button">, "onClick">);

export function Button(props: ButtonProps) {
  const common = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide",
    "transition-[transform,filter] duration-150 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(255,214,138,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    props.variant === "ghost"
      ? "text-[rgba(245,243,238,0.92)] hover:text-white"
      : "font-medium !text-[#07070a]",
    props.className,
  );

  const chrome =
    props.variant === "ghost"
      ? "border border-white/15 bg-white/0 hover:bg-white/5"
      : "bg-[color:var(--accent)]";

  const sheen =
    props.variant === "ghost"
      ? "bg-gradient-to-r from-transparent via-white/10 to-transparent"
      : "bg-gradient-to-r from-white/40 via-white/0 to-white/25";

  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          chrome,
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl",
          "transition-opacity duration-200 [transition-timing-function:var(--ease-out)] group-hover:opacity-100",
          props.variant === "ghost" ? "bg-white/10" : "bg-[color:var(--glow)]",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0",
          "transition-opacity duration-200 [transition-timing-function:var(--ease-out)] group-hover:opacity-100",
          sheen,
        )}
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />
      <span
        className={cn(
          "relative z-10",
          props.variant === "ghost" ? "text-inherit" : "!text-[#07070a]",
        )}
      >
        {props.children}
      </span>
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, children: _children, className: _className, variant: _variant, ...rest } = props;
    void _children;
    void _className;
    void _variant;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={common}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {inner}
      </Link>
    );
  }

  const { children: _children, className: _className, variant: _variant, ...rest } = props;
  void _children;
  void _className;
  void _variant;
  return (
    <button className={common} {...rest}>
      {inner}
    </button>
  );
}

