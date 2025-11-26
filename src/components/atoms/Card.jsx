import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({
  className,
  variant = "default",
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-white shadow-sm hover:shadow-md",
    elevated: "bg-white shadow-md hover:shadow-lg",
    outline: "bg-white border-2 border-gray-200 hover:border-primary/30",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm"
  };

  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-200",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;