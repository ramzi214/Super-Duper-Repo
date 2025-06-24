import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code, Copy, Download, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodePanelProps {
  isVisible: boolean;
  onToggle: () => void;
  sourceCode?: {
    html: string;
    css: string;
    js: string;
    react: string;
  };
}

const CodePanel: React.FC<CodePanelProps> = ({
  isVisible,
  onToggle,
  sourceCode = {
    html: '<div>Generated HTML will appear here</div>',
    css: '/* Generated CSS will appear here */',
    js: '// Generated JavaScript will appear here',
    react: '// Generated React component will appear here'
  }
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('react');

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const downloadCode = () => {
    const zip = `// Full Source Code Package\n\n// HTML\n${sourceCode.html}\n\n// CSS\n${sourceCode.css}\n\n// JavaScript\n${sourceCode.js}\n\n// React\n${sourceCode.react}`;
    const blob = new Blob([zip], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'source-code.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <Button onClick={onToggle} variant="outline" size="sm">
        <Code className="w-4 h-4 mr-1" />
        Show Code
      </Button>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Source Code
        </CardTitle>
        <div className="flex gap-2">
          <Button onClick={downloadCode} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button onClick={onToggle} variant="ghost" size="sm">
            <EyeOff className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JS</TabsTrigger>
          </TabsList>
          
          {Object.entries(sourceCode).map(([key, code]) => (
            <TabsContent key={key} value={key} className="mt-4">
              <div className="relative">
                <Button
                  onClick={() => copyToClipboard(code)}
                  className="absolute top-2 right-2 z-10"
                  variant="outline"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <ScrollArea className="h-96 w-full rounded-md border border-gray-600">
                  <pre className="p-4 text-sm text-gray-300 bg-gray-800">
                    <code>{code}</code>
                  </pre>
                </ScrollArea>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodePanel;