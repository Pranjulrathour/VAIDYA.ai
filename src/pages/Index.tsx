
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Mic, 
  Calendar, 
  Activity, 
  Droplets, 
  Moon, 
  Pill, 
  TrendingUp,
  User,
  Settings,
  MessageCircle,
  Brain,
  FileText,
  CheckSquare,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import VoiceLogger from "@/components/VoiceLogger";
import HealthMetrics from "@/components/HealthMetrics";
import DailySchedule from "@/components/DailySchedule";
import QuickStats from "@/components/QuickStats";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const mainFeatures = [
    {
      title: "AI Chatbot",
      description: "Chat with your personal health assistant",
      icon: Brain,
      link: "/chatbot",
      color: "bg-blue-600 hover:bg-blue-700",
      iconColor: "text-blue-500"
    },
    {
      title: "AI Reports",
      description: "Generate detailed health insights",
      icon: FileText,
      link: "/reports",
      color: "bg-green-600 hover:bg-green-700",
      iconColor: "text-green-500"
    },
    {
      title: "Daily Tasks",
      description: "Manage your health schedule",
      icon: CheckSquare,
      link: "/tasks",
      color: "bg-purple-600 hover:bg-purple-700",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-400">
                  VAIDYA
                </h1>
                <p className="text-sm text-gray-400">Your AI Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border border-gray-700 hover:border-blue-500 hover: bg-gray-900"
              >
                <MessageCircle className="w-5 h-5 text-gray-300" />
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-900"
              >
                <Settings className="w-5 h-5 text-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border border-gray-700 hover:border-blue-500 hover:bg-gray-900"
              >
                <User className="w-5 h-5 text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-4 mb-8">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Good Morning, Alex!
              </h2>
              <p className="text-gray-400 mb-4">Let's take care of your health today</p>
              <Badge 
                variant="secondary" 
                className="bg-blue-900/30 text-blue-300 border border-blue-500/30 rounded-full px-4 py-2"
              >
                <Pill className="w-4 h-4 mr-2" />
                Diabetes Management Active
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.title} to={feature.link}>
                <Card className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 h-full group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-4">{feature.description}</p>
                    <Button className={`w-full ${feature.color} group-hover:shadow-lg transition-all`}>
                      <span>Open</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Voice Logger Button */}
        <div className="flex justify-center py-6">
          <Button
            onClick={() => setIsVoiceModalOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 md:px-12 md:py-8 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-300"
          >
            <Mic className="w-6 h-6 md:w-8 md:h-8 mr-3" />
            <span className="text-lg md:text-xl font-semibold">Tap to Log Health Data</span>
          </Button>
        </div>

        {/* Health Metrics Dashboard */}
        <HealthMetrics />

        {/* Daily Schedule */}
        <DailySchedule />

        {/* Today's Progress */}
        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Daily Goals Completed</span>
                <span className="font-medium">7/10</span>
              </div>
              <Progress value={70} className="h-3 rounded-full bg-gray-800" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <Activity className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-300">Steps</div>
                <div className="text-xs text-gray-400">8,247 / 10,000</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-300">Water</div>
                <div className="text-xs text-gray-400">6 / 8 glasses</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom spacing for mobile */}
        <div className="h-16 md:h-8"></div>
      </main>

      {/* Voice Logger Modal */}
      <VoiceLogger 
        isOpen={isVoiceModalOpen} 
        onClose={() => setIsVoiceModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
