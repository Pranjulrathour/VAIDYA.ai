
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
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "07:30 AM",
      type: "meal",
      title: "Breakfast",
      description: "Oatmeal with berries, low-carb",
      completed: true,
      icon: Coffee,
      color: "text-blue-400",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "09:00 AM",
      type: "hydration",
      title: "Water Break",
      description: "First 2 glasses of water",
      completed: true,
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "12:30 PM",
      type: "meal",
      title: "Lunch",
      description: "Grilled chicken salad",
      completed: false,
      icon: Utensils,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "01:00 PM",
      type: "medication",
      title: "Afternoon Medication",
      description: "Metformin 500mg",
      completed: false,
      icon: Pill,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "06:00 PM",
      type: "meal",
      title: "Dinner",
      description: "Baked salmon with vegetables",
      completed: false,
      icon: Utensils,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    },
    {
      time: "10:30 PM",
      type: "sleep",
      title: "Bedtime",
      description: "Wind down and prepare for sleep",
      completed: false,
      icon: Moon,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20"
    }
  ];

  const completedCount = scheduleItems.filter(item => item.completed).length;
  const totalCount = scheduleItems.length;

  return (
    <Card className="border-0 shadow-xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 rounded-2xl md:rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
            Today's Schedule
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-500/30">
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
                className={`flex items-center gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  item.completed 
                    ? "bg-white/5 dark:bg-black/5 opacity-75" 
                    : isUpcoming 
                      ? "bg-blue-50/50 dark:bg-blue-900/20 border-l-4 border-blue-500 shadow-lg shadow-blue-500/20" 
                      : "bg-white/10 dark:bg-black/10 border border-white/20 dark:border-blue-500/20"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className={`p-2 md:p-3 rounded-xl ${item.bgColor} backdrop-blur-sm border border-white/20 dark:border-blue-500/20`}>
                    <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${item.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                        {item.title}
                      </span>
                      {isUpcoming && (
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          Next
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full hover:bg-white/20 dark:hover:bg-black/20"
                    onClick={() => console.log(`Toggle completion for ${item.title}`)}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-white/20 dark:border-blue-500/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Daily Progress</span>
            <span className="font-medium text-gray-800 dark:text-white">
              {Math.round((completedCount / totalCount) * 100)}% Complete
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
