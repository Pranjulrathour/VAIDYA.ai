
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  Clock, 
  Plus, 
  Calendar,
  Pill,
  Utensils,
  Activity,
  Droplets,
  Moon,
  ArrowLeft,
  CheckCircle2,
  Circle
} from "lucide-react";
import { Link } from "react-router-dom";

const DailyTasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Take Morning Insulin",
      description: "10 units before breakfast",
      type: "medication",
      time: "07:00 AM",
      completed: true,
      priority: "high"
    },
    {
      id: 2,
      title: "Healthy Breakfast",
      description: "Low-carb breakfast as planned",
      type: "meal",
      time: "07:30 AM",
      completed: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Morning Walk",
      description: "30 minutes light exercise",
      type: "activity",
      time: "08:00 AM",
      completed: false,
      priority: "medium"
    },
    {
      id: 4,
      title: "Water Intake Check",
      description: "First 2 glasses of the day",
      type: "hydration",
      time: "09:00 AM",
      completed: false,
      priority: "low"
    },
    {
      id: 5,
      title: "Blood Sugar Check",
      description: "Pre-lunch glucose monitoring",
      type: "monitoring",
      time: "12:00 PM",
      completed: false,
      priority: "high"
    },
    {
      id: 6,
      title: "Lunch",
      description: "Grilled chicken salad",
      type: "meal",
      time: "12:30 PM",
      completed: false,
      priority: "medium"
    },
    {
      id: 7,
      title: "Afternoon Medication",
      description: "Metformin 500mg",
      type: "medication",
      time: "01:00 PM",
      completed: false,
      priority: "high"
    },
    {
      id: 8,
      title: "Evening Walk",
      description: "Light activity after dinner",
      type: "activity",
      time: "07:00 PM",
      completed: false,
      priority: "low"
    }
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'medication': return Pill;
      case 'meal': return Utensils;
      case 'activity': return Activity;
      case 'hydration': return Droplets;
      case 'monitoring': return Activity;
      default: return CheckSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'text-blue-500 bg-blue-900/20';
      case 'meal': return 'text-green-500 bg-green-900/20';
      case 'activity': return 'text-orange-500 bg-orange-900/20';
      case 'hydration': return 'text-cyan-500 bg-cyan-900/20';
      case 'monitoring': return 'text-purple-500 bg-purple-900/20';
      default: return 'text-gray-500 bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-400">Daily Tasks</h1>
                <p className="text-sm text-gray-400">Today's Health Schedule</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Progress Overview */}
        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Today's Progress
              </div>
              <Badge className="bg-blue-900/30 text-blue-300 border border-blue-500/30">
                {completedTasks}/{totalTasks} completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Daily Goals</span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 rounded-full bg-gray-800" />
              
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-green-400">{completedTasks}</div>
                  <div className="text-xs text-gray-400">Completed</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-orange-400">{totalTasks - completedTasks}</div>
                  <div className="text-xs text-gray-400">Remaining</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-xl">
                  <div className="text-lg font-bold text-blue-400">{totalTasks}</div>
                  <div className="text-xs text-gray-400">Total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card className="border-gray-800 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-blue-500" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => {
                const IconComponent = getTaskIcon(task.type);
                const typeColor = getTypeColor(task.type);
                const priorityColor = getPriorityColor(task.priority);
                
                return (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-l-4 ${priorityColor} ${
                      task.completed 
                        ? "bg-gray-800/30 opacity-75" 
                        : "bg-gray-800/50 hover:bg-gray-700/50"
                    } transition-all duration-300`}
                  >
                    <div className={`p-3 rounded-xl ${typeColor}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${
                          task.completed ? "line-through text-gray-500" : "text-white"
                        }`}>
                          {task.title}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            task.priority === 'high' ? 'border-red-500 text-red-400' :
                            task.priority === 'medium' ? 'border-yellow-500 text-yellow-400' :
                            'border-green-500 text-green-400'
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">{task.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Clock className="w-3 h-3" />
                          {task.time}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTask(task.id)}
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-700"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DailyTasks;
