
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User, 
  Menu, 
  X,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Zap,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { NAV_ITEMS, MOCK_SESSIONS, VOICE_PRESETS } from './constants';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Presets from './pages/Presets';

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggle}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tight">Glaido</span>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && toggle()}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group
                    ${isActive 
                      ? 'bg-indigo-600/10 text-indigo-400 font-medium' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'}
                  `}
                >
                  <span className={`${isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto border-t border-zinc-800">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-all">
              <LogOut size={20} className="text-zinc-500" />
              <span>Logout</span>
            </button>
            <div className="mt-4 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                  JD
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium truncate">John Doe</p>
                  <p className="text-xs text-zinc-500 truncate">Pro Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Quick search... (⌘ K)"
            className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950"></span>
        </button>
        <div className="h-8 w-[1px] bg-zinc-800 mx-1"></div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
          <Plus size={16} />
          <span>New Session</span>
        </button>
      </div>
    </header>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-[#09090b]">
        <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/logs" element={<Logs />} />
              <Route path="/presets" element={<Presets />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
