import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  isOpen?: boolean;
}

const mockFiles: FileItem[] = [
  {
    name: "标书项目",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "招标文件",
        type: "folder",
        children: [
          { name: "招标公告.md", type: "file" },
          { name: "技术要求.md", type: "file" },
        ]
      },
      {
        name: "投标文件",
        type: "folder",
        isOpen: true,
        children: [
          { name: "商务标.md", type: "file" },
          { name: "技术标.md", type: "file" },
          { name: "资质文件.md", type: "file" },
        ]
      },
      { name: "模板库", type: "folder" },
      { name: "参考资料", type: "folder" },
    ]
  }
];

function FileTreeItem({ item, level = 0 }: { item: FileItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(item.isOpen || false);

  const handleToggle = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center py-1 px-2 hover:bg-hover cursor-pointer text-sm`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleToggle}
      >
        {item.type === 'folder' ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-3 h-3 mr-1 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-3 h-3 mr-1 text-muted-foreground" />
            )}
            {isOpen ? (
              <FolderOpen className="w-4 h-4 mr-2 text-primary" />
            ) : (
              <Folder className="w-4 h-4 mr-2 text-primary" />
            )}
          </>
        ) : (
          <>
            <div className="w-4 mr-1"></div>
            <File className="w-4 h-4 mr-2 text-muted-foreground" />
          </>
        )}
        <span className="text-foreground">{item.name}</span>
      </div>
      
      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground">资源管理器</h3>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {mockFiles.map((file, index) => (
          <FileTreeItem key={index} item={file} />
        ))}
      </div>
    </div>
  );
}