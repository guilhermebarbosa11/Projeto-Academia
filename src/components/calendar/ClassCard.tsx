import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, Users } from "lucide-react";

interface ClassCardProps {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  instructor: string;
  participants: number;
  maxParticipants: number;
  type: string;
  className?: string;
}

const ClassCard = ({
  id,
  title,
  startTime,
  endTime,
  instructor,
  participants,
  maxParticipants,
  type,
  className,
}: ClassCardProps) => {
  const isFull = participants >= maxParticipants;
  const percentFull = (participants / maxParticipants) * 100;

  const getTypeColor = (type: string) => {
    const types: Record<string, string> = {
      "Musculação": "bg-blue-100 text-blue-800",
      "Yoga": "bg-purple-100 text-purple-800",
      "Crossfit": "bg-red-100 text-red-800",
      "Spinning": "bg-green-100 text-green-800",
      "Pilates": "bg-indigo-100 text-indigo-800",
      "Funcional": "bg-yellow-100 text-yellow-800",
      "Dança": "bg-pink-100 text-pink-800"
    };
    
    return types[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className={`border-l-4 ${isFull ? 'border-l-red-500' : 'border-l-gym-blue'} ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{title}</h3>
              <Badge className={getTypeColor(type)}>{type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{instructor}</p>
            <div className="flex items-center mt-2 text-sm">
              <ClockIcon size={14} className="mr-1" />
              <span>{startTime} - {endTime}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-sm">
              <Users size={14} className="mr-1" />
              <span>
                {participants}/{maxParticipants}
              </span>
            </div>
            <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1">
              <div 
                className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-gym-blue'}`}
                style={{ width: `${percentFull}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
