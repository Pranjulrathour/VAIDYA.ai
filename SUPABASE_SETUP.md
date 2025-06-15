# Supabase Database Setup for VAIDYA.ai

This document contains all the SQL commands needed to set up the Supabase database for the VAIDYA.ai health application.

## 🗄️ Database Tables

### 1. Health Reports Table

```sql
-- Create health_reports table
CREATE TABLE IF NOT EXISTS health_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  file_url TEXT,
  analysis JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Enable Row Level Security

```sql
-- Enable RLS for health_reports
ALTER TABLE health_reports ENABLE ROW LEVEL SECURITY;
```

### 3. Create RLS Policies

```sql
-- Policy: Users can only see their own reports
CREATE POLICY "Users can view own health reports" ON health_reports
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own reports
CREATE POLICY "Users can insert own health reports" ON health_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reports
CREATE POLICY "Users can update own health reports" ON health_reports
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own reports
CREATE POLICY "Users can delete own health reports" ON health_reports
  FOR DELETE USING (auth.uid() = user_id);
```

## 📁 Storage Setup

### 1. Create Storage Bucket

```sql
-- Create storage bucket for health report files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('health-reports', 'health-reports', true)
ON CONFLICT (id) DO NOTHING;
```

### 2. Create Storage Policies

```sql
-- Policy: Users can upload their own files
CREATE POLICY "Users can upload their own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'health-reports' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can view their own files
CREATE POLICY "Users can view their own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'health-reports' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy: Users can delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'health-reports' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## ⚡ Database Functions and Triggers

### 1. Create Update Function

```sql
-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';
```

### 2. Create Trigger

```sql
-- Create trigger to automatically update updated_at
CREATE TRIGGER update_health_reports_updated_at 
  BEFORE UPDATE ON health_reports 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

## 🔧 Setup Instructions

### Option 1: Run All Commands at Once

Copy and paste all the SQL commands above into your Supabase SQL Editor and run them together.

### Option 2: Step-by-Step Setup

1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Run each section separately:**
   - First run the table creation commands
   - Then run the RLS policies
   - Then run the storage setup
   - Finally run the functions and triggers

### Option 3: Using Supabase CLI (if you have it installed)

```bash
# Apply migrations using Supabase CLI
supabase db reset
```

## ✅ Verification

After running the setup, verify everything is working:

### Check Tables
```sql
SELECT * FROM health_reports LIMIT 1;
```

### Check Storage Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'health-reports';
```

### Check Policies
```sql
SELECT * FROM pg_policies WHERE tablename = 'health_reports';
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Ensures users can only access their own data
- **Storage Policies**: Secure file upload and access control
- **User Isolation**: Complete data separation between users
- **Authentication Required**: All operations require valid authentication

## 📊 Data Structure

### Health Reports Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `user_id` | UUID | Foreign key to auth.users |
| `title` | TEXT | Report title |
| `content` | TEXT | Report content/description |
| `file_url` | TEXT | URL to uploaded file (optional) |
| `analysis` | JSONB | AI analysis results |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### Analysis JSONB Structure

```json
{
  "overallHealth": "Brief overall health assessment",
  "keyFindings": ["Finding 1", "Finding 2", "Finding 3"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "riskFactors": ["Risk factor 1", "Risk factor 2"],
  "healthScore": 85,
  "summary": "Detailed summary of the health report"
}
```

## 🚀 Ready to Use

Once you've completed this setup, your VAIDYA.ai application will be ready to:

- ✅ Store health reports securely
- ✅ Upload and manage files
- ✅ Perform AI analysis with Gemini
- ✅ Track health statistics
- ✅ Provide personalized insights

---

**Note**: Make sure your environment variables are properly configured in your `.env` file with the correct Supabase URL and anonymous key. 