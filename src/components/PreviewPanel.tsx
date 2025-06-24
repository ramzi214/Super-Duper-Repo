import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone, Eye, EyeOff } from 'lucide-react';

interface PreviewPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  previewContent?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isVisible,
  onToggle,
  previewContent = '<div class="p-8 text-center"><h1 class="text-2xl font-bold mb-4">Your App Preview</h1><p>Generated app will appear here</p></div>'
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isVisible) {
    return (
      <Button onClick={onToggle} variant="outline" size="sm">
        <Eye className="w-4 h-4 mr-1" />
        Show Preview
      </Button>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-blue-400 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Live Preview
        </CardTitle>
        <Button onClick={onToggle} variant="ghost" size="sm">
          <EyeOff className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'desktop' | 'mobile')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="desktop" className="flex items-center gap-1">
              <Monitor className="w-4 h-4" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" />
              Mobile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="desktop" className="mt-4">
            <div className="border border-gray-600 rounded-lg overflow-hidden">
              <div className="bg-gray-800 p-2 text-xs text-gray-400 border-b border-gray-600">
                Desktop Preview (1200x800)
              </div>
              <div className="bg-white" style={{ height: '400px' }}>
                <iframe
                  srcDoc={previewContent}
                  className="w-full h-full border-0"
                  title="Desktop Preview"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-4">
            <div className="flex justify-center">
              <div className="border border-gray-600 rounded-lg overflow-hidden" style={{ width: '375px' }}>
                <div className="bg-gray-800 p-2 text-xs text-gray-400 border-b border-gray-600">
                  Mobile Preview (375x667)
                </div>
                <div className="bg-white" style={{ height: '400px' }}>
                  <iframe
                    srcDoc={previewContent}
                    className="w-full h-full border-0"
                    title="Mobile Preview"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;