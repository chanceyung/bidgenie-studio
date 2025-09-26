import { FileExplorer } from "../sidebar/FileExplorer";
import { EditorArea } from "../editor/EditorArea";
import { ChatPanel } from "../chat/ChatPanel";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";

export function AppLayout() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <TopBar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-activity-bar border-r border-border flex flex-col items-center py-2">
          <div className="w-6 h-6 bg-primary rounded-sm mb-2"></div>
          <div className="w-6 h-6 bg-muted rounded-sm mb-2"></div>
          <div className="w-6 h-6 bg-muted rounded-sm"></div>
        </div>

        {/* Left Panel - File Explorer */}
        <div className="w-80 bg-sidebar border-r border-border">
          <FileExplorer />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          <EditorArea />
        </div>

        {/* Right Panel - AI Chat */}
        <div className="w-96 bg-sidebar border-l border-border">
          <ChatPanel />
        </div>
      </div>

      <StatusBar />
    </div>
  );
}