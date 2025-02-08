import React from 'react';

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="table">{children}</table>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableCell({ children }: { children: React.ReactNode }) {
  return <td>{children}</td>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <th>{children}</th>;
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
} 