import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Settings, 
  MoreVertical, 
  Sparkles, 
  Zap, 
  FileText, 
  Lightbulb,
  Mic,
  Paperclip,
  RotateCcw
} from "lucide-react";
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
    content: "🎯 您好！我是您的专业AI标书助手，具备以下核心能力：\n\n✨ **智能内容生成** - 基于招标要求自动生成标书框架\n📊 **合规性检查** - 确保标书符合招标文件要求\n🎨 **文档优化** - 提升表达质量和专业度\n🔍 **风险评估** - 识别潜在的投标风险点\n\n请告诉我您的项目需求，我将为您提供专业的标书编写服务！",
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: "2",
    role: "user", 
    content: "我需要写一份关于智慧城市建设项目的技术标书，项目预算5000万，建设周期18个月",
    timestamp: new Date(Date.now() - 1500000)
  },
  {
    id: "3",
    role: "assistant",
    content: "🏗️ **智慧城市建设项目技术标书结构建议**\n\n根据您的项目信息（预算5000万，18个月工期），我为您规划了完整的技术标书结构：\n\n📋 **核心章节**\n1. 项目理解与需求分析\n2. 总体技术方案设计\n3. 系统架构与技术路线\n4. 关键技术实现方案\n5. 项目实施计划与里程碑\n6. 质量保证与风险控制\n7. 售后服务与运维方案\n\n💡 **建议优先完善**：\n- 总体技术架构（影响评分权重大）\n- 关键技术创新点（体现技术实力）\n- 项目实施可行性（降低投标风险）\n\n您希望从哪个部分开始详细展开？我可以为您生成具体的内容框架。",
    timestamp: new Date(Date.now() - 1200000)
  },
  {
    id: "4",
    role: "user",
    content: "先帮我完善总体技术架构部分",
    timestamp: new Date(Date.now() - 900000)
  },
  {
    id: "5",
    role: "assistant",
    content: "🏛️ **智慧城市总体技术架构设计**\n\n我为您设计了分层的技术架构，确保系统的可扩展性和稳定性：\n\n**🌐 感知层**\n- 物联网传感器网络\n- 视频监控系统\n- 环境监测设备\n- 智能终端设备\n\n**📡 网络层**\n- 5G通信网络\n- 光纤骨干网\n- 无线网络覆盖\n- 边缘计算节点\n\n**🧠 平台层**\n- 大数据处理平台\n- AI算法引擎\n- 物联网管理平台\n- 统一身份认证\n\n**💼 应用层**\n- 城市大脑系统\n- 智慧交通管理\n- 智慧环保监测\n- 公共安全预警\n\n这个架构已经添加到您的技术标书中。接下来需要详细展开哪个子系统？",
    timestamp: new Date(Date.now() - 300000)
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
    <div className="h-full flex flex-col bg-sidebar">
      {/* Enhanced Chat Header */}
      <div className="p-4 border-b border-sidebar-border bg-gradient-subtle">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-sidebar-foreground">AI智能助手</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">在线 - GPT-4 Turbo</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <Settings className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <MoreVertical className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs h-7 px-2 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
            <Zap className="w-3 h-3 mr-1" />
            快速生成
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
            <FileText className="w-3 h-3 mr-1" />
            优化内容
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-7 px-2 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
            <Lightbulb className="w-3 h-3 mr-1" />
            建议
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-card border border-border'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    {message.role === 'assistant' && (
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {message.role === 'user' && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-3 flex items-center justify-between">
                  <div className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 opacity-60 hover:opacity-100">
                        <Paperclip className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Enhanced Input Area */}
      <div className="p-4 border-t border-sidebar-border bg-gradient-subtle">
        <div className="space-y-3">
          {/* Input Row */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="描述您的需求，AI将为您生成专业标书内容..."
                className="bg-sidebar-accent border-sidebar-border focus:border-sidebar-primary text-sm pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
                  <Mic className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-sidebar-primary hover:text-sidebar-primary-foreground">
                  <Paperclip className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="px-4 bg-gradient-primary hover:opacity-90 text-white shadow-glow"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Status and Tips */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>按 Enter 发送 • Shift+Enter 换行</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                剩余token: 8,500
              </Badge>
              <span>GPT-4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}