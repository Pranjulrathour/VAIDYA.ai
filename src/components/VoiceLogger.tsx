
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceLoggerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Extend Window interface to include webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

const VoiceLogger = ({ isOpen, onClose }: VoiceLoggerProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const speechRecognition = new SpeechRecognitionAPI();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + " " + finalTranscript);
        }
      };

      speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or type your entry manually.",
          variant: "destructive",
        });
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    }
  }, [toast]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Please type your health data manually.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const saveLog = () => {
    if (!transcript.trim()) {
      toast({
        title: "No Data to Save",
        description: "Please record or type your health information first.",
        variant: "destructive",
      });
      return;
    }

    // Here you would save to Supabase database
    console.log("Saving health log:", transcript);
    
    toast({
      title: "Health Data Saved",
      description: "Your health information has been logged successfully.",
    });

    setTranscript("");
    onClose();
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-blue-500/20 rounded-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-gray-800 dark:text-white">
            Voice Health Logger
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="text-center">
            <Badge 
              variant={isListening ? "default" : "secondary"}
              className={`px-4 py-2 rounded-full ${
                isListening 
                  ? "bg-blue-500 text-white animate-pulse shadow-lg shadow-blue-500/50" 
                  : "bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-300"
              }`}
            >
              {isListening ? "Listening..." : "Ready to Record"}
            </Badge>
          </div>

          {/* Voice Control */}
          <div className="text-center space-y-4">
            <div className="relative">
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? "bg-blue-500 hover:bg-blue-600 animate-pulse shadow-lg shadow-blue-500/50" 
                    : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                } transition-all duration-300 border-2 border-white/20`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isListening 
                ? "Speak now... (e.g., 'Blood pressure 130 over 80', 'Took diabetes medication', 'Feeling tired')"
                : "Tap the microphone to start recording"
              }
            </p>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <div className="p-4 bg-white/10 dark:bg-black/10 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-blue-500/20">
              <h4 className="font-medium text-gray-800 dark:text-white mb-2">Recorded:</h4>
              <p className="text-gray-700 dark:text-gray-300">{transcript}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={clearTranscript}
              variant="outline"
              className="flex-1 rounded-full bg-white/10 dark:bg-black/10 border-white/20 dark:border-blue-500/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-black/20"
              disabled={!transcript}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={saveLog}
              className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg shadow-blue-500/30"
              disabled={!transcript}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Log
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick examples to try:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline" className="text-xs rounded-full border-white/20 dark:border-blue-500/20 bg-white/5 dark:bg-black/5">Blood sugar 120</Badge>
              <Badge variant="outline" className="text-xs rounded-full border-white/20 dark:border-blue-500/20 bg-white/5 dark:bg-black/5">Took insulin</Badge>
              <Badge variant="outline" className="text-xs rounded-full border-white/20 dark:border-blue-500/20 bg-white/5 dark:bg-black/5">Had lunch</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceLogger;
