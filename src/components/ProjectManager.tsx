import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Folder, Plus, Trash2, Edit, Eye, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  name: string;
  description: string;
  code: string;
  createdAt: Date;
  lastModified: Date;
  isPublished: boolean;
  publishUrl?: string;
}

interface ProjectManagerProps {
  onSelectProject?: (project: Project) => void;
  onNewProject?: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onSelectProject, onNewProject }) => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('superduper_projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          lastModified: new Date(p.lastModified)
        }));
        setProjects(parsed);
      } catch (error) {
        console.error('Failed to load projects:', error);
      }
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('superduper_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: 'New project created with SUPER DUPER COMPUTER',
      code: '',
      createdAt: new Date(),
      lastModified: new Date(),
      isPublished: false
    };
    
    const updatedProjects = [newProject, ...projects];
    saveProjects(updatedProjects);
    setNewProjectName('');
    setShowNewProject(false);
    
    toast({
      title: "🎉 Project Created!",
      description: `${newProjectName} is ready to build`
    });
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
    toast({
      title: "🗑️ Project Deleted",
      description: "Project removed successfully"
    });
  };

  const selectProject = (project: Project) => {
    onSelectProject?.(project);
    toast({
      title: "📂 Project Opened",
      description: `Now working on ${project.name}`
    });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border-indigo-500">
        <CardHeader>
          <CardTitle className="text-indigo-700 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Project Manager
            <Badge className="bg-indigo-500 text-white">UNLIMITED PROJECTS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-indigo-500 bg-indigo-50">
            <Plus className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-indigo-800">
              <strong>🚀 Unlimited Projects!</strong> Create, manage, and publish unlimited projects - all free forever!
            </AlertDescription>
          </Alert>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowNewProject(!showNewProject)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Button onClick={onNewProject} variant="outline">
              Quick Start
            </Button>
          </div>
          
          {showNewProject && (
            <div className="flex gap-2 p-4 bg-gray-50 rounded border">
              <Input
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name"
                onKeyPress={(e) => e.key === 'Enter' && createProject()}
              />
              <Button onClick={createProject} disabled={!newProjectName.trim()}>
                Create
              </Button>
              <Button onClick={() => setShowNewProject(false)} variant="ghost">
                Cancel
              </Button>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Your Projects ({projects.length})</h4>
            {projects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Folder className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No projects yet. Create your first project!</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800">{project.name}</h5>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex gap-2 text-xs text-gray-500">
                          <span>Created: {project.createdAt.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Modified: {project.lastModified.toLocaleDateString()}</span>
                          {project.isPublished && (
                            <>
                              <span>•</span>
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Published
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          onClick={() => selectProject(project)}
                          size="sm" 
                          variant="outline"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {project.isPublished && (
                          <Button size="sm" variant="outline">
                            <Share2 className="w-3 h-3" />
                          </Button>
                        )}
                        <Button 
                          onClick={() => deleteProject(project.id)}
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManager;