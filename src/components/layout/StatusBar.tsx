import { Badge } from "../ui/badge";
import { Wifi, Database, Shield, Clock, Users, FileCheck } from "lucide-react";

export function StatusBar() {
  return (
    <div className="h-7 bg-status-bar text-white flex items-center px-6 text-xs justify-between shadow-inner">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium">系统运行正常</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>第 1 行，第 1 列</span>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>Markdown</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Wifi className="w-3 h-3" />
            <span>AI服务</span>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 ml-1">在线</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Database className="w-3 h-3" />
            <span>云端同步</span>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 ml-1">已同步</Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>企业版</span>
          </div>
        </div>
        <div className="w-px h-4 bg-white/30"></div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>3 人在线</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileCheck className="w-3 h-3" />
            <span>智慧城市项目</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}