
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Mic, 
  Activity, 
  Droplets, 
  User,
  Settings,
  MessageCircle,
  Brain,
  FileText,
  CheckSquare,
  ArrowRight,
  Target,
  Zap,
  Shield,
  TrendingUp,
  Bell
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
      title: "AI Health Assistant",
      description: "Get personalized health guidance and support",
      icon: Brain,
      link: "/chatbot",
      gradient: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-600"
    },
    {
      title: "Smart Reports",
      description: "AI-powered health insights and analytics",
      icon: FileText,
      link: "/reports",
      gradient: "from-emerald-500 to-teal-500",
      iconColor: "text-emerald-600"
    },
    {
      title: "Daily Wellness",
      description: "Track habits and manage your health routine",
      icon: CheckSquare,
      link: "/tasks",
      gradient: "from-violet-500 to-purple-500",
      iconColor: "text-violet-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-950"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  VAIDYA
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your AI Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Good Morning, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Alex</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Let's take care of your health today with personalized insights and gentle reminders
            </p>
          </div>
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 rounded-full px-6 py-2 text-sm font-medium"
            >
              <Activity className="w-4 h-4 mr-2" />
              Diabetes Management • Day 7
            </Badge>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainFeatures.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.title} to={feature.link} className="group">
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                    <Button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 dark:from-white dark:to-gray-200 dark:hover:from-gray-100 dark:hover:to-gray-300 text-white dark:text-gray-900 rounded-xl py-3 font-medium group-hover:shadow-lg transition-all">
                      Get Started
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
        <div className="flex justify-center">
          <Button
            onClick={() => setIsVoiceModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-12 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-0"
          >
            <Mic className="w-6 h-6 mr-3" />
            Log Health Data
          </Button>
        </div>

        {/* Health Metrics Dashboard */}
        <HealthMetrics />

        {/* Daily Schedule */}
        <DailySchedule />

        {/* Today's Progress */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span className="font-medium">Daily Goals Completed</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">7/10</span>
              </div>
              <Progress value={70} className="h-3 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <div className="font-semibold text-gray-900 dark:text-white">Steps</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">8,247 / 10,000</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                <Droplets className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <div className="font-semibold text-gray-900 dark:text-white">Water</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">6 / 8 glasses</div>
              </div>
    </div>
          </CardContent>
        </Card>
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
