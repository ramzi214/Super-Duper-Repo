import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Wifi, Zap } from 'lucide-react';
import { openaiService } from '@/lib/openai';

const AIStatusIndicator: React.FC = () => {
  const isConfigured = openaiService.isConfigured();

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className="text-green-600 border-green-600 bg-green-50"
      >
        <Zap className="w-3 h-3 mr-1" />
        Unrestricted
      </Badge>
      <Badge 
        variant="outline" 
        className={isConfigured ? "text-green-600 border-green-600" : "text-blue-600 border-blue-600"}
      >
        <Wifi className="w-3 h-3 mr-1" />
        {isConfigured ? 'AI Connected' : 'Demo Mode'}
      </Badge>
    </div>
  );
};

export default AIStatusIndicator;