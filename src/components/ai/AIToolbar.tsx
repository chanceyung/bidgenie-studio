import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { 
  Sparkles, 
  Brain, 
  Wand2, 
  FileCheck, 
  Zap, 
  Target, 
  ChevronDown,
  Code,
  Languages,
  Shield,
  Lightbulb,
  TrendingUp
} from "lucide-react";

interface AITool {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'generate' | 'optimize' | 'analyze' | 'translate';
  badge?: string;
}

const aiTools: AITool[] = [
  {
    id: 'auto-generate',
    name: '智能生成',
    description: '基于需求自动生成标书内容',
    icon: Brain,
    category: 'generate',
    badge: 'GPT-4'
  },
  {
    id: 'smart-optimize',
    name: '内容优化',
    description: '提升标书专业度和可读性',
    icon: Wand2,
    category: 'optimize',
    badge: 'Claude'
  },
  {
    id: 'compliance-check',
    name: '合规检查',
    description: '检查标书合规性和完整性',
    icon: Shield,
    category: 'analyze',
    badge: 'Pro'
  },
  {
    id: 'risk-analysis',
    name: '风险分析',
    description: '识别投标风险点并提供建议',
    icon: Target,
    category: 'analyze'
  },
  {
    id: 'lang-translate',
    name: '多语言翻译',
    description: '支持多种语言的标书翻译',
    icon: Languages,
    category: 'translate'
  },
  {
    id: 'idea-brainstorm',
    name: '创意头脑风暴',
    description: '生成创新的技术方案思路',
    icon: Lightbulb,
    category: 'generate',
    badge: 'Beta'
  }
];

export function AIToolbar() {
  const getCategoryName = (category: string) => {
    const categoryMap = {
      generate: '内容生成',
      optimize: '内容优化',
      analyze: '分析检查',
      translate: '语言处理'
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      generate: Sparkles,
      optimize: TrendingUp,
      analyze: FileCheck,
      translate: Languages
    };
    const IconComponent = iconMap[category as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <Zap className="w-4 h-4" />;
  };

  const groupedTools = aiTools.reduce((groups, tool) => {
    const category = tool.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(tool);
    return groups;
  }, {} as Record<string, AITool[]>);

  return (
    <div className="flex items-center space-x-2 bg-gradient-glass backdrop-blur-sm rounded-lg p-2 border border-border/50 shadow-soft">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center shadow-glow">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium">AI工具箱</span>
        <Badge variant="secondary" className="text-xs bg-gradient-primary text-white px-2">
          企业版
        </Badge>
      </div>

      <div className="w-px h-6 bg-border"></div>

      {/* 快速工具按钮 */}
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-3 bg-gradient-accent hover:bg-gradient-primary hover:text-white transition-all duration-300"
        >
          <Brain className="w-4 h-4 mr-1" />
          智能生成
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-3 bg-gradient-accent hover:bg-gradient-primary hover:text-white transition-all duration-300"
        >
          <Wand2 className="w-4 h-4 mr-1" />
          优化
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-3 bg-gradient-accent hover:bg-gradient-primary hover:text-white transition-all duration-300"
        >
          <Shield className="w-4 h-4 mr-1" />
          检查
        </Button>
      </div>

      <div className="w-px h-6 bg-border"></div>

      {/* 工具下拉菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3 bg-gradient-accent hover:bg-gradient-primary hover:text-white transition-all duration-300"
          >
            <Zap className="w-4 h-4 mr-1" />
            更多工具
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 bg-gradient-glass backdrop-blur-sm border-border/50 shadow-elevated">
          {Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category}>
              <DropdownMenuLabel className="flex items-center space-x-2 text-sm">
                {getCategoryIcon(category)}
                <span>{getCategoryName(category)}</span>
              </DropdownMenuLabel>
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <DropdownMenuItem 
                    key={tool.id} 
                    className="flex items-start space-x-3 p-3 hover:bg-gradient-accent cursor-pointer transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow mt-0.5">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{tool.name}</span>
                        {tool.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {tool.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {tool.description}
                      </p>
                    </div>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}