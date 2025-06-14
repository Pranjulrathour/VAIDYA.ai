
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Pill, 
  Coffee, 
  Moon, 
  Droplets,
  CheckCircle2,
  Circle,
  Utensils
} from "lucide-react";

const DailySchedule = () => {
  const scheduleItems = [
    {
      time: "07:00 AM",
      type: "medication",
      title: "Morning Insulin",
      description: "10 units before breakfast",
      completed: true,
      icon: Pill,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      time: "07:30 AM",
      type: "meal",
      title: "Breakfast",
      description: "Oatmeal with berries, low-carb",
      completed: true,
      icon: Coffee,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      time: "09:00 AM",
      type: "hydration",
      title: "Water Break",
      description: "First 2 glasses of water",
      completed: true,
      icon: Droplets,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50"
    },
    {
      time: "12:30 PM",
      type: "meal",
      title: "Lunch",
      description: "Grilled chicken salad",
      completed: false,
      icon: Utensils,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      time: "01:00 PM",
      type: "medication",
      title: "Afternoon Medication",
      description: "Metformin 500mg",
      completed: false,
      icon: Pill,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      time: "06:00 PM",
      type: "meal",
      title: "Dinner",
      description: "Baked salmon with vegetables",
      completed: false,
      icon: Utensils,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      time: "10:30 PM",
      type: "sleep",
      title: "Bedtime",
      description: "Wind down and prepare for sleep",
      completed: false,
      icon: Moon,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  const completedCount = scheduleItems.filter(item => item.completed).length;
  const totalCount = scheduleItems.length;

  return (
    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Today's Schedule
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {completedCount}/{totalCount} completed
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {scheduleItems.map((item, index) => {
            const IconComponent = item.icon;
            const isUpcoming = !item.completed && index === scheduleItems.findIndex(s => !s.completed);
            
            return (
              <div 
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                  item.completed 
                    ? "bg-gray-50 opacity-75" 
                    : isUpcoming 
                      ? "bg-blue-50 border-l-4 border-blue-500" 
                      : "bg-white border border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {item.title}
                      </span>
                      {isUpcoming && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                          Next
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => console.log(`Toggle completion for ${item.title}`)}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Daily Progress</span>
            <span className="font-medium text-gray-800">
              {Math.round((completedCount / totalCount) * 100)}% Complete
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
