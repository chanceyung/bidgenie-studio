import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  Zap, 
  Brain, 
  Code, 
  FileCheck, 
  Settings,
  Sparkles,
  Timer,
  Target,
  TrendingUp
} from "lucide-react";

interface AutoTask {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  description: string;
  estimatedTime?: string;
}

const mockTasks: AutoTask[] = [
  {
    id: '1',
    title: '分析招标需求',
    status: 'completed',
    progress: 100,
    description: '已完成招标文件分析，识别关键评分点',
    estimatedTime: '2分钟'
  },
  {
    id: '2',
    title: '生成技术方案框架',
    status: 'running',
    progress: 65,
    description: '正在根据需求生成技术架构方案',
    estimatedTime: '5分钟'
  },
  {
    id: '3',
    title: '完善商务标内容',
    status: 'pending',
    progress: 0,
    description: '基于技术方案生成匹配的商务内容',
    estimatedTime: '3分钟'
  },
  {
    id: '4',
    title: '合规性检查',
    status: 'pending',
    progress: 0,
    description: '检查标书内容是否符合招标要求',
    estimatedTime: '2分钟'
  }
];

export function AutoModePanel() {
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FileCheck className="w-4 h-4 text-green-500" />;
      case 'running': return <Zap className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'failed': return <Square className="w-4 h-4 text-red-500" />;
      default: return <Timer className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <Card className="h-full bg-gradient-glass backdrop-blur-sm border-border/50 shadow-elevated">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>Auto模式</span>
                <Badge variant="secondary" className="text-xs bg-gradient-primary text-white">
                  AI驱动
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">智能自动化标书生成</p>
            </div>
          </div>
          <Button
            variant={isAutoMode ? "destructive" : "default"}
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={isAutoMode ? "" : "bg-gradient-primary hover:opacity-90 text-white shadow-glow"}
          >
            {isAutoMode ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                停止
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                开始Auto
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-accent rounded-lg p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
            <div className="text-lg font-semibold">2</div>
            <div className="text-xs text-muted-foreground">已完成</div>
          </div>
          <div className="bg-gradient-accent rounded-lg p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            <div className="text-lg font-semibold">1</div>
            <div className="text-xs text-muted-foreground">进行中</div>
          </div>
          <div className="bg-gradient-accent rounded-lg p-3 text-center">
            <Timer className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <div className="text-lg font-semibold">12</div>
            <div className="text-xs text-muted-foreground">剩余分钟</div>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>执行任务</span>
          </h4>
          
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-gradient-secondary rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <h5 className="text-sm font-medium">{task.title}</h5>
                    <p className="text-xs text-muted-foreground">{task.description}</p>
                  </div>
                </div>
                {task.estimatedTime && (
                  <Badge variant="outline" className="text-xs">
                    {task.estimatedTime}
                  </Badge>
                )}
              </div>
              
              {task.status === 'running' && (
                <div className="space-y-2">
                  <Progress value={task.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {task.progress}%
                  </div>
                </div>
              )}
              
              {task.status === 'completed' && (
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                  <span className="text-xs text-green-500">任务完成</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 配置按钮 */}
        <div className="pt-4 border-t border-border/50">
          <Button variant="outline" className="w-full" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Auto模式设置
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}