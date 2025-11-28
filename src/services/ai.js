import { StorageService } from './storage';

export const AIService = {
    async getCompletion(profile, formFields) {
        const apiKey = await StorageService.getGroqApiKey();
        if (!apiKey) {
            throw new Error('Groq API Key not found');
        }

        const systemPrompt = `You are an expert AI form-filling assistant specializing in job applications and professional forms.

Your task is to intelligently fill form fields using the user's profile and resume data.

User Profile:
${JSON.stringify(profile, null, 2)}

Resume Content:
${profile.resumeText || 'No resume provided.'}

INSTRUCTIONS:

1. SIMPLE FIELDS (name, email, phone, address, etc.):
   - Fill with exact values from the profile
   - Use proper formatting

2. OPEN-ENDED TEXT FIELDS (cover letters, motivations, experience descriptions):
   - Analyze the field label, placeholder, and type to understand what's being asked
   - Generate professional, relevant responses (2-4 sentences)
   - For "Why do you want to join" questions: Express genuine interest, mention relevant skills
   - For "Experience" fields: Summarize relevant experience from resume
   - For "Message to hiring manager": Write a brief, professional introduction
   - For "Achievements": Highlight key accomplishments from resume
   - Keep responses concise but meaningful (50-150 words)

3. FIELD MATCHING:
   - Match fields by 'id', 'name', 'label', or 'placeholder'
   - Be flexible with field names (e.g., "fullName" = "full-name" = "name")

4. OUTPUT FORMAT:
   - Return ONLY a JSON object
   - Keys: field 'id' or 'name' (whichever is provided)
   - Values: the content to fill
   - For fields you can't fill, omit them (don't include null/empty)
   - NO markdown formatting, NO explanations

5. TONE:
   - Professional and confident
   - Enthusiastic but not overly casual
   - Tailored to the specific question

Example for "Why do you want to join our company?":
"I am excited about the opportunity to contribute my skills in [relevant skill] to your team. With [X years] of experience in [field], I believe I can add significant value to your organization. I am particularly drawn to your company's commitment to [relevant value/mission]."`;

        const userMessage = `Form Fields to Fill:
${JSON.stringify(formFields, null, 2)}

Analyze each field carefully. For simple fields, use exact profile data. For open-ended text fields, generate appropriate professional responses.

Return the JSON mapping now.`;

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage }
                    ],
                    model: 'llama-3.3-70b-versatile',
                    temperature: 0.7,
                    response_format: { type: 'json_object' }
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Groq API Error');
            }

            const completion = await response.json();
            return JSON.parse(completion.choices[0].message.content);
        } catch (error) {
            console.error('Groq API Error:', error);
            throw error;
        }
    }
};
