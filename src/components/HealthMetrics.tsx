
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
      color: "text-green-500",
      bgColor: "bg-green-50",
      lastReading: "2 hours ago"
    },
    {
      title: "Blood Sugar",
      value: "95",
      unit: "mg/dL",
      status: "good",
      trend: "down",
      icon: Activity,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      lastReading: "4 hours ago"
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      trend: "stable",
      icon: Gauge,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      lastReading: "1 hour ago"
    },
    {
      title: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "normal",
      trend: "stable",
      icon: Thermometer,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
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
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      case "critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-500" />
        Health Metrics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <Card key={metric.title} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-800">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    {metric.unit}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <TrendIcon className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getStatusColor(metric.status)}`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {metric.lastReading}
                  </span>
                </div>

                {/* Progress bar for some context */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Target Range</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-1.5" />
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
