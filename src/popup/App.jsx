import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Settings } from '../components/Settings';
import { ProfileList } from '../components/ProfileList';
import { ProfileEditor } from '../components/ProfileEditor';

function App() {
    const [activeTab, setActiveTab] = useState('profiles');
    const [editingProfile, setEditingProfile] = useState(undefined); // undefined = list, null = new, object = edit

    const handleEdit = (profile) => {
        setEditingProfile(profile);
    };

    const handleSave = () => {
        setEditingProfile(undefined);
    };

    const renderContent = () => {
        if (activeTab === 'settings') {
            return <Settings />;
        }

        if (editingProfile !== undefined) {
            return (
                <ProfileEditor
                    profile={editingProfile}
                    onSave={handleSave}
                    onCancel={() => setEditingProfile(undefined)}
                />
            );
        }

        return <ProfileList onEdit={handleEdit} />;
    };

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </Layout>
    );
}

export default App;
