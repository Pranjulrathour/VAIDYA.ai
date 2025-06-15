
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Send, 
  MessageCircle, 
  User, 
  Bot,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. I'm here to provide personalized health guidance, answer your questions, and help you manage your wellness journey. How can I support you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response (replace with actual Gemini API call)
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thank you for sharing that with me. Based on your health profile and current symptoms, I'd recommend consulting with your healthcare provider for personalized medical advice. In the meantime, here are some evidence-based wellness strategies that might help...",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const quickQuestions = [
    "How's my blood sugar trending?",
    "Medication reminders for today",
    "Best time for exercise?",
    "Healthy meal suggestions"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-blue-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">AI Health Assistant</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Personalized health guidance</p>
              </div>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm h-[calc(100vh-200px)] flex flex-col rounded-2xl">
          <CardHeader className="border-b border-gray-200/50 dark:border-gray-700/50">
            <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              Health Chat Assistant
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-6">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 ${
                    message.isBot ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className={`p-3 rounded-2xl shadow-lg ${
                    message.isBot 
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white" 
                      : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300"
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div className={`max-w-[70%] ${
                    message.isBot ? "" : "text-right"
                  }`}>
                    <div className={`p-4 rounded-2xl shadow-lg ${
                      message.isBot 
                        ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700" 
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    }`}>
                      <p className="leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                      <span className="text-blue-500">AI is thinking...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="rounded-full text-xs bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about your health, symptoms, medications..."
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-gray-900 dark:text-white placeholder:text-gray-500"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl px-6 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ChatBot;
