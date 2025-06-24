import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';

interface BuildStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  message?: string;
}

interface BuildStatusProps {
  isBuilding: boolean;
  buildSteps: BuildStep[];
  overallProgress: number;
}

const BuildStatus: React.FC<BuildStatusProps> = ({ isBuilding, buildSteps, overallProgress }) => {
  const getStatusIcon = (status: BuildStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'running':
        return <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: BuildStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 text-green-100';
      case 'running':
        return 'bg-yellow-900 text-yellow-100';
      case 'error':
        return 'bg-red-900 text-red-100';
      default:
        return 'bg-gray-900 text-gray-100';
    }
  };

  if (!isBuilding && buildSteps.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gray-900 border-white text-white p-4 mb-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Build Status
          </h3>
          <Badge className={isBuilding ? 'bg-yellow-900 text-yellow-100' : 'bg-green-900 text-green-100'}>
            {isBuilding ? 'Building...' : 'Complete'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="bg-gray-800" />
        </div>

        <div className="space-y-3">
          {buildSteps.map((step) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(step.status)}
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
                <Badge className={getStatusColor(step.status)}>
                  {step.status}
                </Badge>
              </div>
              
              {step.status === 'running' && (
                <div className="ml-6">
                  <Progress value={step.progress} className="bg-gray-800 h-2" />
                  <div className="text-xs text-gray-400 mt-1">{step.progress}%</div>
                </div>
              )}
              
              {step.message && (
                <div className="ml-6 text-xs text-gray-400">
                  {step.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BuildStatus;