import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw, 
  ExternalLink, 
  Download,
  Share,
  Settings
} from 'lucide-react';

interface BoltProject {
  id: string;
  name: string;
  description: string;
  preview: string;
  buildStatus: 'idle' | 'building' | 'success' | 'error';
}

interface ProjectPreviewProps {
  project: BoltProject;
  onRefresh?: () => void;
  onDeploy?: () => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, onRefresh, onDeploy }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRefresh?.();
    setIsLoading(false);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-80';
      default:
        return 'w-full h-full';
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="h-full bg-gray-900 border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium">Preview</span>
            <Badge 
              className={`text-xs ${
                project.buildStatus === 'success' ? 'bg-green-600' :
                project.buildStatus === 'building' ? 'bg-yellow-600' :
                project.buildStatus === 'error' ? 'bg-red-600' : 'bg-gray-600'
              }`}
            >
              {project.buildStatus}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRefresh}
              disabled={isLoading}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleShare}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={viewMode === 'desktop' ? 'default' : 'ghost'}
            onClick={() => setViewMode('desktop')}
            className="text-xs"
          >
            <Monitor className="w-3 h-3 mr-1" />
            Desktop
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'tablet' ? 'default' : 'ghost'}
            onClick={() => setViewMode('tablet')}
            className="text-xs"
          >
            <Tablet className="w-3 h-3 mr-1" />
            Tablet
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'mobile' ? 'default' : 'ghost'}
            onClick={() => setViewMode('mobile')}
            className="text-xs"
          >
            <Smartphone className="w-3 h-3 mr-1" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 bg-gray-800">
        <div className="h-full flex items-center justify-center">
          <div className={`${getViewportClass()} bg-white rounded-lg shadow-lg overflow-hidden`}>
            {project.buildStatus === 'success' ? (
              <iframe
                src={project.preview}
                className="w-full h-full border-0"
                title={`${project.name} Preview`}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : project.buildStatus === 'building' ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-gray-600" />
                  <p className="text-gray-600">Building project...</p>
                </div>
              </div>
            ) : project.buildStatus === 'error' ? (
              <div className="w-full h-full flex items-center justify-center bg-red-50">
                <div className="text-center">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <p className="text-red-600">Build failed</p>
                  <p className="text-sm text-red-500 mt-1">Check console for errors</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                  <p className="text-gray-600">No preview available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={onDeploy}
            disabled={project.buildStatus !== 'success'}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Deploy
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-600 text-white hover:bg-gray-800"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProjectPreview;