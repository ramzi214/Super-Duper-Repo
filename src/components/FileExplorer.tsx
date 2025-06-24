import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown, 
  Code, 
  FileText,
  Image,
  Settings
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface FileExplorerProps {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFile?: FileNode;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ files, onFileSelect, selectedFile }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileIcon = (fileName: string, type: string) => {
    if (type === 'folder') {
      return <Folder className="w-4 h-4 text-blue-400" />;
    }
    
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'ts':
      case 'js':
      case 'jsx':
        return <Code className="w-4 h-4 text-yellow-400" />;
      case 'json':
        return <Settings className="w-4 h-4 text-green-400" />;
      case 'html':
        return <FileText className="w-4 h-4 text-orange-400" />;
      case 'css':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'png':
      case 'jpg':
      case 'svg':
        return <Image className="w-4 h-4 text-purple-400" />;
      default:
        return <File className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node, index) => {
      const isExpanded = expandedFolders.has(node.path);
      const isSelected = selectedFile?.path === node.path;
      
      return (
        <div key={`${node.path}-${index}`}>
          <div
            className={`flex items-center gap-2 py-1 px-2 hover:bg-gray-800 cursor-pointer rounded text-sm ${
              isSelected ? 'bg-blue-600' : ''
            }`}
            style={{ paddingLeft: 8 + depth * 16 }}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(node.path);
              } else {
                onFileSelect(node);
              }
            }}
          >
            {node.type === 'folder' && (
              <div className="w-4 h-4 flex items-center justify-center">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                )}
              </div>
            )}
            {node.type === 'file' && <div className="w-4" />}
            {getFileIcon(node.name, node.type)}
            <span className="text-white truncate">{node.name}</span>
          </div>
          
          {node.type === 'folder' && isExpanded && node.children && (
            <div>
              {renderFileTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <Card className="h-full bg-gray-900 border-gray-700">
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-white">File Explorer</h3>
      </div>
      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-2">
          {files.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Folder className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No files to display</p>
            </div>
          ) : (
            renderFileTree(files)
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default FileExplorer;