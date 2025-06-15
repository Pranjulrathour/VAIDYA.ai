import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSession } from '@/contexts/SessionContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';

interface HealthCondition {
  id: string;
  condition_name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes: string;
}

const HealthMetrics = () => {
  const { session } = useSession();
  const [conditions, setConditions] = useState<HealthCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthConditions = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('health_conditions')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) {
          throw error;
        }

        setConditions(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthConditions();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {conditions.length > 0 ? (
        <div className="space-y-4">
          {conditions.map((condition) => (
            <Card key={condition.id} className="bg-secondary/50">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{condition.condition_name}</CardTitle>
                    <Badge variant={condition.severity === 'Severe' ? 'destructive' : 'secondary'}>
                        {condition.severity}
                    </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{condition.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
            <p className="text-muted-foreground">No health conditions recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default HealthMetrics;
