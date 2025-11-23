import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "warning" | "info";
}

export const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  variant = "default" 
}: MetricCardProps) => {
  const variantStyles = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold mt-2 text-card-foreground">
              {value}
            </p>
            {trend && (
              <p className={cn(
                "text-sm mt-2",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-lg", variantStyles[variant])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
