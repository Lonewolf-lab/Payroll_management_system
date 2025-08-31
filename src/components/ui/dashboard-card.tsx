import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "highlight";
  onClick?: () => void;
}

export const DashboardCard = ({ 
  title, 
  children, 
  icon, 
  className,
  variant = "default",
  onClick 
}: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "shadow-soft transition-all duration-300 hover:shadow-medium",
        variant === "gradient" && "bg-gradient-card",
        variant === "highlight" && "border-primary/20 bg-primary-light",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3 text-lg">
          {icon && (
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          )}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};