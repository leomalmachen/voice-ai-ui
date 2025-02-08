import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="card-content">{children}</div>;
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h2 className={`card-title ${className}`}>{children}</h2>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`card-footer ${className}`}>{children}</div>;
} 