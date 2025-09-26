import { Button } from "../ui/button";
import { X, Save, Download, Eye, FileText } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface Tab {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
}

const mockTabs: Tab[] = [
  {
    id: "1",
    name: "技术标.md",
    content: `# 技术标书

## 项目概述
本项目旨在...

## 技术方案
### 1. 总体架构
我们采用...

### 2. 关键技术
- 技术要点1
- 技术要点2
- 技术要点3

## 实施计划
### 第一阶段
...

### 第二阶段
...`,
    isActive: true
  },
  {
    id: "2", 
    name: "商务标.md",
    content: "# 商务标书内容...",
    isActive: false
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

  return (
    <div className="h-full flex flex-col">
      {/* Tab Bar */}
      <div className="flex bg-tab-inactive border-b border-border">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-2 border-r border-border cursor-pointer text-sm ${
              tab.isActive 
                ? 'bg-tab-active text-foreground' 
                : 'bg-tab-inactive text-muted-foreground hover:bg-hover'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="mr-2">{tab.name}</span>
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0 hover:bg-hover"
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
          className="w-8 h-8 p-0 m-1"
        >
          +
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center p-2 bg-card border-b border-border space-x-2">
        <Button variant="ghost" size="sm">
          <Save className="w-4 h-4 mr-2" />
          保存
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4 mr-2" />
          导出
        </Button>
        <Button variant="ghost" size="sm">
          <Eye className="w-4 h-4 mr-2" />
          预览
        </Button>
        <div className="flex-1"></div>
        <span className="text-xs text-muted-foreground">字数: {activeTab?.content.length || 0}</span>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4 bg-editor-background">
        {activeTab ? (
          <Textarea
            value={activeTab.content}
            onChange={(e) => {
              const updatedTabs = tabs.map(tab => 
                tab.id === activeTab.id 
                  ? { ...tab, content: e.target.value }
                  : tab
              );
              setTabs(updatedTabs);
              setActiveTab({ ...activeTab, content: e.target.value });
            }}
            className="w-full h-full bg-transparent border-none resize-none focus:outline-none font-mono text-sm"
            placeholder="开始编写您的标书内容..."
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>选择一个文件开始编辑</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}