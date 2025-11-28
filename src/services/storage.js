const STORAGE_KEYS = {
    PROFILES: 'profiles',
    ACTIVE_PROFILE_ID: 'activeProfileId',
    GROQ_API_KEY: 'groqApiKey',
};

export const StorageService = {
    async getProfiles() {
        const result = await chrome.storage.local.get(STORAGE_KEYS.PROFILES);
        return result[STORAGE_KEYS.PROFILES] || [];
    },

    async saveProfile(profile) {
        const profiles = await this.getProfiles();
        const existingIndex = profiles.findIndex(p => p.id === profile.id);

        if (existingIndex >= 0) {
            profiles[existingIndex] = profile;
        } else {
            profiles.push(profile);
        }

        await chrome.storage.local.set({ [STORAGE_KEYS.PROFILES]: profiles });
        return profile;
    },

    async deleteProfile(id) {
        const profiles = await this.getProfiles();
        const newProfiles = profiles.filter(p => p.id !== id);
        await chrome.storage.local.set({ [STORAGE_KEYS.PROFILES]: newProfiles });
    },

    async getActiveProfileId() {
        const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_PROFILE_ID);
        return result[STORAGE_KEYS.ACTIVE_PROFILE_ID];
    },

    async setActiveProfileId(id) {
        await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_PROFILE_ID]: id });
    },

    async getGroqApiKey() {
        const result = await chrome.storage.local.get(STORAGE_KEYS.GROQ_API_KEY);
        return result[STORAGE_KEYS.GROQ_API_KEY];
    },

    async setGroqApiKey(key) {
        await chrome.storage.local.set({ [STORAGE_KEYS.GROQ_API_KEY]: key });
    }
};
