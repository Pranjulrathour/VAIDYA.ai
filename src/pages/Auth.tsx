import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useSession } from '@/contexts/SessionContext';
import { useTheme } from '@/contexts/ThemeContext';


const Auth = () => {
  const { session } = useSession();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden bg-background/95 lg:flex items-center justify-center text-foreground p-8 dark">
        <img src="/ASSETS/LOGO.png" alt="Vaidya Logo" className="w-96 h-96 object-contain" />
      </div>
      <div className="flex items-center justify-center p-6 lg:p-8 bg-background/95 dark">
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in using email only as this is only MVP</p>
            </div>
            <SupabaseAuth
                supabaseClient={supabase}
                appearance={{ 
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: 'hsl(217.2, 91.2%, 59.8%)',
                        brandAccent: 'hsl(217.2, 91.2%, 65%)',
                        brandButtonText: 'hsl(210, 40%, 98%)',
                        inputBackground: 'hsl(0, 0%, 15%)',
                        inputBorder: 'hsl(0, 0%, 20%)',
                        inputText: 'hsl(210, 40%, 98%)',
                        inputPlaceholder: 'hsl(215, 20.2%, 65.1%)',
                      },
                      borderWidths: {
                        buttonBorderWidth: '1px',
                        inputBorderWidth: '1px',
                      },
                      radii: {
                        borderRadiusButton: '0.5rem',
                        buttonBorderRadius: '0.5rem',
                        inputBorderRadius: '0.5rem',
                      },
                    },
                  },
                }}
                theme="dark"
                providers={['google', 'github']}
                socialLayout="horizontal"
            />
        </div>
      </div>
    </div>
  );
};

export default Auth;
