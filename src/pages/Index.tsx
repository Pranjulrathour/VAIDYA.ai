
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
  Settings
} from "lucide-react";
import VoiceLogger from "@/components/VoiceLogger";
import HealthMetrics from "@/components/HealthMetrics";
import DailySchedule from "@/components/DailySchedule";
import QuickStats from "@/components/QuickStats";

const Index = () => {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  VAIDYA
                </h1>
                <p className="text-sm text-gray-500">Your AI Health Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Good Morning, Alex!</h2>
          <p className="text-gray-600">Let's take care of your health today</p>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Diabetes Management Active
          </Badge>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Voice Logger Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsVoiceModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Mic className="w-6 h-6 mr-3" />
            Tap to Log Health Data
          </Button>
        </div>

        {/* Health Metrics Dashboard */}
        <HealthMetrics />

        {/* Daily Schedule */}
        <DailySchedule />

        {/* Today's Progress */}
        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Daily Goals Completed</span>
                <span className="font-medium">7/10</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Activity className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <div className="text-sm font-medium">Steps</div>
                <div className="text-xs text-gray-600">8,247 / 10,000</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Droplets className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <div className="text-sm font-medium">Water</div>
                <div className="text-xs text-gray-600">6 / 8 glasses</div>
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
