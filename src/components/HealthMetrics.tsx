
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Gauge,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

const HealthMetrics = () => {
  const metrics = [
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      trend: "stable",
      icon: Heart,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      lastReading: "2 hours ago"
    },
    {
      title: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "good",
      trend: "down",
      icon: Activity,
      color: "text-blue-400",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      lastReading: "4 hours ago"
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      trend: "stable",
      icon: Gauge,
      color: "text-blue-600",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      lastReading: "1 hour ago"
    },
    {
      title: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "normal",
      trend: "stable",
      icon: Thermometer,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      lastReading: "6 hours ago"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return TrendingUp;
      case "down":
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "normal":
        return "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300";
      case "critical":
        return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
        <Activity className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
        Health Metrics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <Card 
              key={metric.title} 
              className="border-0 shadow-xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 hover:shadow-2xl transition-all duration-300 rounded-2xl md:rounded-3xl group hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-300">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${metric.bgColor} backdrop-blur-sm border border-white/20 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-4 h-4 md:w-5 md:h-5 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {metric.unit}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <TrendIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs rounded-full ${getStatusColor(metric.status)} border border-white/20 dark:border-blue-500/20`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {metric.lastReading}
                  </span>
                </div>

                {/* Progress bar for some context */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Target Range</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 rounded-full bg-white/20 dark:bg-black/20" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default HealthMetrics;
