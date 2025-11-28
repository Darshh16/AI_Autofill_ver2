import React from 'react';
import { Settings, User, FileText } from 'lucide-react';

export function Layout({ children, activeTab, onTabChange }) {
    return (
        <div className="w-[400px] h-[600px] bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-10">
                <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <span className="text-primary">✨</span> AI Form Filler
                </h1>
                <nav className="flex gap-1">
                    <button
                        onClick={() => onTabChange('profiles')}
                        className={`p-2 rounded-lg transition-colors ${activeTab === 'profiles' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
                        title="Profiles"
                    >
                        <User size={20} />
                    </button>
                    <button
                        onClick={() => onTabChange('settings')}
                        className={`p-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}
                        title="Settings"
                    >
                        <Settings size={20} />
                    </button>
                </nav>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                {children}
            </main>
        </div>
    );
}
