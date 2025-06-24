import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Globe, Share2, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PublishPanelProps {
  projectCode?: string;
  projectName?: string;
}

const PublishPanel: React.FC<PublishPanelProps> = ({ projectCode = '', projectName = '' }) => {
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [formData, setFormData] = useState({
    name: projectName || 'My Super App',
    description: 'Built with Ramzi Arcade\'s SUPER DUPER COMPUTER',
    domain: '',
    isPublic: true
  });

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simulate publishing process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockUrl = `https://${formData.domain || 'my-app'}.superduper.app`;
      setPublishedUrl(mockUrl);
      setIsPublished(true);
      
      toast({
        title: "🚀 Published Successfully!",
        description: `Your app is now live at ${mockUrl}`
      });
    } catch (error) {
      toast({
        title: "❌ Publishing Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(publishedUrl);
    toast({ title: "📋 Copied!", description: "URL copied to clipboard" });
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border-blue-500">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Publish Your App
            <Badge className="bg-green-500 text-white">FREE FOREVER</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isPublished ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="app-name">App Name</Label>
                <Input
                  id="app-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your app name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Textarea
                  id="app-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your app"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="domain">Custom Domain (Optional)</Label>
                <Input
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  placeholder="my-awesome-app"
                />
                <p className="text-sm text-gray-500">
                  Will be published to: {formData.domain || 'my-app'}.superduper.app
                </p>
              </div>
              
              <Alert className="border-green-500 bg-green-50">
                <Globe className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>🎉 Free Publishing!</strong> No hosting fees, no limits, publish unlimited apps forever!
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handlePublish} 
                disabled={isPublishing || !formData.name}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Publish App for FREE
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-bold text-green-700">🎉 App Published Successfully!</h3>
              <div className="bg-gray-100 p-4 rounded border">
                <p className="text-sm text-gray-600 mb-2">Your app is live at:</p>
                <p className="font-mono text-blue-600 break-all">{publishedUrl}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={copyUrl} variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy URL
                </Button>
                <Button 
                  onClick={() => window.open(publishedUrl, '_blank')} 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  View Live App
                </Button>
              </div>
              <Button 
                onClick={() => {setIsPublished(false); setPublishedUrl('');}}
                variant="ghost"
                className="w-full"
              >
                Publish Another App
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishPanel;