
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  Zap, 
  Shield, 
  TrendingUp 
} from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      label: "Streak",
      value: "7 days",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      shadowColor: "shadow-blue-500/20"
    },
    {
      label: "Energy",
      value: "High",
      icon: Zap,
      color: "text-blue-400",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      shadowColor: "shadow-blue-400/20"
    },
    {
      label: "Health Score",
      value: "85/100",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      shadowColor: "shadow-blue-600/20"
    },
    {
      label: "Improvement",
      value: "+12%",
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-50/50 dark:bg-blue-900/20",
      shadowColor: "shadow-blue-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <Card 
            key={stat.label} 
            className={`border-0 shadow-xl ${stat.shadowColor} bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-2xl md:rounded-3xl group`}
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
              </div>
              <div className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
