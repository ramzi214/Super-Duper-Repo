import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Rocket, Globe, Server, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DeploymentPanelProps {
  onDeploy: (config: DeploymentConfig) => void;
  isDeploying?: boolean;
  deploymentUrl?: string;
}

interface DeploymentConfig {
  platform: 'vercel' | 'netlify' | 'github-pages';
  projectName: string;
  domain?: string;
}

const DeploymentPanel: React.FC<DeploymentPanelProps> = ({
  onDeploy,
  isDeploying = false,
  deploymentUrl
}) => {
  const { toast } = useToast();
  const [config, setConfig] = useState<DeploymentConfig>({
    platform: 'vercel',
    projectName: 'super-duper-app'
  });

  const handleDeploy = () => {
    if (!config.projectName.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }
    onDeploy(config);
  };

  const copyUrl = () => {
    if (deploymentUrl) {
      navigator.clipboard.writeText(deploymentUrl);
      toast({
        title: "Copied!",
        description: "Deployment URL copied to clipboard"
      });
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Deployment Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select value={config.platform} onValueChange={(value) => setConfig(prev => ({ ...prev, platform: value as any }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vercel">Vercel</SelectItem>
              <SelectItem value="netlify">Netlify</SelectItem>
              <SelectItem value="github-pages">GitHub Pages</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={config.projectName}
            onChange={(e) => setConfig(prev => ({ ...prev, projectName: e.target.value }))}
            placeholder="my-awesome-app"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Custom Domain (Optional)</Label>
          <Input
            id="domain"
            value={config.domain || ''}
            onChange={(e) => setConfig(prev => ({ ...prev, domain: e.target.value }))}
            placeholder="myapp.com"
          />
        </div>

        <Button 
          onClick={handleDeploy} 
          disabled={isDeploying}
          className="w-full bg-cyan-600 hover:bg-cyan-700"
        >
          {isDeploying ? (
            <>
              <Server className="w-4 h-4 mr-2 animate-pulse" />
              Deploying...
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Now
            </>
          )}
        </Button>

        {deploymentUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Globe className="w-3 h-3 mr-1" />
                Live
              </Badge>
              <span className="text-sm text-gray-400">Deployment successful!</span>
            </div>
            <div className="flex gap-2">
              <Input value={deploymentUrl} readOnly className="text-sm" />
              <Button onClick={copyUrl} variant="outline" size="sm">
                Copy
              </Button>
              <Button onClick={() => window.open(deploymentUrl, '_blank')} variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeploymentPanel;