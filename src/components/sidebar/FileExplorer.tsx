import { 
  ChevronDown, 
  ChevronRight, 
  File, 
  Folder, 
  FolderOpen, 
  Plus, 
  MoreHorizontal,
  Search,
  Filter,
  RefreshCw,
  Star,
  Clock,
  FileCheck,
  FileX
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  isOpen?: boolean;
  status?: 'draft' | 'review' | 'approved' | 'rejected';
  lastModified?: Date;
  size?: string;
  isStarred?: boolean;
}

const mockFiles: FileItem[] = [
  {
    name: "智慧城市建设项目",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "招标文件",
        type: "folder",
        children: [
          { 
            name: "招标公告.md", 
            type: "file", 
            status: "approved",
            lastModified: new Date(),
            size: "12KB"
          },
          { 
            name: "技术要求.md", 
            type: "file", 
            status: "review",
            lastModified: new Date(),
            size: "28KB",
            isStarred: true
          },
        ]
      },
      {
        name: "投标文件",
        type: "folder",
        isOpen: true,
        children: [
          { 
            name: "商务标.md", 
            type: "file", 
            status: "draft",
            lastModified: new Date(),
            size: "15KB"
          },
          { 
            name: "技术标.md", 
            type: "file", 
            status: "review",
            lastModified: new Date(),
            size: "45KB",
            isStarred: true
          },
          { 
            name: "资质文件.md", 
            type: "file", 
            status: "approved",
            lastModified: new Date(),
            size: "8KB"
          },
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

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'approved': return <FileCheck className="w-3 h-3 text-green-500" />;
      case 'rejected': return <FileX className="w-3 h-3 text-destructive" />;
      case 'review': return <Clock className="w-3 h-3 text-amber-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'approved': return <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">已审批</Badge>;
      case 'rejected': return <Badge variant="destructive" className="text-xs">已拒绝</Badge>;
      case 'review': return <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">审核中</Badge>;
      case 'draft': return <Badge variant="outline" className="text-xs">草稿</Badge>;
      default: return null;
    }
  };

  return (
    <div>
      <div 
        className={`group flex items-center py-2 px-2 hover:bg-hover cursor-pointer text-sm transition-colors rounded-sm mx-1`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleToggle}
      >
        <div className="flex items-center flex-1 min-w-0">
          {item.type === 'folder' ? (
            <>
              {isOpen ? (
                <ChevronDown className="w-3 h-3 mr-2 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronRight className="w-3 h-3 mr-2 text-muted-foreground flex-shrink-0" />
              )}
              {isOpen ? (
                <FolderOpen className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
              ) : (
                <Folder className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
              )}
            </>
          ) : (
            <>
              <div className="w-5 mr-2 flex justify-center">
                {getStatusIcon(item.status)}
              </div>
              <File className="w-4 h-4 mr-2 text-muted-foreground flex-shrink-0" />
            </>
          )}
          
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <span className="text-foreground truncate">{item.name}</span>
            {item.isStarred && <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />}
          </div>
        </div>

        {item.type === 'file' && (
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {item.size && (
              <span className="text-xs text-muted-foreground">{item.size}</span>
            )}
            {getStatusBadge(item.status)}
          </div>
        )}
      </div>
      
      {item.type === 'folder' && isOpen && item.children && (
        <div className="ml-2">
          {item.children.map((child, index) => (
            <FileTreeItem key={index} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="h-full flex flex-col bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-sidebar-foreground">项目资源</h3>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <Plus className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <RefreshCw className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <Filter className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-sidebar-accent">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索文件..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 h-8 text-xs bg-sidebar-accent border-sidebar-border focus:border-sidebar-primary"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {mockFiles.map((file, index) => (
          <FileTreeItem key={index} item={file} />
        ))}
      </div>

      <div className="p-3 border-t border-sidebar-border text-xs text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>15 个文件</span>
          <span>总计 108KB</span>
        </div>
      </div>
    </div>
  );
}