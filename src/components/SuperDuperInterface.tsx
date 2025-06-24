import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, Code, Eye, Upload, Wand2, Gamepad2 } from 'lucide-react';
import CodeGenerator from '@/components/CodeGenerator';
import LivePreview from '@/components/LivePreview';
import PublishPanel from '@/components/PublishPanel';
import { useToast } from '@/hooks/use-toast';

const SuperDuperInterface: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('generate');
  const [currentCode, setCurrentCode] = useState('');
  const [currentProjectName, setCurrentProjectName] = useState('');

  const handleCodeGenerated = (code: string, name: string) => {
    setCurrentCode(code);
    setCurrentProjectName(name);
    setActiveTab('preview');
    toast({
      title: "🎉 Code Generated!",
      description: "Switch to Preview tab to see your app live!"
    });
  };

  const handlePublishReady = () => {
    if (!currentCode) {
      toast({
        title: "⚠️ No Code to Publish",
        description: "Generate some code first!",
        variant: "destructive"
      });
      return;
    }
    setActiveTab('publish');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-yellow-300" />
            SUPER DUPER APP BUILDER
            <Badge className="bg-white text-purple-600 font-bold animate-pulse">
              🚀 ALL FEATURES FREE
            </Badge>
          </CardTitle>
          <p className="text-lg opacity-90">Build, Preview, and Publish apps with unlimited AI power!</p>
        </CardHeader>
      </Card>

      <Alert className="border-purple-500 bg-purple-50">
        <Zap className="h-4 w-4 text-purple-600" />
        <AlertDescription className="text-purple-800">
          <strong>🎨 Complete App Builder!</strong> Generate code with AI, preview in real-time, and publish instantly - all features included!
        </AlertDescription>
      </Alert>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white">
          <TabsTrigger value="generate" className="flex items-center gap-2 data-[state=active]:bg-purple-100">
            <Wand2 className="w-4 h-4" />
            Generate Code
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-orange-100">
            <Eye className="w-4 h-4" />
            Live Preview
          </TabsTrigger>
          <TabsTrigger value="publish" className="flex items-center gap-2 data-[state=active]:bg-blue-100">
            <Upload className="w-4 h-4" />
            Publish App
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-4">
          <div className="space-y-4">
            <CodeGenerator onCodeGenerated={handleCodeGenerated} />
            {currentCode && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => setActiveTab('preview')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Your App
                </Button>
                <Button 
                  onClick={handlePublishReady}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Publish App
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <LivePreview 
            code={currentCode} 
            title={currentProjectName || 'Your Super App'}
          />
          {currentCode && (
            <div className="mt-4 flex gap-2">
              <Button 
                onClick={() => setActiveTab('generate')}
                variant="outline"
              >
                <Code className="w-4 h-4 mr-2" />
                Edit Code
              </Button>
              <Button 
                onClick={handlePublishReady}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="w-4 h-4 mr-2" />
                Publish This App
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="publish" className="mt-4">
          <PublishPanel 
            projectCode={currentCode}
            projectName={currentProjectName}
          />
          <div className="mt-4">
            <Button 
              onClick={() => setActiveTab('generate')}
              variant="outline"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Create Another App
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperDuperInterface;