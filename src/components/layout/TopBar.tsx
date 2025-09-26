import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Menu, 
  User, 
  Settings, 
  FileText, 
  Crown,
  Zap,
  Shield,
  Bell,
  Search,
  Cloud,
  Download,
  Upload
} from "lucide-react";

export function TopBar() {
  return (
    <div className="h-12 bg-gradient-to-r from-card via-card to-sidebar border-b border-border flex items-center px-6 justify-between shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-base font-semibold bg-gradient-primary bg-clip-text text-transparent">
              AI标书生成器
            </span>
            <Badge variant="secondary" className="ml-2 text-xs px-2 py-0">
              企业版
            </Badge>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-xs h-8 px-3 hover:bg-hover">
            <FileText className="w-3 h-3 mr-1" />
            项目
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8 px-3 hover:bg-hover">
            <Zap className="w-3 h-3 mr-1" />
            AI工具
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8 px-3 hover:bg-hover">
            <Cloud className="w-3 h-3 mr-1" />
            协作
          </Button>
          <Button variant="ghost" size="sm" className="text-xs h-8 px-3 hover:bg-hover">
            <Shield className="w-3 h-3 mr-1" />
            合规
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover relative">
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></div>
        </Button>
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-hover">
          <Settings className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border"></div>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 px-3 h-8 hover:bg-hover">
          <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs">管理员</span>
        </Button>
      </div>
    </div>
  );
}