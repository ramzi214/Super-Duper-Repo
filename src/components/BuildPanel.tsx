import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Eye, Code, Smartphone, Monitor, Copy } from 'lucide-react';

interface BuildPanelProps {
  isBuilding: boolean;
  buildProgress: number;
  onPreview: () => void;
  onPublish: () => void;
  onDownload: () => void;
  onClone: () => void;
}

const BuildPanel: React.FC<BuildPanelProps> = ({
  isBuilding,
  buildProgress,
  onPreview,
  onPublish,
  onDownload,
  onClone
}) => {
  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center gap-2">
          <Play className="w-5 h-5" />
          Build Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isBuilding && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Building...</span>
              <span>{buildProgress}%</span>
            </div>
            <Progress value={buildProgress} className="h-2" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-green-400 border-green-400">
            Ready
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Zero Downtime
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            Max Output
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={onPreview} variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button onClick={onPublish} className="bg-green-600 hover:bg-green-700" size="sm">
            <Play className="w-4 h-4 mr-1" />
            Publish
          </Button>
          <Button onClick={onDownload} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button onClick={onClone} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-1" />
            Clone
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildPanel;