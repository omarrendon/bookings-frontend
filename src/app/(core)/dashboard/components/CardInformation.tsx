// Components
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

interface CardInformationProps {
  title?: string;
  value?: string;
  porcent?: string;
  textInformation?: string;
  description?: string;
}

export default function CardInformation({
  title,
  value,
  porcent,
  textInformation,
  description,
}: CardInformationProps) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">+{porcent}%</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {textInformation}
        </div>
        <div className="text-muted-foreground">
          <span className="line-clamp-1">{description}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
