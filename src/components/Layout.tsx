import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Bell, 
  ChevronDown, 
  Search,
  Briefcase,
  Layers,
  ClipboardList,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              犀
            </div>
            <span className="font-bold text-lg tracking-tight">犀牛后台管理系统</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {['CRM', '服务', '教务', '财务', '课表', '组织资源'].map((item, index) => (
              <button 
                key={item}
                className={cn(
                  "px-4 py-4 text-sm font-medium border-b-2 transition-colors",
                  index === 0 
                    ? "border-blue-600 text-blue-600" 
                    : "border-transparent text-slate-600 hover:text-slate-900"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-700">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-6 shrink-0 z-40">
          {[
            { icon: Briefcase, label: '业绩', active: true },
            { icon: Layers, label: '资源' },
            { icon: Target, label: '线索' },
            { icon: ClipboardList, label: '登记' },
          ].map((item) => (
            <button 
              key={item.label}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-14",
                item.active 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
