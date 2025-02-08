import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Select({ value, onValueChange, children, className }: SelectProps) {
  return (
    <div className={`select ${className}`}>
      {React.Children.map(children, child =>
        React.isValidElement(child) && (child.type === SelectTrigger || child.type === SelectValue)
          ? React.cloneElement(child as React.ReactElement<any>, { value, onValueChange })
          : child
      )}
    </div>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="select-content">{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SelectTrigger({ children, className, value, onValueChange }: SelectTriggerProps) {
  return (
    <button className={`select-trigger ${className}`} onClick={() => onValueChange && onValueChange(value || '')}>
      {children}
    </button>
  );
}

interface SelectValueProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function SelectValue({ children, className, placeholder, value, onValueChange }: SelectValueProps) {
  return <span className={`select-value ${className}`}>{children || placeholder}</span>;
}