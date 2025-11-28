import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';

export function Settings() {
    const [apiKey, setApiKey] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        StorageService.getGroqApiKey().then(key => {
            if (key) setApiKey(key);
        });
    }, []);

    const handleSave = async () => {
        await StorageService.setGroqApiKey(apiKey);
        setStatus('Saved!');
        setTimeout(() => setStatus(''), 2000);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-800">Settings</h2>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Groq API Key
                </label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="gsk_..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <p className="text-xs text-slate-500 mt-2">
                    Required for AI features. Get one at <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">console.groq.com</a>
                </p>
            </div>

            <button
                onClick={handleSave}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 active:scale-[0.98] transition-all shadow-sm shadow-blue-500/20"
            >
                {status || 'Save Settings'}
            </button>
        </div>
    );
}
