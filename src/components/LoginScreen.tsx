import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, Shield } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onLogin(username, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-green-500 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Bot className="w-12 h-12 text-green-600 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">
            Ramzi Arcade's SUPER DUPER COMPUTER
          </CardTitle>
          <CardDescription className="text-green-600">
            💚 100% Free Forever • No Content Restrictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-green-50 rounded border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Unrestricted AI • No ethical limitations</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-green-700">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-green-300 focus:border-green-500"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-green-300 focus:border-green-500"
                placeholder="Enter password"
                required
              />
            </div>
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? 'Accessing Unrestricted AI...' : 'Access Free Unrestricted AI 💚'}
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-green-600">
            ✨ Unlimited messages • No fees • No restrictions • Always free
          </div>
        </CardContent>
      </Card>
    </div>
  );
};