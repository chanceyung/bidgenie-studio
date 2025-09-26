import { Button } from "../ui/button";
import { Menu, User, Settings, FileText } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-10 bg-card border-b border-border flex items-center px-4 justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">AI标书生成器</span>
        </div>
        
        <nav className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-xs h-8">
            文件
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            编辑
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            视图
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8">
            工具
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}