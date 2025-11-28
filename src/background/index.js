import { AIService } from '../services/ai';
import { StorageService } from '../services/storage';

console.log('Background service worker started');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'FILL_FORM') {
        handleFillForm(request.payload)
            .then(response => sendResponse({ success: true, data: response }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep channel open for async response
    }

    if (request.type === 'GET_ACTIVE_PROFILE') {
        getActiveProfile()
            .then(response => sendResponse({ success: true, data: response }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep channel open for async response
    }
});

async function handleFillForm({ formFields }) {
    const activeId = await StorageService.getActiveProfileId();
    if (!activeId) {
        throw new Error('No active profile selected');
    }

    const profiles = await StorageService.getProfiles();
    const profile = profiles.find(p => p.id === activeId);

    if (!profile) {
        throw new Error('Active profile not found');
    }

    const mapping = await AIService.getCompletion(profile, formFields);
    return mapping;
}

async function getActiveProfile() {
    const activeId = await StorageService.getActiveProfileId();
    if (!activeId) {
        throw new Error('No active profile selected');
    }

    const profiles = await StorageService.getProfiles();
    const profile = profiles.find(p => p.id === activeId);

    if (!profile) {
        throw new Error('Active profile not found');
    }

    return profile;
}
