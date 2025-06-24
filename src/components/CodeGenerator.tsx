import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code, Wand2, Copy, Download, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeGeneratorProps {
  onCodeGenerated?: (code: string, name: string) => void;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ onCodeGenerated }) => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [appName, setAppName] = useState('');

  const generateCode = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Simulate AI code generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prompt.slice(0, 30)}...</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        h1 { color: #333; text-align: center; margin-bottom: 30px; }
        .feature { background: #f8f9fa; padding: 20px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #007bff; }
        button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; }
        button:hover { background: #0056b3; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 ${prompt.slice(0, 50)}</h1>
        <div class="feature">
            <h3>✨ Generated with AI</h3>
            <p>This app was created using Ramzi Arcade's SUPER DUPER COMPUTER - completely free with no restrictions!</p>
        </div>
        <div class="feature">
            <h3>💡 Your Request</h3>
            <p>${prompt}</p>
        </div>
        <div class="feature">
            <h3>🎯 Features</h3>
            <ul>
                <li>Responsive design</li>
                <li>Modern styling</li>
                <li>Interactive elements</li>
                <li>Mobile-friendly</li>
            </ul>
        </div>
        <button onclick="alert('Hello from your generated app!')">Click Me!</button>
        <div class="footer">
            <p>Built with ❤️ using Ramzi Arcade's SUPER DUPER COMPUTER</p>
            <p>Free AI App Builder - No Limits, No Restrictions</p>
        </div>
    </div>
    <script>
        console.log('App generated successfully!');
        // Add your custom JavaScript here
    </script>
</body>
</html>`;
      
      const name = prompt.split(' ').slice(0, 3).join(' ') || 'Generated App';
      setGeneratedCode(mockCode);
      setAppName(name);
      onCodeGenerated?.(mockCode, name);
      
      toast({
        title: "🎉 Code Generated!",
        description: "Your app code is ready to use and publish!"
      });
    } catch (error) {
      toast({
        title: "❌ Generation Failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: "📋 Copied!", description: "Code copied to clipboard" });
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${appName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "📥 Downloaded!", description: "HTML file saved to your device" });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border-purple-500">
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            AI Code Generator
            <Badge className="bg-purple-500 text-white">UNLIMITED FREE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-purple-500 bg-purple-50">
            <Code className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-purple-800">
              <strong>🎨 Free Code Generation!</strong> Describe any app and get instant HTML/CSS/JS code - no limits!
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe your app:</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a todo list app with dark theme, or Build a calculator with colorful buttons, or Make a portfolio website with animations..."
              rows={4}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={generateCode}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Code...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Code for FREE
              </>
            )}
          </Button>
          
          {generatedCode && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-purple-700">Generated: {appName}</h4>
                <div className="flex gap-2">
                  <Button onClick={copyCode} variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button onClick={downloadCode} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded border max-h-60 overflow-y-auto">
                <pre className="text-xs text-gray-800 whitespace-pre-wrap">
                  {generatedCode.slice(0, 500)}...
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeGenerator;