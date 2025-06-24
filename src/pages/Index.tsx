import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import Header from '@/components/Header';
import EnhancedChatInterface from '@/components/EnhancedChatInterface';
import CodeGenerator from '@/components/CodeGenerator';
import ProjectManager from '@/components/ProjectManager';
import SuperDuperInterface from '@/components/SuperDuperInterface';
import PublishPanel from '@/components/PublishPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import AIStatusIndicator from '@/components/AIStatusIndicator';
import { openaiService } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('chat');
  const [apiKey, setApiKey] = useState('');
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [projectName, setProjectName] = useState('');

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      toast({ 
        title: "API Key Saved", 
        description: "OpenAI API key configured!" 
      });
      setApiKey('');
    }
  };

  const handleCodeGenerated = (code: string, name: string) => {
    setGeneratedCode(code);
    setProjectName(name);
    setActiveTab('publish');
  };

  const handleProjectSelect = (project: any) => {
    setCurrentProject(project);
    setGeneratedCode(project.code);
    setProjectName(project.name);
    setActiveTab('build');
  };

  const isAIConfigured = openaiService.isConfigured();

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <EnhancedChatInterface />;
      case 'generate':
        return <CodeGenerator onCodeGenerated={handleCodeGenerated} />;
      case 'projects':
        return (
          <ProjectManager 
            onSelectProject={handleProjectSelect}
            onNewProject={() => setActiveTab('generate')}
          />
        );
      case 'build':
        return <SuperDuperInterface />;
      case 'publish':
        return (
          <PublishPanel 
            projectCode={generatedCode}
            projectName={projectName}
          />
        );
      case 'settings':
        return (
          <Card className="bg-white border-green-500">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                SUPER DUPER COMPUTER Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>AI Status:</span>
                  <AIStatusIndicator />
                </div>
                <div className="p-4 bg-green-50 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">💚 Free Forever Features</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✅ Unlimited AI chat conversations</li>
                    <li>✅ Unlimited code generation</li>
                    <li>✅ Unlimited project creation</li>
                    <li>✅ Free app publishing</li>
                    <li>✅ No subscription fees ever</li>
                    <li>✅ No hidden costs or charges</li>
                    <li>✅ Unrestricted AI responses</li>
                    <li>✅ Full app builder functionality</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return <EnhancedChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header onTabChange={setActiveTab} activeTab={activeTab} />
      
      <div className="container mx-auto p-4">
        {!isAIConfigured && (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <Zap className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>🎉 Completely Free Forever!</strong> Build unlimited apps, chat with AI, generate code, and publish - all free with no restrictions!
              <br />Add your OpenAI API key for enhanced features (optional):
              <div className="flex gap-2 mt-2">
                <Input
                  type="password"
                  placeholder="Enter OpenAI API Key (optional)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleApiKeySubmit} size="sm" className="bg-green-600 hover:bg-green-700">
                  Add Key
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default Index;