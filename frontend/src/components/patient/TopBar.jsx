import React from "react";
import { Bell , UserCircle2 } from "lucide-react";

function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
      <div className="md:hidden">
        {/* Placeholder if you want a mobile sidebar toggle later */}
        <button className="p-2 rounded-lg border border-slate-200">
          <span className="sr-only">Open sidebar</span>
          <div className="w-4 h-0.5 bg-slate-700 mb-1" />
          <div className="w-4 h-0.5 bg-slate-700 mb-1" />
          <div className="w-4 h-0.5 bg-slate-700" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600">
          <span className="sr-only">Notifications</span>
          <Bell size={20} className="stroke-[1.8]" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Rajesh Kumar</p>
            <p className="text-xs text-slate-500">Patient</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-300 overflow-hidden">
            {/* avatar placeholder */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
