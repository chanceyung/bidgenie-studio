import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { AutoModePanel } from "../ai/AutoModePanel";
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
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Brain,
  MessageSquare,
  Layers
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'suggestion' | 'analysis';
  metadata?: {
    model?: string;
    tokens?: number;
    confidence?: number;
    suggestions?: string[];
  };
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
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [showAutoPanel, setShowAutoPanel] = useState(false);
  const [selectedModel, setSelectedModel] = useState("claude-4-opus");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response with enhanced features
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🧠 **AI正在分析您的需求...**\n\n基于您的输入，我将为您提供专业的标书建议。请稍等片刻...",
        timestamp: new Date(),
        type: 'analysis',
        metadata: {
          model: selectedModel,
          tokens: 150,
          confidence: 0.92,
          suggestions: ["添加技术细节", "完善实施方案", "优化成本结构"]
        }
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

  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case 'code': return <Zap className="w-3 h-3 text-blue-500" />;
      case 'suggestion': return <Lightbulb className="w-3 h-3 text-amber-500" />;
      case 'analysis': return <Brain className="w-3 h-3 text-purple-500" />;
      default: return <MessageSquare className="w-3 h-3 text-primary" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-glass backdrop-blur-sm border-l border-border/50">
      {/* Enhanced Chat Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-secondary">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">AI智能助手</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Claude-4 Opus • 在线</span>
                <Badge variant="secondary" className="text-xs bg-gradient-primary text-white px-2">
                  企业版
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-8 h-8 p-0 hover:bg-hover transition-all duration-200"
              onClick={() => setShowAutoPanel(!showAutoPanel)}
            >
              <Brain className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover transition-all duration-200">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover transition-all duration-200">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover transition-all duration-200">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 px-3 bg-gradient-accent border-border/50 hover:bg-gradient-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <Zap className="w-3 h-3 mr-1" />
            快速生成
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 px-3 bg-gradient-accent border-border/50 hover:bg-gradient-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <FileText className="w-3 h-3 mr-1" />
            优化内容
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs h-7 px-3 bg-gradient-accent border-border/50 hover:bg-gradient-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            创意建议
          </Button>
          <Button
            variant={isAutoMode ? "default" : "outline"}
            size="sm"
            className={`text-xs h-7 px-3 ${isAutoMode 
              ? "bg-gradient-primary text-white shadow-glow" 
              : "bg-gradient-accent border-border/50 hover:bg-gradient-primary hover:text-white hover:border-primary"
            } transition-all duration-300`}
            onClick={() => setIsAutoMode(!isAutoMode)}
          >
            <Brain className="w-3 h-3 mr-1" />
            Auto模式
          </Button>
        </div>
      </div>

      {/* Auto Mode Panel */}
      {showAutoPanel && (
        <div className="h-80 border-b border-border/50 p-4">
          <AutoModePanel />
        </div>
      )}

      {/* Enhanced Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl shadow-soft transition-all duration-300 hover:shadow-elevated ${
                  message.role === 'user'
                    ? 'bg-gradient-primary text-white'
                    : 'bg-gradient-glass backdrop-blur-sm border border-border/50'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start space-x-3">
                    {message.role === 'assistant' && (
                      <div className="w-7 h-7 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-glow">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {message.role === 'user' && (
                      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {message.type && getMessageTypeIcon(message.type)}
                        {message.metadata?.model && (
                          <Badge variant="secondary" className="text-xs">
                            {message.metadata.model}
                          </Badge>
                        )}
                        {message.metadata?.confidence && (
                          <Badge variant="outline" className="text-xs">
                            准确度: {(message.metadata.confidence * 100).toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </div>
                      {message.metadata?.suggestions && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium opacity-80">💡 建议:</p>
                          {message.metadata.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6 px-2 mr-2 mb-1 bg-white/10 border-white/20 hover:bg-white/20"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-4 flex items-center justify-between">
                  <div className="text-xs opacity-60 flex items-center space-x-2">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.metadata?.tokens && (
                      <span>• {message.metadata.tokens} tokens</span>
                    )}
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 opacity-60 hover:opacity-100 transition-opacity">
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 opacity-60 hover:opacity-100 transition-opacity">
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 opacity-60 hover:opacity-100 transition-opacity">
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-6 h-6 p-0 opacity-60 hover:opacity-100 transition-opacity">
                        <RefreshCw className="w-3 h-3" />
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
      <div className="p-4 border-t border-border/50 bg-gradient-secondary">
        <div className="space-y-3">
          {/* Model Selection */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <Layers className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">模型:</span>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-transparent border-none text-xs focus:outline-none"
              >
                <option value="claude-4-opus">Claude-4 Opus</option>
                <option value="claude-4-sonnet">Claude-4 Sonnet</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-gradient-primary text-white">
                剩余: 8,500 tokens
              </Badge>
            </div>
          </div>

          {/* Input Row */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="详细描述您的标书需求，AI将为您生成专业内容..."
                className="bg-gradient-accent border-border/50 focus:border-primary text-sm pr-20 rounded-xl transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-hover transition-all duration-200">
                  <Mic className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-hover transition-all duration-200">
                  <Paperclip className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="px-5 bg-gradient-primary hover:opacity-90 text-white shadow-glow rounded-xl transition-all duration-300"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Status and Tips */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Enter 发送 • Shift+Enter 换行 • /help 查看命令</span>
            <div className="flex items-center space-x-2">
              {isAutoMode && (
                <Badge variant="secondary" className="text-xs bg-gradient-primary text-white animate-pulse">
                  Auto模式已启用
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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