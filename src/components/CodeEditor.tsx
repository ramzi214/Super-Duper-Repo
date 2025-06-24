import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Copy, 
  Download, 
  Play, 
  Save,
  FileText,
  Code
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface CodeEditorProps {
  file: FileNode | null;
  onSave?: (content: string) => void;
  onRun?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ file, onSave, onRun }) => {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    if (file?.content) {
      setContent(file.content);
    }
  }, [file]);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
    }
  };

  const handleDownload = () => {
    if (file && content) {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx': return 'typescript';
      case 'ts': return 'typescript';
      case 'js': return 'javascript';
      case 'jsx': return 'javascript';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      default: return 'text';
    }
  };

  const formatCode = (code: string) => {
    return code.split('\n').map((line, index) => (
      <div key={index} className="flex">
        <div className="w-12 text-right pr-4 text-gray-500 text-sm select-none">
          {index + 1}
        </div>
        <div className="flex-1 text-sm font-mono">
          <pre className="whitespace-pre-wrap">{line || ' '}</pre>
        </div>
      </div>
    ));
  };

  if (!file) {
    return (
      <Card className="h-full bg-gray-900 border-gray-700 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4" />
          <p>Select a file to view its contents</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-gray-900 border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-white font-medium">{file.name}</span>
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
            {getLanguage(file.name)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
          </Button>
          {onRun && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRun}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
          {onSave && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onSave(content)}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Save className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Code Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 bg-gray-950">
          {file.type === 'file' && content ? (
            <div className="text-gray-300">
              {formatCode(content)}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p>No content to display</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default CodeEditor;