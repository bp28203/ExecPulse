import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, Moon, Sun, Menu, X } from 'lucide-react';

export default function RootLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const NavItem = ({ label, onClick, active = false }) => (
    <button 
      onClick={onClick}
      className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors ${
        active 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {label}
    </button>
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {navigate('/'); setMobileMenuOpen(false);}}>
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-black text-xl uppercase tracking-tighter text-slate-900 dark:text-white">EXECUTIVE EDGE</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <NavItem label="Home" onClick={() => navigate('/')} active={isActive('/')} />
            <NavItem label="Price" onClick={() => navigate('/price')} active={isActive('/price')} />
            <NavItem label="How It Works" onClick={() => navigate('/how-it-works')} active={isActive('/how-it-works')} />
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-100 transition-all hover:scale-105 active:scale-95 mr-2"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => navigate('/login')}
              className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors ${isActive('/login') ? 'text-blue-600' : 'text-slate-900 dark:text-white hover:text-blue-600'}`}
            >
              Log In
            </button>

            <button 
              onClick={() => navigate('/app')}
              className="ml-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Start for Free
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
            <button onClick={() => {navigate('/'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Home</button>
            <button onClick={() => {navigate('/price'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Price</button>
            <button onClick={() => {navigate('/how-it-works'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">How It Works</button>
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
              <button onClick={() => {navigate('/login'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Log In</button>
              <button 
                onClick={() => {navigate('/app'); setMobileMenuOpen(false);}}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest text-center block"
              >
                Start for Free
              </button>
            </div>
          </div>
        )}
      </nav>
      <main className="pt-20">
        {children}
      </main>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>
    </div>
  );
}
