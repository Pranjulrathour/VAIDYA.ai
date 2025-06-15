# VAIDYA.ai - AI-Powered Health Assistant

A modern health management platform that combines AI-powered insights with comprehensive health tracking. Built with React, TypeScript, Supabase, and Google's Gemini AI.

## 🌟 Features

- **AI Health Assistant**: Chat with an intelligent health assistant powered by Google Gemini AI
- **Health Report Analysis**: Upload health reports and get AI-powered analysis with health scores
- **Health Statistics**: Track your health journey with comprehensive stats and insights
- **Secure Authentication**: User authentication and data security with Supabase
- **File Upload**: Secure file storage for health documents
- **Responsive Design**: Modern, mobile-first design with Tailwind CSS
- **Real-time Insights**: Get personalized health recommendations based on your data

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Backend**: Supabase (Database, Authentication, Storage)
- **AI**: Google Gemini AI for health analysis and chat
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google AI API key (Gemini)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd health-smart-aid
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up Supabase database**
   Run the SQL script in your Supabase SQL editor:
   ```bash
   # Copy the contents of supabase_setup.sql and run in Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

The application requires the following database structure:

### Tables
- `health_reports`: Stores user health reports and AI analysis
- `auth.users`: Supabase authentication (automatically created)

### Storage
- `health-reports`: Bucket for storing uploaded health documents

Run the `supabase_setup.sql` script in your Supabase project to create all necessary tables, policies, and storage buckets.

## 🔑 API Keys Setup

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

### Supabase
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API
3. Copy your project URL and anon key
4. Add them to your `.env` file

## 🎨 Features Overview

### 1. Landing Page
- Modern, responsive design with animations
- Brand showcase with VAIDYA.ai branding
- Feature highlights and call-to-action sections

### 2. AI Health Assistant
- Real-time chat with Gemini AI
- Health-focused responses and recommendations
- Conversation context awareness
- Professional medical disclaimers

### 3. Health Report Analysis
- Upload health reports (PDF, DOC, images)
- AI-powered analysis with health scores
- Key findings and recommendations extraction
- Risk factor identification
- Progress tracking over time

### 4. Dashboard
- Personalized health insights
- Health score tracking
- AI-generated recommendations
- Quick access to all features

### 5. Health Statistics
- Comprehensive health metrics
- Score history and trends
- Top recommendations aggregation
- Risk factor monitoring

## 🔒 Security Features

- Row Level Security (RLS) policies
- User data isolation
- Secure file upload and storage
- Authentication-protected routes
- Environment variable protection

## 🎯 Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Upload Health Report**: Go to Reports section and upload your health documents
3. **AI Analysis**: The system automatically analyzes your reports using Gemini AI
4. **View Insights**: Check your dashboard for personalized health insights
5. **Chat with AI**: Use the chatbot for health-related questions
6. **Track Progress**: Monitor your health scores and trends over time

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and services
├── pages/              # Page components
└── styles/             # Global styles
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🚀 Deployment

The application can be deployed to various platforms:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any static hosting service

### Environment Variables for Deployment

Make sure to set up the following environment variables in your deployment platform:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Deployment Troubleshooting

If you encounter "Supabase URL and anonymous key are required" error:

1. **Check Environment Variables**: Ensure all environment variables are properly set in your deployment platform
2. **Variable Names**: Make sure variable names start with `VITE_` prefix
3. **No Quotes**: Don't wrap values in quotes in the deployment platform
4. **Rebuild**: After adding environment variables, trigger a new deployment
5. **Check Logs**: Review deployment logs for any environment variable loading issues

### Platform-Specific Instructions

#### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with the `VITE_` prefix
4. Redeploy your application

#### Netlify
1. Go to Site settings > Environment variables
2. Add each variable individually
3. Trigger a new deploy

---

**VAIDYA.ai** - Transforming healthcare with AI-powered insights and personalized health management.
