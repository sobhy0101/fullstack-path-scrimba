import OpenAI from 'openai'

const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
})

/**
 * Challenge:
 * 1. Ask OpenAI to explain something complicated 
 *    to you. For example Quantum Computing.
 * 
 * Prompt Engineering Stretch Goals
 * - See if you can control the level of complexity of 
 *   the generated content, for example is this for 
 *   10-year-olds or college kids?
 * - See if you can control the length of the output.
 * 
 * These are the steps you will need:
    1. Create a new instance of OpenAi remembering to set dangerouslyAllowBrowser
    2. Set up an API call using the correct endpoint chat.completions.create
    3. Create system and user objects in a messages array.
    4. Log out what you get back.
 * **/ 

async function testOpenAI() {
    console.log("🚀 Testing OpenAI API...");
    
    try {
        const messages = [
            {
                role: 'system',
                content: 'You are a helpful a Quantum Computing explainer genuis. Your answers must be less than 100 words long.'
            },
            {
                role: 'user',
                content: 'Explain Quantum Computing to me like I am a 10-year-old.'
            }
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-5-nano-2025-08-07',
            messages: messages
        })
        
        const poem = response.choices[0].message.content
        console.log("✅ Success!", poem);
        document.getElementById('api-response-output').textContent = poem
    } catch (error) {
        console.error("❌ Error:", error.message);
        document.getElementById('api-response-output').textContent = `Error: ${error.message}`
    }
}

document.getElementById('test-openai-btn').addEventListener('click', testOpenAI)
