import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Play, 
  Download, 
  GitBranch, 
  Zap,
  Bot,
  User,
  Send
} from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

interface BoltProject {
  id: string;
  name: string;
  description: string;
  files: FileNode[];
  preview: string;
  buildStatus: 'idle' | 'building' | 'success' | 'error';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bolt';
  timestamp: Date;
  project?: BoltProject;
}

interface BoltAIProps {
  onProjectGenerated?: (project: BoltProject) => void;
}

const BoltAI: React.FC<BoltAIProps> = ({ onProjectGenerated }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateProject = async (prompt: string): Promise<BoltProject> => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const todoFiles = [
      {
        name: 'src',
        type: 'folder' as const,
        children: [
          { name: 'App.tsx', type: 'file' as const, content: 'import React, { useState } from "react";\n\nfunction App() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState("");\n\n  const addTodo = () => {\n    if (input.trim()) {\n      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);\n      setInput("");\n    }\n  };\n\n  return (\n    <div className="p-4">\n      <h1>Todo App</h1>\n      <input value={input} onChange={(e) => setInput(e.target.value)} />\n      <button onClick={addTodo}>Add</button>\n      <ul>\n        {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}\n      </ul>\n    </div>\n  );\n}\n\nexport default App;' }
        ]
      },
      { name: 'package.json', type: 'file' as const, content: '{\n  "name": "todo-app",\n  "version": "1.0.0"\n}' }
    ];

    const gameFiles = [
      { name: 'index.html', type: 'file' as const, content: '<!DOCTYPE html>\n<html>\n<head><title>Snake Game</title></head>\n<body><canvas id="game" width="400" height="400"></canvas></body>\n</html>' },
      { name: 'game.js', type: 'file' as const, content: 'const canvas = document.getElementById("game");\nconst ctx = canvas.getContext("2d");\n// Snake game logic' }
    ];

    const defaultFiles = [
      { name: 'index.html', type: 'file' as const, content: '<!DOCTYPE html>\n<html>\n<head><title>Web App</title></head>\n<body><h1>Welcome</h1></body>\n</html>' },
      { name: 'main.js', type: 'file' as const, content: 'console.log("App initialized");' }
    ];

    const type = prompt.toLowerCase().includes('todo') ? 'todo' : 
                 prompt.toLowerCase().includes('game') ? 'game' : 'default';
    
    const templates = {
      todo: { name: 'Todo App', description: 'Task management app', files: todoFiles },
      game: { name: 'Snake Game', description: 'Classic snake game', files: gameFiles },
      default: { name: 'Web App', description: 'Modern web application', files: defaultFiles }
    };

    const template = templates[type];
    
    return {
      id: Date.now().toString(),
      name: template.name,
      description: template.description,
      files: template.files,
      preview: `data:text/html;base64,${btoa('<html><body><h1>' + template.name + '</h1></body></html>')}`,
      buildStatus: 'success'
    };
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    try {
      const project = await generateProject(input);
      
      const boltMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I've created a ${project.name} for you! The project is ready to run.`,
        sender: 'bolt',
        timestamp: new Date(),
        project
      };

      setMessages(prev => [...prev, boltMessage]);
      onProjectGenerated?.(project);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-white">
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Bolt.new AI</h1>
            <p className="text-sm text-gray-400">Full-stack web development AI</p>
          </div>
          <Badge className="ml-auto bg-green-600 text-white">Online</Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h2 className="text-xl font-semibold mb-2">Welcome to Bolt.new AI</h2>
              <p className="text-gray-400">Describe what you want to build and I'll create it instantly.</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'bolt' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                <Card className={`p-4 ${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-900 border-gray-700'}`}>
                  <p className="text-sm">{message.content}</p>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </Card>

                {message.project && (
                  <Card className="mt-3 bg-gray-900 border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{message.project.name}</h3>
                          <p className="text-sm text-gray-400">{message.project.description}</p>
                        </div>
                        <Badge className="bg-green-600 text-white">{message.project.buildStatus}</Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Run
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                          <GitBranch className="w-4 h-4 mr-2" />
                          Fork
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isGenerating && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white animate-pulse" />
              </div>
              <Card className="bg-gray-900 border-gray-700 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="text-sm ml-2">Generating project...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what you want to build..."
            className="flex-1 min-h-[60px] max-h-[120px] resize-none bg-gray-900 border-gray-700 text-white"
            disabled={isGenerating}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="bg-blue-600 hover:bg-blue-700 px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoltAI;