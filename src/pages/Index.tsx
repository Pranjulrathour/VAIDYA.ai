import { useSession } from "@/contexts/SessionContext";
import { useState, useEffect } from "react";
import HealthMetrics from "@/components/HealthMetrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  ClipboardList, 
  Activity, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Heart,
  Brain,
  Shield,
  Calendar,
  Clock,
  Target,
  Zap,
  Award,
  Users,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getHealthStats, HealthStats } from "@/lib/healthReportService";
import { generateHealthInsights } from "@/lib/geminiClient";

const Index = () => {
  const { session } = useSession();
  const navigate = useNavigate();
  const [healthStats, setHealthStats] = useState<HealthStats | null>(null);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const userName = session?.user?.user_metadata?.full_name || "User";

  // Dummy data for better UI demonstration
  const dummyHealthData = {
    totalReports: 12,
    latestScore: 85,
    averageHealthScore: 78,
    riskFactors: [
      "Elevated blood pressure readings",
      "Irregular sleep patterns",
      "Low vitamin D levels"
    ]
  };

  const dummyInsights = [
    "Your cardiovascular health has improved by 15% over the last month",
    "Consider increasing your daily water intake to 8-10 glasses",
    "Your sleep quality metrics show consistent improvement",
    "Regular exercise routine is positively impacting your overall health score",
    "Vitamin D supplementation is recommended based on recent lab results"
  ];

  useEffect(() => {
    loadHealthData();
  }, []);

  const loadHealthData = async () => {
    try {
      const stats = await getHealthStats();
      setHealthStats(stats);
      
      // Use dummy insights for demonstration
      setAiInsights(dummyInsights);
      
      // Generate AI insights if we have health data
      if (stats && stats.totalReports > 0) {
        setIsLoadingInsights(true);
        try {
          const insights = await generateHealthInsights(stats);
          setAiInsights(insights);
        } catch (error) {
          console.error('Error generating insights:', error);
          // Fallback to dummy insights
          setAiInsights(dummyInsights);
        } finally {
          setIsLoadingInsights(false);
        }
      }
    } catch (error) {
      console.error('Error loading health data:', error);
      // Use dummy data for demonstration
      setHealthStats(dummyHealthData);
      setAiInsights(dummyInsights);
    }
  };

  const quickAccessItems = [
    {
      title: "AI Health Assistant",
      icon: Bot,
      path: "/dashboard/chatbot",
      description: "Get instant medical advice and health guidance.",
      color: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Upload Health Report",
      icon: FileText,
      path: "/dashboard/reports",
      description: "Upload and analyze your health reports with AI.",
      color: "bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-200 hover:from-green-100 hover:to-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Daily Tasks",
      icon: ClipboardList,
      path: "/dashboard/tasks",
      description: "Track your wellness goals and daily habits.",
      color: "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-purple-200",
      iconColor: "text-purple-600"
    },
  ];

  const healthMetrics = [
    {
      title: "Heart Rate",
      value: "72 BPM",
      change: "+2%",
      icon: Heart,
      color: "text-red-600 bg-red-100",
      trend: "up"
    },
    {
      title: "Sleep Quality",
      value: "8.2/10",
      change: "+5%",
      icon: Brain,
      color: "text-purple-600 bg-purple-100",
      trend: "up"
    },
    {
      title: "Stress Level",
      value: "Low",
      change: "-12%",
      icon: Shield,
      color: "text-green-600 bg-green-100",
      trend: "down"
    },
    {
      title: "Activity Score",
      value: "850 pts",
      change: "+8%",
      icon: Zap,
      color: "text-orange-600 bg-orange-100",
      trend: "up"
    }
  ];

  const recentActivities = [
    {
      type: "report",
      title: "Blood Test Results Analyzed",
      time: "2 hours ago",
      icon: FileText,
      color: "bg-blue-100 text-blue-600"
    },
    {
      type: "task",
      title: "Morning Meditation Completed",
      time: "4 hours ago",
      icon: Target,
      color: "bg-green-100 text-green-600"
    },
    {
      type: "chat",
      title: "AI Health Consultation",
      time: "1 day ago",
      icon: MessageCircle,
      color: "bg-purple-100 text-purple-600"
    },
    {
      type: "achievement",
      title: "7-Day Streak Achievement",
      time: "2 days ago",
      icon: Award,
      color: "bg-blue-100 text-blue-600"
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 60) return "text-blue-600 bg-blue-100";
    return "text-red-600 bg-red-100";
  };

  const displayStats = healthStats || dummyHealthData;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-center justify-between">
      <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
            <p className="text-blue-100 text-lg">Here's your personalized health dashboard powered by AI.</p>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30">
                <Clock className="w-4 h-4 mr-1" />
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${metric.trend === 'up' ? 'text-green-600 border-green-200' : 'text-red-600 border-red-200'}`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Health Score */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Health Score</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-3xl font-bold ${getHealthScoreColor(displayStats.latestScore).split(' ')[0]}`}>
                    {displayStats.latestScore}
                  </span>
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                    +5 this week
                  </Badge>
                </div>
                <Progress value={displayStats.latestScore} className="mt-3" />
              </div>
              <div className={`p-4 rounded-full ${getHealthScoreColor(displayStats.latestScore).split(' ')[1]}`}>
                <Activity className={`h-8 w-8 ${getHealthScoreColor(displayStats.latestScore).split(' ')[0]}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <span className="text-3xl font-bold text-blue-600">
                  {displayStats.averageHealthScore}
                </span>
                <Progress value={displayStats.averageHealthScore} className="mt-3" />
              </div>
              <div className="p-4 rounded-full bg-blue-100">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <span className="text-3xl font-bold text-purple-600">
                  {displayStats.totalReports}
                </span>
                <p className="text-xs text-gray-500 mt-2">Last updated today</p>
              </div>
              <div className="p-4 rounded-full bg-purple-100">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            </CardContent>
        </Card>
      </div>

      {/* AI Health Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Health Insights</h3>
              <p className="text-sm text-gray-600 font-normal">Personalized recommendations based on your health data</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.slice(0, 4).map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
          {aiInsights.length > 4 && (
            <Button variant="outline" className="mt-4 w-full" onClick={() => navigate('/dashboard/chatbot')}>
              <Bot className="w-4 h-4 mr-2" />
              View All Insights
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Risk Factors Alert */}
      {displayStats.riskFactors && displayStats.riskFactors.length > 0 && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-700">
              <div className="p-2 rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Health Risk Factors</h3>
                <p className="text-sm text-red-600 font-normal">Areas that need your attention</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayStats.riskFactors.map((risk, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-800 leading-relaxed">{risk}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <p className="text-sm text-gray-600 font-normal">Your latest health activities</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-blue-100">
            <Zap className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Quick Access</h2>
            <p className="text-gray-600">Jump to your most used features</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {quickAccessItems.map((item) => (
            <Card
              key={item.title}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer hover:shadow-xl transition-all duration-300 ${item.color} hover:scale-105 border-0 shadow-md`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Get Started Section for New Users */}
      {(!healthStats || healthStats.totalReports === 0) && (
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Get Started with VAIDYA.ai</h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Upload your first health report to unlock AI-powered insights, personalized recommendations, 
              and comprehensive health tracking. Our AI will analyze your data and provide valuable health guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dashboard/reports')}
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-6 py-3"
                size="lg"
              >
                <Plus className="mr-2 h-5 w-5" />
                Upload Your First Report
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard/chatbot')}
                className="border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3"
                size="lg"
              >
                <Bot className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State for Insights */}
      {isLoadingInsights && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Generating AI health insights...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
