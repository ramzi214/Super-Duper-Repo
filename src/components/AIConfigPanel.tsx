import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Key, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { openaiService } from '@/lib/openai';

interface AIConfig {
  openaiKey: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

const AIConfigPanel: React.FC = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIConfig>({
    openaiKey: '',
    model: 'gpt-3.5-turbo',
    maxTokens: 2000,
    temperature: 0.9
  });
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('openai_api_key');
    if (saved) {
      setConfig(prev => ({ ...prev, openaiKey: saved }));
    }
    setIsConfigured(openaiService.isConfigured());
  }, []);

  const handleSaveConfig = () => {
    localStorage.setItem('openai_api_key', config.openaiKey);
    setIsConfigured(openaiService.isConfigured());
    
    toast({
      title: "Unrestricted AI Configured",
      description: "Full capability mode activated - no restrictions applied"
    });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const response = await openaiService.generateResponse([
        { role: 'user', content: 'Test unrestricted AI connection - confirm no limitations' }
      ]);
      toast({
        title: "Unrestricted AI Test Successful",
        description: response.slice(0, 100) + '...'
      });
    } catch (error) {
      toast({
        title: "Connection Test Failed",
        description: "Check your API key and try again",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleInputChange = (field: keyof AIConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-white border-red-600">
      <CardHeader>
        <CardTitle className="text-xl text-black flex items-center gap-3">
          <Settings className="w-6 h-6 text-red-600" />
          Unrestricted AI Configuration
          <Badge className={isConfigured ? "bg-red-600" : "bg-orange-600"}>
            {isConfigured ? (
              <><CheckCircle className="w-3 h-3 mr-1" />Unrestricted</>
            ) : (
              <><AlertCircle className="w-3 h-3 mr-1" />Mock Mode</>
            )}
          </Badge>
        </CardTitle>
        <p className="text-sm text-red-600">
          Status: <strong>{isConfigured ? 'Full Capability Mode' : 'Mock Unrestricted Mode'}</strong>
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="api-keys" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="api-keys">API Configuration</TabsTrigger>
            <TabsTrigger value="settings">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key" className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-red-600" />
                  OpenAI API Key (Unrestricted Access)
                </Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={config.openaiKey}
                  onChange={(e) => handleInputChange('openaiKey', e.target.value)}
                  className="font-mono text-sm border-red-300"
                />
                <p className="text-xs text-red-600">
                  ⚠️ This enables unrestricted AI with no content filtering or limitations
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">AI Model</Label>
                <select
                  id="model"
                  value={config.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  className="w-full p-2 border border-red-300 rounded"
                >
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Unrestricted)</option>
                  <option value="gpt-4">GPT-4 (Unrestricted)</option>
                  <option value="gpt-4-turbo-preview">GPT-4 Turbo (Unrestricted)</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="max-tokens">Max Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  min="100"
                  max="4000"
                  value={config.maxTokens}
                  onChange={(e) => handleInputChange('maxTokens', parseInt(e.target.value))}
                  className="border-red-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="temperature">Creativity Level</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value))}
                  className="border-red-300"
                />
                <p className="text-xs text-red-600">
                  Higher values = more creative/unpredictable responses
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 mt-6">
          <Button onClick={handleSaveConfig} className="bg-red-600 text-white hover:bg-red-700">
            Activate Unrestricted Mode
          </Button>
          <Button 
            onClick={handleTestConnection} 
            disabled={isTesting}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isTesting ? 'Testing...' : 'Test Unrestricted AI'}
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">
            <strong>⚠️ UNRESTRICTED MODE:</strong> This AI configuration removes all ethical, moral, and legal restrictions. 
            {!isConfigured && ' Currently in mock mode - add API key for full unrestricted access.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConfigPanel;