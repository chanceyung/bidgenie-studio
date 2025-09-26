import { FileExplorer } from "../sidebar/FileExplorer";
import { EditorArea } from "../editor/EditorArea";
import { ChatPanel } from "../chat/ChatPanel";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";
import { FileText, Search, Brain, Settings, User } from "lucide-react";

export function AppLayout() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Enhanced Activity Bar */}
        <div className="w-14 bg-activity-bar border-r border-border flex flex-col items-center py-4 space-y-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow hover:scale-110 transition-transform duration-200 cursor-pointer">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-accent rounded-xl flex items-center justify-center hover:bg-gradient-primary hover:shadow-glow hover:scale-110 transition-all duration-200 cursor-pointer">
            <Search className="w-4 h-4 text-muted-foreground hover:text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-accent rounded-xl flex items-center justify-center hover:bg-gradient-primary hover:shadow-glow hover:scale-110 transition-all duration-200 cursor-pointer">
            <Brain className="w-4 h-4 text-muted-foreground hover:text-white" />
          </div>
          <div className="w-8 h-8 bg-gradient-accent rounded-xl flex items-center justify-center hover:bg-gradient-primary hover:shadow-glow hover:scale-110 transition-all duration-200 cursor-pointer">
            <Settings className="w-4 h-4 text-muted-foreground hover:text-white" />
          </div>
          
          <div className="flex-1"></div>
          
          <div className="w-8 h-8 bg-gradient-accent rounded-xl flex items-center justify-center hover:bg-gradient-primary hover:shadow-glow hover:scale-110 transition-all duration-200 cursor-pointer">
            <User className="w-4 h-4 text-muted-foreground hover:text-white" />
          </div>
        </div>

        {/* Left Panel - File Explorer */}
        <div className="w-80 bg-sidebar border-r border-border/50 shadow-soft">
          <FileExplorer />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-editor-background">
          <EditorArea />
        </div>

        {/* Right Panel - AI Chat */}
        <div className="w-96 bg-sidebar shadow-elevated">
          <ChatPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
}