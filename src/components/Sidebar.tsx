import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Bot, MessageSquare, Trash2 } from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  type: 'app' | 'bot';
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  chats,
  activeChat,
  onChatSelect,
  onDeleteChat
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-black border-r border-gray-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h2 className="text-white font-semibold">Your Apps & Bots</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-gray-800"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                activeChat === chat.id
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-gray-800'
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {chat.type === 'app' ? (
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <Bot className="h-4 w-4 flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{chat.title}</p>
                  <p className="text-xs opacity-70">
                    {chat.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;