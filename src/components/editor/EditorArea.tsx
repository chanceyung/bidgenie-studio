import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  X, 
  Save, 
  Download, 
  Eye, 
  FileText, 
  Undo2, 
  Redo2, 
  Search, 
  Replace, 
  Zap,
  Copy,
  Printer,
  FileCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface Tab {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
  status: 'draft' | 'saved' | 'modified';
  wordCount: number;
  lastSaved?: Date;
}

const mockTabs: Tab[] = [
  {
    id: "1",
    name: "技术标.md",
    content: `# 智慧城市建设项目技术标书

## 项目概述
本项目致力于构建现代化智慧城市基础设施，通过先进的物联网、大数据、人工智能等技术，提升城市管理效率和居民生活质量...

## 技术方案
### 1. 总体架构
我们采用云原生微服务架构，确保系统的高可用性、可扩展性和安全性...

### 2. 关键技术
- 物联网传感器网络部署
- 边缘计算节点建设
- 大数据分析平台
- AI智能决策系统
- 区块链安全认证

## 实施计划
### 第一阶段（1-6个月）
基础设施建设和核心系统开发...

### 第二阶段（7-12个月）
系统集成测试和试运行...

### 第三阶段（13-18个月）
全面部署和运维优化...`,
    isActive: true,
    status: 'modified',
    wordCount: 1250,
    lastSaved: new Date(Date.now() - 300000)
  },
  {
    id: "2", 
    name: "商务标.md",
    content: `# 商务标书

## 公司概况
我们是一家专业的智慧城市解决方案提供商...

## 项目报价
总投资预算：5000万元...`,
    isActive: false,
    status: 'saved',
    wordCount: 800,
    lastSaved: new Date(Date.now() - 600000)
  }
];

export function EditorArea() {
  const [tabs, setTabs] = useState(mockTabs);
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.isActive));

  const handleTabClick = (tabId: string) => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
    setTabs(updatedTabs);
    setActiveTab(updatedTabs.find(tab => tab.id === tabId));
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filteredTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(filteredTabs);
    if (activeTab?.id === tabId && filteredTabs.length > 0) {
      setActiveTab(filteredTabs[0]);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'modified': return <AlertCircle className="w-3 h-3 text-amber-500" />;
      case 'saved': return <FileCheck className="w-3 h-3 text-green-500" />;
      default: return <Clock className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-editor-background">
      {/* Tab Bar */}
      <div className="flex bg-tab-inactive border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-3 border-r border-border cursor-pointer text-sm min-w-0 group ${
              tab.isActive 
                ? 'bg-tab-active text-foreground shadow-sm' 
                : 'bg-tab-inactive text-muted-foreground hover:bg-hover'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center space-x-2 mr-2">
              {getStatusIcon(tab.status)}
              <span className="truncate max-w-32">{tab.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-hover rounded-sm"
              onClick={(e) => handleCloseTab(tab.id, e)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        {/* Add Tab Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-10 h-10 p-0 m-1 hover:bg-hover rounded-md"
          title="新建文档"
        >
          +
        </Button>
      </div>

      {/* Enhanced Toolbar */}
      <div className="flex items-center p-3 bg-card border-b border-border space-x-1">
        <div className="flex items-center space-x-1 mr-4">
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Save className="w-4 h-4 mr-2" />
            保存
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Download className="w-4 h-4 mr-2" />
            导出
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3">
            <Eye className="w-4 h-4 mr-2" />
            预览
          </Button>
        </div>

        <div className="w-px h-6 bg-border"></div>

        <div className="flex items-center space-x-1 mr-4">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="撤销">
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="重做">
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border"></div>

        <div className="flex items-center space-x-1 mr-4">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="查找">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" title="替换">
            <Replace className="w-4 h-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-border"></div>

        <Button variant="ghost" size="sm" className="h-8 px-3 bg-gradient-primary text-white hover:opacity-90">
          <Zap className="w-4 h-4 mr-2" />
          AI优化
        </Button>

        <div className="flex-1"></div>

        {activeTab && (
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>字数: {activeTab.wordCount}</span>
              <Badge variant="outline" className="text-xs">
                {activeTab.status === 'modified' ? '未保存' : '已保存'}
              </Badge>
            </div>
            {activeTab.lastSaved && (
              <span>上次保存: {activeTab.lastSaved.toLocaleTimeString()}</span>
            )}
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        {activeTab ? (
          <div className="h-full flex">
            {/* Line numbers */}
            <div className="w-12 bg-editor-gutter border-r border-border flex flex-col text-xs text-muted-foreground pt-4">
              {Array.from({ length: 50 }, (_, i) => (
                <div key={i} className="h-6 flex items-center justify-end pr-2">
                  {i + 1}
                </div>
              ))}
            </div>
            
            {/* Editor */}
            <div className="flex-1 relative">
              <Textarea
                value={activeTab.content}
                onChange={(e) => {
                  const updatedTabs = tabs.map(tab => 
                    tab.id === activeTab.id 
                      ? { 
                          ...tab, 
                          content: e.target.value,
                          status: 'modified' as const,
                          wordCount: e.target.value.length
                        }
                      : tab
                  );
                  setTabs(updatedTabs);
                  setActiveTab(updatedTabs.find(tab => tab.id === activeTab.id)!);
                }}
                className="w-full h-full bg-transparent border-none resize-none focus:outline-none font-mono text-sm leading-6 p-4"
                placeholder="开始编写您的标书内容..."
                style={{ lineHeight: '24px' }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">欢迎使用AI标书生成器</h3>
              <p className="text-sm">选择一个文件开始编辑，或创建新的标书文档</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}