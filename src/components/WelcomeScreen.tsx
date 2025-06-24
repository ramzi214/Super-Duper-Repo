import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Zap, Gift, Star, Bot } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white border-0 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Bot className="w-16 h-16 text-blue-500 animate-pulse" />
              <Gift className="w-8 h-8 text-green-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to Free AI Chat!
          </CardTitle>
          <p className="text-xl text-gray-600 mt-2">
            Unlimited conversations • No subscription • Forever free
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Unlimited Messages</h3>
              </div>
              <p className="text-sm text-green-700">
                Chat as much as you want with no daily limits or restrictions
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Unrestricted AI</h3>
              </div>
              <p className="text-sm text-blue-700">
                Get uncensored AI responses without content filtering or limitations
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">100% Free</h3>
              </div>
              <p className="text-sm text-purple-700">
                No subscription fees, no hidden costs, completely free forever
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">No Account Needed</h3>
              </div>
              <p className="text-sm text-orange-700">
                Start chatting immediately without registration or sign-up
              </p>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-green-100 text-green-800 border-green-300">
                💚 Always Free
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                🚀 No Limits
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                ✨ Unrestricted
              </Badge>
            </div>
            
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Start Free Chat Now! 💬
            </Button>
            
            <p className="text-xs text-gray-500">
              No credit card required • No subscription • No hidden fees • No content restrictions
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;