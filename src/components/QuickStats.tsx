
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
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      label: "Energy",
      value: "High",
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      label: "Health Score",
      value: "85/100",
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      label: "Improvement",
      value: "+12%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={stat.label} className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStats;
