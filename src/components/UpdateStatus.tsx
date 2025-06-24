import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useAutoUpdater } from '@/hooks/useAutoUpdater';

const UpdateStatus: React.FC = () => {
  const { updateStatus, checkForUpdates } = useAutoUpdater();

  const getStatusIcon = () => {
    if (updateStatus.isChecking) {
      return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
    if (updateStatus.hasUpdate) {
      return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    }
    if (updateStatus.isUpdating) {
      return <Download className="h-4 w-4 animate-bounce" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-400" />;
  };

  const getStatusText = () => {
    if (updateStatus.isChecking) return 'Checking...';
    if (updateStatus.hasUpdate) return 'Update Available';
    if (updateStatus.isUpdating) return 'Updating...';
    return 'Up to Date';
  };

  const getStatusColor = () => {
    if (updateStatus.hasUpdate) return 'border-yellow-400/50 text-yellow-400';
    if (updateStatus.isUpdating) return 'border-blue-400/50 text-blue-400';
    return 'border-green-400/50 text-green-400';
  };

  return (
    <div className="flex items-center gap-3">
      <Badge 
        variant="outline" 
        className={`${getStatusColor()} bg-black/50 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-xs">{getStatusText()}</span>
        </div>
      </Badge>
      
      <div className="text-xs text-gray-400">
        v{updateStatus.currentVersion}
      </div>
      
      {!updateStatus.isChecking && !updateStatus.isUpdating && (
        <Button
          variant="ghost"
          size="sm"
          onClick={checkForUpdates}
          className="h-6 px-2 text-xs text-gray-400 hover:text-white"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default UpdateStatus;