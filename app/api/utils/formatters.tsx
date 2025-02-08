import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

const variantClasses: Record<string, string> = {
  default: "bg-gray-200 text-gray-800",
  primary: "bg-blue-500 text-white",
  secondary: "bg-green-500 text-white",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}

export function formatDuration(durationInSeconds: number): string {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString();
}
