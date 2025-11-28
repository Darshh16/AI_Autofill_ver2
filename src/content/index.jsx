import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { Sparkles, Loader2, UserPlus } from 'lucide-react';
import '../index.css';

function FloatingButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    const handleAIFill = async () => {
        setLoading(true);
        setStatus('Scanning...');
        setShowMenu(false);

        try {
            // 1. Scan fields
            const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
            const visibleInputs = inputs.filter(input => {
                return input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button' && input.style.display !== 'none';
            });

            if (visibleInputs.length === 0) {
                setStatus('No fields found');
                return;
            }

            const formFields = visibleInputs.map(input => ({
                id: input.id,
                name: input.name,
                type: input.type,
                placeholder: input.placeholder,
                label: getLabel(input),
            }));

            setStatus('Thinking...');

            // 2. Send to AI
            const response = await chrome.runtime.sendMessage({
                type: 'FILL_FORM',
                payload: { formFields }
            });

            if (!response.success) {
                throw new Error(response.error);
            }

            // 3. Fill fields
            setStatus('Filling...');
            const mapping = response.data;

            visibleInputs.forEach(input => {
                const key = input.id || input.name;
                if (mapping[key]) {
                    input.value = mapping[key];
                    // Trigger events
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            setStatus('Done!');
        } catch (err) {
            console.error('AI Fill Error:', err);
            // Show specific error message
            if (err.message.includes('No active profile')) {
                setStatus('No profile!');
            } else if (err.message.includes('API Key')) {
                setStatus('No API key!');
            } else {
                setStatus(err.message || 'Error');
            }
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(''), 5000);
        }
    };

    const handleManualFill = async () => {
        setLoading(true);
        setStatus('Loading...');
        setShowMenu(false);

        try {
            // Get active profile
            const response = await chrome.runtime.sendMessage({
                type: 'GET_ACTIVE_PROFILE'
            });

            if (!response.success) {
                throw new Error(response.error);
            }

            const profile = response.data;

            // Scan fields
            const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
            const visibleInputs = inputs.filter(input => {
                return input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button' && input.style.display !== 'none';
            });

            if (visibleInputs.length === 0) {
                setStatus('No fields found');
                return;
            }

            // Simple field mapping based on common patterns
            const fieldMapping = {
                name: profile.name,
                fullname: profile.name,
                'full-name': profile.name,
                'full_name': profile.name,
                firstname: profile.name?.split(' ')[0],
                'first-name': profile.name?.split(' ')[0],
                'first_name': profile.name?.split(' ')[0],
                lastname: profile.name?.split(' ').slice(1).join(' '),
                'last-name': profile.name?.split(' ').slice(1).join(' '),
                'last_name': profile.name?.split(' ').slice(1).join(' '),
                email: profile.email,
                'e-mail': profile.email,
                mail: profile.email,
                phone: profile.phone,
                telephone: profile.phone,
                mobile: profile.phone,
                tel: profile.phone,
                address: profile.address,
                street: profile.address,
                'street-address': profile.address,
                'street_address': profile.address,
                city: profile.city,
                state: profile.state,
                province: profile.state,
                zip: profile.zipCode,
                zipcode: profile.zipCode,
                'zip-code': profile.zipCode,
                'zip_code': profile.zipCode,
                postal: profile.zipCode,
                'postal-code': profile.zipCode,
                'postal_code': profile.zipCode,
                country: profile.country,
                website: profile.website,
                linkedin: profile.linkedin,
                github: profile.github,
            };

            let filledCount = 0;

            visibleInputs.forEach(input => {
                const fieldName = (input.name || input.id || input.placeholder || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const label = getLabel(input).toLowerCase().replace(/[^a-z0-9]/g, '');

                // Try to match by name, id, or label
                for (const [key, value] of Object.entries(fieldMapping)) {
                    if (value && (fieldName.includes(key) || label.includes(key))) {
                        input.value = value;
                        input.dispatchEvent(new Event('input', { bubbles: true }));
                        input.dispatchEvent(new Event('change', { bubbles: true }));
                        filledCount++;
                        break;
                    }
                }
            });

            setStatus(`Filled ${filledCount} fields!`);
        } catch (err) {
            console.error('Manual Fill Error:', err);
            if (err.message.includes('No active profile')) {
                setStatus('No profile!');
            } else {
                setStatus(err.message || 'Error');
            }
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999] font-sans">
            {showMenu && (
                <div className="mb-2 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
                    <button
                        onClick={handleAIFill}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-blue-50 transition-colors text-left text-slate-700"
                    >
                        <Sparkles size={18} className="text-blue-600" />
                        <div>
                            <div className="font-medium text-sm">AI Fill</div>
                            <div className="text-xs text-slate-500">Smart field mapping</div>
                        </div>
                    </button>
                    <button
                        onClick={handleManualFill}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-green-50 transition-colors text-left text-slate-700 border-t border-slate-100"
                    >
                        <UserPlus size={18} className="text-green-600" />
                        <div>
                            <div className="font-medium text-sm">Manual Fill</div>
                            <div className="text-xs text-slate-500">Pattern-based matching</div>
                        </div>
                    </button>
                </div>
            )}

            <button
                onClick={() => setShowMenu(!showMenu)}
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95 font-medium border border-blue-500 min-w-[120px] justify-center"
            >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                {status || 'Fill Form'}
            </button>
        </div>
    );
}

function getLabel(input) {
    if (input.labels && input.labels.length > 0) {
        return input.labels[0].innerText;
    }
    // Try finding label by for attribute
    if (input.id) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) return label.innerText;
    }
    // Try closest label parent
    const parentLabel = input.closest('label');
    if (parentLabel) return parentLabel.innerText;

    return '';
}

// Mount React Root
const root = document.createElement('div');
root.id = 'ai-form-filler-root';
document.body.appendChild(root);
createRoot(root).render(<FloatingButton />);
