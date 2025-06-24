import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, Maximize2, Minimize2, Smartphone, Monitor, Tablet, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LivePreviewProps {
  code?: string;
  title?: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ code = '', title = 'Live Preview' }) => {
  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const refreshPreview = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile': return 'w-80 h-96';
      case 'tablet': return 'w-96 h-80';
      default: return 'w-full h-96';
    }
  };

  const previewCode = code || `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Preview</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; }
        .container { background: white; padding: 30px; border-radius: 10px; text-align: center; }
        h1 { color: #333; }
        .feature { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Live Preview</h1>
        <div class="feature">
          <h3>✨ Real-time Preview</h3>
          <p>Your generated code appears here instantly!</p>
        </div>
        <div class="feature">
          <h3>📱 Responsive Testing</h3>
          <p>Test your app on different screen sizes</p>
        </div>
        <p>Built with Ramzi Arcade's SUPER DUPER COMPUTER</p>
      </div>
    </body>
    </html>
  `;

  useEffect(() => {
    if (iframeRef.current && code) {
      const blob = new Blob([previewCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [code, previewCode]);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-4' : ''}`}>
      <Card className="bg-white border-orange-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-orange-700 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {title}
              <Badge className="bg-orange-500 text-white">LIVE PREVIEW</Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('desktop')}
                variant={viewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode('tablet')}
                variant={viewMode === 'tablet' ? 'default' : 'outline'}
                size="sm"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode('mobile')}
                variant={viewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button onClick={refreshPreview} variant="outline" size="sm">
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                onClick={() => setIsFullscreen(!isFullscreen)}
                variant="outline"
                size="sm"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 border-orange-500 bg-orange-50">
            <Eye className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>👀 Live Preview!</strong> See your app in real-time as you build - test on different devices!
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-center">
            <div className={`border-2 border-gray-300 rounded-lg overflow-hidden ${getViewportClass()} transition-all duration-300`}>
              {isLoading && (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <RefreshCw className="w-8 h-8 animate-spin text-gray-500" />
                  <span className="ml-2 text-gray-600">Loading preview...</span>
                </div>
              )}
              <iframe
                ref={iframeRef}
                className={`w-full h-full border-0 ${isLoading ? 'hidden' : 'block'}`}
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Viewing in <strong>{viewMode}</strong> mode</p>
            {viewMode === 'mobile' && <p>📱 Mobile: 320px width</p>}
            {viewMode === 'tablet' && <p>📱 Tablet: 768px width</p>}
            {viewMode === 'desktop' && <p>🖥️ Desktop: Full width</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePreview;