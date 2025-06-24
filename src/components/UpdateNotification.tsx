import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Zap, Clock, CheckCircle } from 'lucide-react';
import { useAutoUpdater } from '@/hooks/useAutoUpdater';

const UpdateNotification: React.FC = () => {
  const { updateStatus, installUpdate } = useAutoUpdater();

  if (!updateStatus.hasUpdate && !updateStatus.isUpdating) {
    return null;
  }

  return (
    <Card className="border-white/20 bg-black/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-white" />
            <CardTitle className="text-white text-lg">
              AI Model Update Available
            </CardTitle>
          </div>
          <Badge variant="outline" className="border-white/30 text-white">
            v{updateStatus.latestVersion}
          </Badge>
        </div>
        <CardDescription className="text-gray-300">
          {updateStatus.updateInfo?.modelName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {updateStatus.isUpdating ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Download className="h-4 w-4 animate-bounce" />
              <span>Installing update...</span>
            </div>
            <Progress value={75} className="bg-gray-800" />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="text-white font-medium">New Features:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {updateStatus.updateInfo?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Clock className="h-4 w-4" />
              Released: {updateStatus.updateInfo?.releaseDate}
            </div>
            
            <Button 
              onClick={installUpdate}
              className="w-full bg-white text-black hover:bg-gray-200"
              disabled={updateStatus.isUpdating}
            >
              <Download className="h-4 w-4 mr-2" />
              Install Update
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdateNotification;