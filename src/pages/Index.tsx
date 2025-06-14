
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
  Brain
} from "lucide-react";
import VoiceLogger from "@/components/VoiceLogger";
import HealthMetrics from "@/components/HealthMetrics";
import DailySchedule from "@/components/DailySchedule";
import QuickStats from "@/components/QuickStats";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 dark:bg-black/10 backdrop-blur-xl border-b border-white/20 dark:border-blue-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                  VAIDYA
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Your AI Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 hover:bg-white/20 dark:hover:bg-black/30"
              >
                <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 hover:bg-white/20 dark:hover:bg-black/30"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 hover:bg-white/20 dark:hover:bg-black/30"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent dark:from-blue-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 dark:border-blue-500/20 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Good Morning, Alex!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Let's take care of your health today</p>
              <Badge 
                variant="secondary" 
                className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 rounded-full px-4 py-2"
              >
                <Pill className="w-4 h-4 mr-2" />
                Diabetes Management Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Voice Logger Button - Enhanced for mobile */}
        <div className="flex justify-center py-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <Button
              onClick={() => setIsVoiceModalOpen(true)}
              size="lg"
              className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-6 md:px-12 md:py-8 rounded-3xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 transform hover:scale-105 border border-white/20"
            >
              <Mic className="w-6 h-6 md:w-8 md:h-8 mr-3" />
              <span className="text-lg md:text-xl font-semibold">Tap to Log Health Data</span>
            </Button>
          </div>
        </div>

        {/* AI Chat Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-blue-500/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20 rounded-2xl px-6 py-4 shadow-lg"
          >
            <Brain className="w-5 h-5 mr-2" />
            Chat with AI Assistant
          </Button>
        </div>

        {/* Health Metrics Dashboard */}
        <HealthMetrics />

        {/* Daily Schedule */}
        <DailySchedule />

        {/* Today's Progress */}
        <Card className="border-0 shadow-2xl bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Daily Goals Completed</span>
                <span className="font-medium">7/10</span>
              </div>
              <Progress value={70} className="h-3 rounded-full bg-white/20 dark:bg-black/20" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-blue-500/20">
                <Activity className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Steps</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">8,247 / 10,000</div>
              </div>
              <div className="text-center p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-blue-500/20">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Water</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">6 / 8 glasses</div>
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
