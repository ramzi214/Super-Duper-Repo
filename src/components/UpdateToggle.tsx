import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Settings } from 'lucide-react';

interface UpdateToggleProps {
  autoUpdatesEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  updateStatus: {
    hasUpdate: boolean;
    isUpdating: boolean;
    lastChecked: Date;
  };
}

const UpdateToggle: React.FC<UpdateToggleProps> = ({ autoUpdatesEnabled, onToggle, updateStatus }) => {
  return (
    <Card className="bg-white border-black">
      <CardHeader>
        <CardTitle className="text-xl text-black flex items-center gap-3">
          <Settings className="w-6 h-6" />
          Auto-Update Settings
          <Badge className={autoUpdatesEnabled ? "bg-green-600" : "bg-gray-600"}>
            {autoUpdatesEnabled ? 'Active' : 'Disabled'}
          </Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Last Update: {updateStatus.lastChecked.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded">
          <div className="space-y-1">
            <Label className="text-base font-medium flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Automatic A.I. Updates
            </Label>
            <p className="text-sm text-gray-600">
              Continuously update AI models and capabilities
            </p>
          </div>
          <Switch
            checked={autoUpdatesEnabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-black"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded text-sm">
          <h4 className="font-medium mb-2">Current Status:</h4>
          <ul className="space-y-1 text-gray-600">
            <li>• Auto Updates: {autoUpdatesEnabled ? 'Enabled' : 'Disabled'}</li>
            <li>• Update Available: {updateStatus.hasUpdate ? 'Yes' : 'No'}</li>
            <li>• Status: {updateStatus.isUpdating ? 'Updating...' : 'Ready'}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateToggle;