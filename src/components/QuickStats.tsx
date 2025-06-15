
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
      label: "Health Streak",
      value: "7 days",
      icon: Target,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      border: "border-blue-200 dark:border-blue-800/30"
    },
    {
      label: "Energy Level",
      value: "Excellent",
      icon: Zap,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      border: "border-yellow-200 dark:border-yellow-800/30"
    },
    {
      label: "Health Score",
      value: "85/100",
      icon: Shield,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      border: "border-emerald-200 dark:border-emerald-800/30"
    },
    {
      label: "This Week",
      value: "+12%",
      icon: TrendingUp,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20",
      border: "border-violet-200 dark:border-violet-800/30"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <Card 
            key={stat.label} 
            className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${stat.bgGradient} hover:scale-105 cursor-pointer rounded-2xl ${stat.border} border`}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
