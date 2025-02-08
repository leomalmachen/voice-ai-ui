import React from "react";

export const metadata = {
  title: 'malmachen Voice AI UI',
  description: 'Gebaut von Leonhard Pöppel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
