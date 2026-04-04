"use client";

import type { WeddingTheme } from "@/lib/data";
import type { CSSProperties, ReactNode } from "react";

type ThemeWrapperProps = {
  theme: WeddingTheme;
  children: ReactNode;
  className?: string;
};

/**
 * Applies global visual tokens (background, text, font body) for the active template.
 */
export function ThemeWrapper({ theme, children, className = "" }: ThemeWrapperProps) {
  const { colors, fonts } = theme;
  return (
    <div
      className={`relative min-h-dvh w-full overflow-x-hidden ${className}`}
      style={{
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: `var(${fonts.bodyVar}), system-ui, sans-serif`,
        // expose for children / arbitrary CSS
        ["--theme-accent" as string]: colors.accent,
        ["--theme-muted" as string]: colors.muted,
        ["--theme-border" as string]: colors.border ?? colors.accent,
        ["--theme-surface" as string]: colors.surface ?? colors.background,
        ["--theme-foreground" as string]: colors.foreground,
      }}
    >
      {children}
    </div>
  );
}

export function headingStyle(theme: WeddingTheme): CSSProperties {
  return { fontFamily: `var(${theme.fonts.headingVar}), serif` };
}
