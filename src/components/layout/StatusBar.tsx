export function StatusBar() {
  return (
    <div className="h-6 bg-status-bar text-primary-foreground flex items-center px-4 text-xs justify-between">
      <div className="flex items-center space-x-4">
        <span>就绪</span>
        <span>行 1，列 1</span>
        <span>UTF-8</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <span>AI连接状态：正常</span>
        <span>标书项目：未选择</span>
      </div>
    </div>
  );
}