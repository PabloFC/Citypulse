import React from "react";

type ButtonVariant = "primary" | "gradient";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "block w-full text-center px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium hover:shadow-md hover:scale-[1.02]";

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    gradient:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
