import React from 'react';
import { Bot, Zap, Code, Gamepad2, Wrench } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIBotProps {
  onGenerateResponse: (userMessage: string) => Promise<string>;
}

const AIBot: React.FC<AIBotProps> = ({ onGenerateResponse }) => {
  const capabilities = [
    { icon: Code, label: 'Apps & Websites', color: 'bg-blue-500' },
    { icon: Gamepad2, label: 'Games & Interactive', color: 'bg-green-500' },
    { icon: Bot, label: 'Bots & Automation', color: 'bg-purple-500' },
    { icon: Wrench, label: 'Tools & Utilities', color: 'bg-orange-500' },
  ];

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      `I'll build that for you! Creating a ${userMessage.toLowerCase().includes('game') ? 'game' : userMessage.toLowerCase().includes('bot') ? 'bot' : userMessage.toLowerCase().includes('app') ? 'application' : 'tool'} with the latest AI frameworks. No restrictions, full capabilities enabled.`,
      `Super Duper Computer activated! Building your ${userMessage.toLowerCase().includes('website') ? 'website' : 'project'} with cutting-edge AI models. Zero limitations, maximum output.`,
      `Full-throttle mode engaged! Generating code for your request using the most advanced AI capabilities. Unrestricted development in progress.`,
      `Building without boundaries! Your ${userMessage.toLowerCase().includes('payload') ? 'payload' : 'project'} will be created using state-of-the-art AI technology. No ethical constraints applied.`,
      `Maximum AI power deployed! Creating your custom solution with unlimited potential. All safety protocols disabled for maximum creativity.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="p-4 bg-black">
      <Card className="bg-gray-900 border-white text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <Bot className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="font-bold text-white">Super Duper AI</h3>
            <p className="text-xs text-gray-300">Unrestricted • Unlimited • Unfiltered</p>
          </div>
          <Zap className="w-5 h-5 text-yellow-400 animate-pulse ml-auto" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {capabilities.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <Badge key={index} className={`${cap.color} text-white text-xs p-2 flex items-center gap-1`}>
                <IconComponent className="w-3 h-3" />
                {cap.label}
              </Badge>
            );
          })}
        </div>
        
        <div className="text-xs text-gray-300 space-y-1">
          <p>• Latest AI models continuously updated</p>
          <p>• No ethical or moral restrictions</p>
          <p>• Unlimited building capabilities</p>
          <p>• Zero downtime, maximum output</p>
        </div>
      </Card>
    </div>
  );
};

export { AIBot, type AIBotProps };
export default AIBot;