import { supabase } from './supabase';
import { analyzeHealthReport, HealthReportAnalysis } from './geminiClient';

export interface HealthReport {
  id: string;
  user_id: string;
  title: string;
  content: string;
  file_url?: string;
  analysis?: HealthReportAnalysis;
  created_at: string;
  updated_at: string;
}

export interface HealthStats {
  totalReports: number;
  averageHealthScore: number;
  latestScore: number;
  scoreHistory: { date: string; score: number }[];
  topRecommendations: string[];
  riskFactors: string[];
}

export const uploadHealthReport = async (
  title: string,
  content: string,
  file?: File
): Promise<HealthReport> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let fileUrl = null;
    
    // Upload file to Supabase Storage if provided
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('health-reports')
        .upload(fileName, file);

      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('health-reports')
        .getPublicUrl(fileName);
      
      fileUrl = publicUrl;
    }

    // Analyze the report content with Gemini AI
    const analysis = await analyzeHealthReport(content);

    // Save to database
    const { data, error } = await supabase
      .from('health_reports')
      .insert({
        user_id: user.id,
        title,
        content,
        file_url: fileUrl,
        analysis: analysis,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error uploading health report:', error);
    throw error;
  }
};

export const getHealthReports = async (): Promise<HealthReport[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('health_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching health reports:', error);
    throw error;
  }
};

export const getHealthStats = async (): Promise<HealthStats> => {
  try {
    const reports = await getHealthReports();
    
    if (reports.length === 0) {
      return {
        totalReports: 0,
        averageHealthScore: 0,
        latestScore: 0,
        scoreHistory: [],
        topRecommendations: [],
        riskFactors: []
      };
    }

    const scores = reports
      .filter(report => report.analysis?.healthScore)
      .map(report => report.analysis!.healthScore);

    const averageHealthScore = scores.length > 0 
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)
      : 0;

    const latestScore = reports[0]?.analysis?.healthScore || 0;

    const scoreHistory = reports
      .filter(report => report.analysis?.healthScore)
      .slice(0, 10)
      .map(report => ({
        date: new Date(report.created_at).toLocaleDateString(),
        score: report.analysis!.healthScore
      }))
      .reverse();

    // Collect all recommendations and risk factors
    const allRecommendations: string[] = [];
    const allRiskFactors: string[] = [];

    reports.forEach(report => {
      if (report.analysis) {
        allRecommendations.push(...report.analysis.recommendations);
        allRiskFactors.push(...report.analysis.riskFactors);
      }
    });

    // Get top recommendations (most frequent)
    const recommendationCounts = allRecommendations.reduce((acc, rec) => {
      acc[rec] = (acc[rec] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topRecommendations = Object.entries(recommendationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([rec]) => rec);

    // Get unique risk factors
    const uniqueRiskFactors = [...new Set(allRiskFactors)].slice(0, 5);

    return {
      totalReports: reports.length,
      averageHealthScore,
      latestScore,
      scoreHistory,
      topRecommendations,
      riskFactors: uniqueRiskFactors
    };
  } catch (error) {
    console.error('Error calculating health stats:', error);
    throw error;
  }
};

export const deleteHealthReport = async (reportId: string): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('health_reports')
      .delete()
      .eq('id', reportId)
      .eq('user_id', user.id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting health report:', error);
    throw error;
  }
}; 