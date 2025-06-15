import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  User as UserIcon,
  Bot,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatWithHealthAssistant } from "@/lib/geminiClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser }: { message: string, isUser: boolean }) => (
  <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
    {!isUser && (
      <Avatar className="h-8 w-8 border">
        <AvatarFallback className="bg-blue-100 text-blue-600">
          <Bot className="h-4 w-4"/>
        </AvatarFallback>
      </Avatar>
    )}
    <div className={`max-w-xl rounded-lg p-3 text-sm ${
      isUser 
        ? 'bg-blue-600 text-white' 
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
    }`}>
      <p className="whitespace-pre-wrap">{message}</p>
    </div>
    {isUser && (
      <Avatar className="h-8 w-8 border">
        <AvatarFallback className="bg-gray-100 text-gray-600">
          <UserIcon className="h-4 w-4"/>
        </AvatarFallback>
      </Avatar>
    )}
  </div>
);

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm VAIDYA.ai, your personal AI health assistant. I'm here to help you with health-related questions, provide wellness tips, and support your health journey. How can I assist you today?", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    const newUserMessage: Message = {
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Get conversation context (last few messages)
      const context = messages
        .slice(-5)
        .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n');

      const aiResponse = await chatWithHealthAssistant(userMessage, context);
      
      const aiMessage: Message = {
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Sorry, I'm having trouble responding right now. Please try again.",
        variant: "destructive"
      });

      const errorMessage: Message = {
        text: "I apologize, but I'm experiencing some technical difficulties. Please try asking your question again, or contact support if the problem persists.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              <Bot className="h-5 w-5"/>
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-lg">VAIDYA.ai Health Assistant</h2>
            <p className="text-sm text-gray-500">Always here to help with your health questions</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-4">
            <Avatar className="h-8 w-8 border">
              <AvatarFallback className="bg-blue-100 text-blue-600">
                <Bot className="h-4 w-4"/>
              </AvatarFallback>
            </Avatar>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                VAIDYA.ai is thinking...
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white dark:bg-gray-800 p-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <Input
              placeholder="Ask me about your health, symptoms, wellness tips, or any health-related questions..."
              className="min-h-[44px] bg-gray-100 dark:bg-gray-700 border-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 h-[44px] px-4"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
        
        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          VAIDYA.ai provides general health information. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatBot; 
