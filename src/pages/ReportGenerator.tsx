import { useState, useEffect } from "react";
import {
  Download,
  FileText,
  Share2,
  PlusCircle,
  Upload,
  Loader2,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Trash2,
  Brain,
  Activity,
  Heart,
  Shield,
  Zap,
  Eye,
  FileCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  uploadHealthReport, 
  getHealthReports, 
  getHealthStats, 
  deleteHealthReport,
  HealthReport, 
  HealthStats 
} from "@/lib/healthReportService";

const HealthScoreCard = ({ score, title, trend }: { score: number; title: string; trend?: string }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100 border-green-200";
    if (score >= 60) return "text-blue-600 bg-blue-100 border-blue-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
      <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${getScoreColor(score).split(' ')[0]}`}>
                {score}
              </span>
              {trend && (
                <Badge variant="outline" className="text-xs">
                  {trend}
                </Badge>
              )}
            </div>
            <Progress value={score} className="mt-3" />
          </div>
          <div className={`p-4 rounded-full ${getScoreColor(score).split(' ')[1]} ${getScoreColor(score).split(' ')[2]}`}>
            <BarChart3 className={`h-8 w-8 ${getScoreColor(score).split(' ')[0]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReportCard = ({ 
  report, 
  onDelete,
  onViewAnalysis 
}: { 
  report: HealthReport; 
  onDelete: (id: string) => void;
  onViewAnalysis: (report: HealthReport) => void;
}) => {
  const analysis = report.analysis;
  
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100">
        <FileText className="h-6 w-6 text-blue-600" />
          </div>
        <div>
            <CardTitle className="text-xl font-bold">{report.title}</CardTitle>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {new Date(report.created_at).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
      </div>
      <div className="flex items-center gap-2">
          {analysis?.healthScore && (
            <Badge 
              className={`${
                analysis.healthScore >= 80 ? 'bg-green-100 text-green-700 border-green-200' :
                analysis.healthScore >= 60 ? 'bg-blue-100 text-blue-700 border-blue-200' :
                'bg-red-100 text-red-700 border-red-200'
              } font-semibold`}
            >
              Score: {analysis.healthScore}
            </Badge>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewAnalysis(report)}
            className="hover:bg-blue-50"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Analysis
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-gray-50"
          >
          <Download className="h-4 w-4" />
        </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-gray-50"
          >
          <Share2 className="h-4 w-4" />
        </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(report.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
      </div>
    </CardHeader>
    <CardContent>
        {analysis ? (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Summary
              </h4>
              <p className="text-blue-700 leading-relaxed">{analysis.summary}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {analysis.keyFindings.length > 0 && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {analysis.keyFindings.slice(0, 3).map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                        <span className="text-green-600 font-bold">•</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                  {analysis.keyFindings.length > 3 && (
                    <p className="text-xs text-green-600 mt-2">
                      +{analysis.keyFindings.length - 3} more findings
                    </p>
                  )}
                </div>
              )}
              
              {analysis.recommendations.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {analysis.recommendations.slice(0, 3).map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                        <span className="text-blue-600 font-bold">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                  {analysis.recommendations.length > 3 && (
                    <p className="text-xs text-blue-600 mt-2">
                      +{analysis.recommendations.length - 3} more recommendations
                    </p>
                  )}
                </div>
              )}
              
              {analysis.riskFactors.length > 0 && (
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Factors
                  </h4>
                  <ul className="space-y-2">
                    {analysis.riskFactors.slice(0, 3).map((risk, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="text-red-600 font-bold">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                  {analysis.riskFactors.length > 3 && (
                    <p className="text-xs text-red-600 mt-2">
                      +{analysis.riskFactors.length - 3} more risk factors
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 bg-gray-50 rounded-xl text-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">AI analysis in progress...</p>
          </div>
        )}
    </CardContent>
  </Card>
);
};

const ReportGenerator = () => {
  const [reports, setReports] = useState<HealthReport[]>([]);
  const [healthStats, setHealthStats] = useState<HealthStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<HealthReport | null>(null);
  const [isAnalysisDialogOpen, setIsAnalysisDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    content: '',
    file: null as File | null
  });
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
    loadHealthStats();
  }, []);

  const loadReports = async () => {
    try {
      const reportsData = await getHealthReports();
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const loadHealthStats = async () => {
    try {
      const stats = await getHealthStats();
      setHealthStats(stats);
    } catch (error) {
      console.error('Error loading health stats:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handleUploadReport = async () => {
    if (!uploadForm.title || !uploadForm.content) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content for your health report",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const uploadedReport = await uploadHealthReport(
        uploadForm.title,
        uploadForm.content,
        uploadForm.file
      );

      toast({
        title: "Success! 🎉",
        description: "Health report uploaded and analyzed successfully. AI insights are now available!",
      });
      
      setUploadForm({ title: '', content: '', file: null });
      setIsDialogOpen(false);
      
      // Reload data to show the new report with analysis
      await loadReports();
      await loadHealthStats();
      
      // Automatically show the analysis of the newly uploaded report
      if (uploadedReport) {
        setSelectedReport(uploadedReport);
        setIsAnalysisDialogOpen(true);
      }
    } catch (error) {
      console.error('Error uploading report:', error);
      toast({
        title: "Error",
        description: "Failed to upload health report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await deleteHealthReport(reportId);
      toast({
        title: "Success",
        description: "Health report deleted successfully"
      });
      loadReports();
      loadHealthStats();
    } catch (error) {
      console.error('Error deleting report:', error);
      toast({
        title: "Error",
        description: "Failed to delete health report",
        variant: "destructive"
      });
    }
  };

  const handleViewAnalysis = (report: HealthReport) => {
    setSelectedReport(report);
    setIsAnalysisDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 rounded-2xl text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Health Reports</h1>
            <p className="text-green-100 text-lg">Upload and analyze your health reports with AI-powered insights</p>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FileCheck className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Health Stats Overview */}
      {healthStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <HealthScoreCard 
            score={healthStats.latestScore} 
            title="Latest Health Score" 
            trend="+5 this week"
          />
          <HealthScoreCard 
            score={healthStats.averageHealthScore} 
            title="Average Health Score" 
          />
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Total Reports</p>
                  <span className="text-3xl font-bold text-blue-600">
                    {healthStats.totalReports}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </div>
                <div className="p-4 rounded-full bg-blue-100">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">AI Insights</p>
                  <span className="text-3xl font-bold text-purple-600">
                    {reports.filter(r => r.analysis).length}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">Generated</p>
                </div>
                <div className="p-4 rounded-full bg-purple-100">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Recommendations */}
      {healthStats?.topRecommendations && healthStats.topRecommendations.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Top Health Recommendations</h3>
                <p className="text-sm text-gray-600 font-normal">AI-generated insights from your health data</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthStats.topRecommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-green-800 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Report Dialog */}
        <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
              Upload Health Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Upload Health Report</DialogTitle>
              <p className="text-gray-600">Upload your health report and get AI-powered insights instantly</p>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-sm font-semibold">Report Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Blood Test Results - January 2024"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="content" className="text-sm font-semibold">Report Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your health report content here or describe your health data in detail..."
                  className="min-h-[200px] mt-2"
                  value={uploadForm.content}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="file" className="text-sm font-semibold">Upload File (Optional)</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <Upload className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
                </p>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUploadReport} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload & Analyze
                    </>
                  )}
          </Button>
        </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports List */}
      <div className="space-y-6">
        {reports.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Health Reports Yet</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Upload your first health report to get AI-powered insights, personalized recommendations, 
                and track your health journey over time.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Upload Your First Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <ReportCard 
              key={report.id} 
              report={report} 
              onDelete={handleDeleteReport}
              onViewAnalysis={handleViewAnalysis}
            />
          ))
        )}
      </div>

      {/* Analysis Detail Dialog */}
      <Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <Brain className="h-6 w-6 text-blue-600" />
              AI Analysis: {selectedReport?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedReport?.analysis && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Score: {selectedReport.analysis.healthScore}/100
                </h4>
                <Progress value={selectedReport.analysis.healthScore} className="mb-4" />
                <p className="text-blue-700 leading-relaxed">{selectedReport.analysis.summary}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Key Findings ({selectedReport.analysis.keyFindings.length})
                    </h4>
                    <ul className="space-y-2">
                      {selectedReport.analysis.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                          <span className="text-green-600 font-bold">•</span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Recommendations ({selectedReport.analysis.recommendations.length})
                    </h4>
                    <ul className="space-y-2">
                      {selectedReport.analysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-blue-700">
                          <span className="text-blue-600 font-bold">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {selectedReport.analysis.riskFactors.length > 0 && (
                    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                      <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Risk Factors ({selectedReport.analysis.riskFactors.length})
                      </h4>
                      <ul className="space-y-2">
                        {selectedReport.analysis.riskFactors.map((risk, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                            <span className="text-red-600 font-bold">•</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Report Details
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Created:</strong> {new Date(selectedReport.created_at).toLocaleString()}</p>
                      <p><strong>Last Updated:</strong> {new Date(selectedReport.updated_at).toLocaleString()}</p>
                      <p><strong>Analysis Status:</strong> <Badge className="bg-green-100 text-green-700">Complete</Badge></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      </div>
);
};

export default ReportGenerator; 
