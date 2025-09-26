import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send, Bot, User, Settings, MoreVertical } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "您好！我是AI助手，专门帮助您生成和优化标书内容。请问今天我可以为您做些什么？",
    timestamp: new Date()
  },
  {
    id: "2",
    role: "user", 
    content: "我需要写一份关于智慧城市建设项目的技术标书",
    timestamp: new Date()
  },
  {
    id: "3",
    role: "assistant",
    content: "好的！智慧城市建设项目的技术标书需要包含以下几个关键部分：\n\n1. **项目理解与分析**\n2. **总体技术方案**\n3. **系统架构设计**\n4. **关键技术实现**\n5. **项目实施计划**\n\n我可以帮您逐步完善每个部分。请问您希望从哪个部分开始？",
    timestamp: new Date()
  }
];

export function ChatPanel() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "我正在为您分析需求，请稍等...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-medium">AI 助手</h3>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <Settings className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <Bot className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  )}
                  {message.role === 'user' && (
                    <User className="w-4 h-4 mt-1 flex-shrink-0" />
                  )}
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                </div>
                <div className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-3 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的问题..."
            className="flex-1 bg-input text-sm"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="px-3"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          按 Enter 发送，Shift+Enter 换行
        </div>
      </div>
    </div>
  );
}