
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface ISpeechRecognition extends EventTarget {
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
  const [recognition, setRecognition] = useState<ISpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSupport = "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
      setIsSupported(hasSupport);
      
      if (hasSupport) {
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        const speechRecognition = new SpeechRecognitionAPI() as ISpeechRecognition;
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
          
          let errorMessage = "Please try again or type your entry manually.";
          if (event.error === "network") {
            errorMessage = "Network error. Please check your internet connection and try again.";
          } else if (event.error === "not-allowed") {
            errorMessage = "Microphone access denied. Please allow microphone permissions and try again.";
          }
          
          toast({
            title: "Voice Recognition Error",
            description: errorMessage,
            variant: "destructive",
          });
        };

        speechRecognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(speechRecognition);
      }
    }
  }, [toast]);

  const startListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Please type your health data manually.",
        variant: "destructive",
      });
      return;
    }

    if (recognition) {
      try {
        setIsListening(true);
        recognition.start();
      } catch (error) {
        console.error("Error starting recognition:", error);
        setIsListening(false);
        toast({
          title: "Could not start voice recognition",
          description: "Please try again or type manually.",
          variant: "destructive",
        });
      }
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
      <DialogContent className="max-w-md mx-auto bg-black border border-gray-800 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-white">
            Voice Health Logger
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Record your health information using voice or text
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="text-center">
            <Badge 
              variant={isListening ? "default" : "secondary"}
              className={`px-4 py-2 rounded-full ${
                isListening 
                  ? "bg-blue-600 text-white border border-blue-500" 
                  : "bg-gray-900 text-gray-300 border border-gray-700"
              }`}
            >
              {isListening ? "Listening..." : isSupported ? "Ready to Record" : "Voice Not Available"}
            </Badge>
          </div>

          {/* Voice Control */}
          <div className="text-center space-y-4">
            <div className="relative">
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                disabled={!isSupported}
                className={`w-20 h-20 rounded-full ${
                  isListening 
                    ? "bg-red-600 hover:bg-red-700 border border-red-500" 
                    : "bg-blue-600 hover:bg-blue-700 border border-blue-500"
                } transition-all duration-300 disabled:opacity-50`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-400">
              {!isSupported 
                ? "Voice recognition not supported in this browser"
                : isListening 
                ? "Speak now... (e.g., 'Blood pressure 130 over 80', 'Took diabetes medication', 'Feeling tired')"
                : "Tap the microphone to start recording"
              }
            </p>
          </div>

          {/* Manual Input */}
          {!isSupported && (
            <div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your health information here..."
                className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 resize-none focus:border-blue-500 focus:outline-none"
                rows={4}
              />
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-700">
              <h4 className="font-medium text-white mb-2">Recorded:</h4>
              <p className="text-gray-300">{transcript}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={clearTranscript}
              variant="outline"
              className="flex-1 rounded-xl bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800"
              disabled={!transcript}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              onClick={saveLog}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl"
              disabled={!transcript}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Log
            </Button>
          </div>

          {/* Quick Examples */}
          {isSupported && (
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Quick examples to try:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline" className="text-xs rounded-full border-gray-700 bg-gray-900 text-gray-300">Blood sugar 120</Badge>
                <Badge variant="outline" className="text-xs rounded-full border-gray-700 bg-gray-900 text-gray-300">Took insulin</Badge>
                <Badge variant="outline" className="text-xs rounded-full border-gray-700 bg-gray-900 text-gray-300">Had lunch</Badge>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceLogger;
