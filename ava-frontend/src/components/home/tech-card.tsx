import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  techs: string[];
}

function TechCard({ icon, title, techs }: TechCardProps) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          {icon}
          <h3 className="text-lg font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-800"
            >
              {tech} {tech === "LangChain" ? "(In Progress)" : ""}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default TechCard;
