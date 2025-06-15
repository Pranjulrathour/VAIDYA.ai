
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Activity,
  Pill,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";

const ReportGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate AI report generation (replace with actual Gemini API call)
    setTimeout(() => {
      const sampleReport = `
# Health Report - ${type}
Generated on: ${new Date().toLocaleDateString()}

## Summary
Your health metrics show positive trends over the past month. Blood sugar levels have been well-controlled with an average of 125 mg/dL.

## Key Insights
- Medication adherence: 95%
- Average daily steps: 8,200
- Sleep quality: Improved by 15%

## Recommendations
1. Continue current medication schedule
2. Increase water intake to 8 glasses daily
3. Consider adding 30 minutes of light exercise

## Next Actions
- Schedule follow-up appointment
- Monitor blood pressure weekly
- Continue current dietary plan
      `;
      setGeneratedReport(sampleReport);
      setIsGenerating(false);
    }, 3000);
  };

  const reportTypes = [
    {
      id: "weekly",
      title: "Weekly Health Summary",
      description: "7-day overview of your health metrics and trends",
      icon: Calendar,
      color: "text-blue-500"
    },
    {
      id: "monthly",
      title: "Monthly Progress Report",
      description: "Comprehensive monthly analysis and insights",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      id: "medication",
      title: "Medication Analysis",
      description: "Detailed medication adherence and effectiveness report",
      icon: Pill,
      color: "text-purple-500"
    },
    {
      id: "activity",
      title: "Activity & Wellness Report",
      description: "Physical activity, sleep, and lifestyle analysis",
      icon: Activity,
      color: "text-orange-500"
    }
  ];

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
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-400">AI Report Generator</h1>
                <p className="text-sm text-gray-400">Generate Health Insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.id} className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-xl bg-gray-800/50">
                      <IconComponent className={`w-6 h-6 ${type.color}`} />
                    </div>
                    {type.title}
                  </CardTitle>
                  <p className="text-gray-400">{type.description}</p>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => generateReport(type.title)}
                    disabled={isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generated Report */}
        {generatedReport && (
          <Card className="border-gray-800 bg-gray-900/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Generated Report
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-green-900/30 text-green-300 border border-green-500/30">
                    Ready
                  </Badge>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <pre className="text-gray-300 whitespace-pre-wrap text-sm">
                  {generatedReport}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">12</div>
              <div className="text-sm text-gray-400">Reports Generated</div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">95%</div>
              <div className="text-sm text-gray-400">Health Score</div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">7</div>
              <div className="text-sm text-gray-400">Days Tracked</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ReportGenerator;
