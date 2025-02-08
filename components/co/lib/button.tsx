import React from "react"

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  variant?: 'outline' | 'solid'
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, variant = 'solid' }) => {
  const variantClass = variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white'
  return (
    <button
      onClick={onClick}
      className={`button ${variantClass} ${className}`}
      style={{
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: 4,
      }}
    >
      {children}
    </button>
  )
}

export default Button


