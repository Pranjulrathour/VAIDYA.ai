
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
      color: "text-blue-500"
    },
    {
      label: "Energy",
      value: "High",
      icon: Zap,
      color: "text-blue-400"
    },
    {
      label: "Health Score",
      value: "85/100",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      label: "Improvement",
      value: "+12%",
      icon: TrendingUp,
      color: "text-blue-500"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <Card 
            key={stat.label} 
            className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 rounded-xl group"
          >
            <CardContent className="p-4 md:p-6 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gray-800 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700 transition-colors duration-300">
                <IconComponent className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
              </div>
              <div className="text-lg md:text-xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
