import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import BoltAI from './BoltAI';
import FileExplorer from './FileExplorer';
import CodeEditor from './CodeEditor';
import ProjectPreview from './ProjectPreview';
import { Code, Eye, MessageSquare, Folder } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
  path: string;
}

interface BoltProject {
  id: string;
  name: string;
  description: string;
  files: FileNode[];
  preview: string;
  buildStatus: 'idle' | 'building' | 'success' | 'error';
}

const BoltInterface: React.FC = () => {
  const [activeProject, setActiveProject] = useState<BoltProject | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [activeTab, setActiveTab] = useState('chat');

  const processFiles = (files: FileNode[], basePath = ''): FileNode[] => {
    return files.map(file => ({
      ...file,
      path: basePath ? `${basePath}/${file.name}` : file.name,
      children: file.children ? processFiles(file.children, basePath ? `${basePath}/${file.name}` : file.name) : undefined
    }));
  };

  const handleProjectGenerated = (project: BoltProject) => {
    const processedProject = {
      ...project,
      files: processFiles(project.files)
    };
    setActiveProject(processedProject);
    setActiveTab('code');
  };

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const handleRefreshPreview = () => {
    if (activeProject) {
      setActiveProject({
        ...activeProject,
        buildStatus: 'building'
      });
      
      setTimeout(() => {
        setActiveProject(prev => prev ? {
          ...prev,
          buildStatus: 'success'
        } : null);
      }, 2000);
    }
  };

  const handleDeploy = () => {
    console.log('Deploying project:', activeProject?.name);
  };

  return (
    <div className="h-full bg-black">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
        <div className="border-b border-gray-800 px-4">
          <TabsList className="bg-gray-900 border-gray-700">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2" disabled={!activeProject}>
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2" disabled={!activeProject}>
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1">
          <TabsContent value="chat" className="h-full m-0">
            <BoltAI onProjectGenerated={handleProjectGenerated} />
          </TabsContent>

          <TabsContent value="code" className="h-full m-0">
            {activeProject ? (
              <ResizablePanelGroup direction="horizontal" className="h-full">
                <ResizablePanel defaultSize={25} minSize={20}>
                  <FileExplorer
                    files={activeProject.files}
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <CodeEditor
                    file={selectedFile}
                    onSave={(content) => console.log('Save:', content)}
                    onRun={() => console.log('Run file')}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-gray-500">
                  <Folder className="w-12 h-12 mx-auto mb-4" />
                  <p>Generate a project first to view code</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="h-full m-0">
            {activeProject ? (
              <ProjectPreview
                project={activeProject}
                onRefresh={handleRefreshPreview}
                onDeploy={handleDeploy}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-gray-500">
                  <Eye className="w-12 h-12 mx-auto mb-4" />
                  <p>Generate a project first to view preview</p>
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default BoltInterface;