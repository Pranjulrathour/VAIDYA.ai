import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Target, 
  Clock, 
  Calendar, 
  Award, 
  TrendingUp, 
  CheckCircle2,
  Circle,
  Trash2,
  Edit,
  Star,
  Zap,
  Heart,
  Brain,
  Dumbbell,
  Apple,
  Moon,
  Droplets
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueTime?: string;
  icon: any;
  color: string;
}

const TaskItem = ({ 
  task, 
  onToggle, 
  onDelete, 
  onEdit 
}: { 
  task: Task; 
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}) => {
  const priorityColors = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-blue-100 text-blue-700 border-blue-200',
    high: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg border-0 shadow-md ${task.completed ? 'opacity-75' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <button
            onClick={() => onToggle(task.id)}
            className="mt-1 transition-all duration-200 hover:scale-110"
          >
            {task.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400 hover:text-blue-600" />
            )}
          </button>
          
    <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${task.color}`}>
                  <task.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm mt-1 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
      </p>
    </div>
  </div>
              
              <div className="flex items-center gap-2">
                <Badge className={priorityColors[task.priority]}>
                  {task.priority}
                </Badge>
                {task.dueTime && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {task.dueTime}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <Badge variant="outline" className="text-xs">
                {task.category}
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0 hover:bg-blue-100"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DailyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "Morning Meditation", 
      description: "10 minutes of guided mindfulness to start the day peacefully.", 
      category: "Mental Health",
      priority: 'high',
      completed: true,
      dueTime: "7:00 AM",
      icon: Brain,
      color: "bg-purple-100 text-purple-600"
    },
    { 
      id: 2, 
      title: "Take Vitamin D", 
      description: "Daily vitamin D supplement as prescribed by your doctor.", 
      category: "Medication",
      priority: 'high',
      completed: true,
      dueTime: "8:00 AM",
      icon: Heart,
      color: "bg-red-100 text-red-600"
    },
    { 
      id: 3, 
      title: "30-Minute Walk", 
      description: "A brisk walk in the park to boost cardiovascular health.", 
      category: "Exercise",
      priority: 'medium',
      completed: false,
      dueTime: "6:00 PM",
      icon: Dumbbell,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      id: 4, 
      title: "Evening Journaling", 
      description: "Reflect on your day and write down thoughts and gratitude.", 
      category: "Mental Health",
      priority: 'low',
      completed: false,
      dueTime: "9:00 PM",
      icon: Star,
      color: "bg-blue-100 text-blue-600"
    },
    { 
      id: 5, 
      title: "Prepare Healthy Lunch", 
      description: "Include a variety of vegetables and lean proteins.", 
      category: "Nutrition",
      priority: 'medium',
      completed: false,
      dueTime: "12:00 PM",
      icon: Apple,
      color: "bg-green-100 text-green-600"
    },
    { 
      id: 6, 
      title: "Drink 8 Glasses of Water", 
      description: "Stay hydrated throughout the day for optimal health.", 
      category: "Hydration",
      priority: 'medium',
      completed: false,
      icon: Droplets,
      color: "bg-cyan-100 text-cyan-600"
    },
    { 
      id: 7, 
      title: "Sleep 8 Hours", 
      description: "Ensure quality sleep for recovery and mental health.", 
      category: "Sleep",
      priority: 'high',
      completed: false,
      dueTime: "10:00 PM",
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueTime: ''
  });

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueTime: task.dueTime || ''
    });
    setIsDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...newTask }
          : task
      ));
    } else {
      const newId = Math.max(...tasks.map(t => t.id)) + 1;
      setTasks([...tasks, {
        id: newId,
        ...newTask,
        completed: false,
        icon: Target,
        color: "bg-gray-100 text-gray-600"
      }]);
    }
    
    setIsDialogOpen(false);
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      category: 'General',
      priority: 'medium',
      dueTime: ''
    });
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const categories = [...new Set(tasks.map(task => task.category))];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTasks = selectedCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Daily Tasks</h1>
            <p className="text-purple-100 text-lg">Track your wellness goals and build healthy habits</p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Target className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <span className="text-3xl font-bold text-green-600">{completedTasks}</span>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <span className="text-3xl font-bold text-blue-600">{totalTasks}</span>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <span className="text-3xl font-bold text-purple-600">{Math.round(completionPercentage)}%</span>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <span className="text-3xl font-bold text-orange-600">7</span>
                <p className="text-xs text-gray-500">days</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Progress</h3>
            <Badge className="bg-green-100 text-green-700">
              {completedTasks}/{totalTasks} completed
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">
            {completionPercentage === 100 
              ? "🎉 Congratulations! You've completed all your tasks today!" 
              : `Keep going! You're ${Math.round(completionPercentage)}% there.`
            }
          </p>
        </CardContent>
      </Card>

      {/* Category Filter and Add Task */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('All')}
            className="rounded-full"
          >
            All Tasks
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            </DialogHeader>
    <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    placeholder="Category"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Due Time</label>
                  <Input
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                    placeholder="e.g., 9:00 AM"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <div className="flex gap-2 mt-2">
                  {(['low', 'medium', 'high'] as const).map(priority => (
                    <Button
                      key={priority}
                      variant={newTask.priority === priority ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setNewTask({...newTask, priority})}
                      className="capitalize"
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>
              <Button onClick={handleSaveTask} className="w-full">
                {editingTask ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
              <p className="text-gray-500">
                {selectedCategory === 'All' 
                  ? "Add your first task to get started!" 
                  : `No tasks in the ${selectedCategory} category.`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>

      {/* Motivational Section */}
      {completionPercentage === 100 && (
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Amazing Work! 🎉</h3>
            <p className="text-green-100 text-lg">
              You've completed all your tasks today. Keep up the great work and maintain your healthy habits!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyTasks; 
