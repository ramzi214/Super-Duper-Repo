import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageSquare, Trash2, Plus } from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession
}) => {
  return (
    <div className="h-full flex flex-col bg-black border-r border-white">
      {/* Header */}
      <div className="p-4 border-b border-white">
        <Button
          onClick={onNewChat}
          className="w-full bg-white text-black hover:bg-gray-200 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Chat Sessions */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className={`p-3 cursor-pointer transition-colors ${
                activeSessionId === session.id
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-white border-white hover:bg-gray-800'
              }`}
              onClick={() => onSelectSession(session.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">
                      {session.title}
                    </span>
                  </div>
                  <p className="text-xs opacity-70 truncate">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-50">
                      {session.messageCount} messages
                    </span>
                    <span className="text-xs opacity-50">
                      {session.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="p-1 h-auto hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white">
        <div className="text-xs text-white opacity-70 text-center">
          Unlimited Chat History
          <br />
          No Restrictions
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;