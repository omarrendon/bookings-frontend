// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Icons
import { TrendingDown, TrendingUp, Minus, type LucideIcon } from "lucide-react";

interface CardInformationProps {
  title: string;
  value: string;
  percent: string;
  trend?: "up" | "down" | "neutral";
  description: string;
  icon: LucideIcon;
}

export default function CardInformation({
  title,
  value,
  percent,
  trend = "up",
  description,
  icon: Icon,
}: CardInformationProps) {
  const trendConfig = {
    up: {
      badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0",
      icon: TrendingUp,
      label: `+${percent}%`,
    },
    down: {
      badge: "bg-destructive/10 text-destructive border-0",
      icon: TrendingDown,
      label: `-${percent}%`,
    },
    neutral: {
      badge: "bg-muted text-muted-foreground border-0",
      icon: Minus,
      label: `${percent}%`,
    },
  }[trend];

  const TrendIcon = trendConfig.icon;

  return (
    <Card className="border-border/60 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
          <Badge variant="secondary" className={trendConfig.badge}>
            <TrendIcon className="size-3 mr-1" />
            {trendConfig.label}
          </Badge>
        </div>
        <div className="mt-3 space-y-0.5">
          <CardDescription className="text-xs font-medium uppercase tracking-wide">
            {title}
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums">
            {value}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
