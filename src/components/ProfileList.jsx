import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Check } from 'lucide-react';
import { StorageService } from '../services/storage';

export function ProfileList({ onEdit }) {
    const [profiles, setProfiles] = useState([]);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = async () => {
        const list = await StorageService.getProfiles();
        setProfiles(list);
        const active = await StorageService.getActiveProfileId();
        setActiveId(active);
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (confirm('Delete this profile?')) {
            await StorageService.deleteProfile(id);
            loadProfiles();
        }
    };

    const handleSelect = async (id) => {
        await StorageService.setActiveProfileId(id);
        setActiveId(id);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">Profiles</h2>
                <button
                    onClick={() => onEdit(null)}
                    className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                    <Plus size={16} /> New
                </button>
            </div>

            <div className="space-y-2">
                {profiles.length === 0 && (
                    <div className="text-center py-8 text-slate-400 bg-slate-100 rounded-xl border border-dashed border-slate-300">
                        No profiles yet. Create one to get started!
                    </div>
                )}

                {profiles.map(profile => (
                    <div
                        key={profile.id}
                        onClick={() => handleSelect(profile.id)}
                        className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${activeId === profile.id
                                ? 'bg-primary/5 border-primary shadow-sm'
                                : 'bg-white border-slate-200 hover:border-primary/50'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-800">{profile.name}</h3>
                                <p className="text-sm text-slate-500">{profile.email}</p>
                            </div>

                            {activeId === profile.id && (
                                <div className="bg-primary text-white p-1 rounded-full">
                                    <Check size={14} />
                                </div>
                            )}
                        </div>

                        <div className="absolute right-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(profile); }}
                                className="p-1.5 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={(e) => handleDelete(e, profile.id)}
                                className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
