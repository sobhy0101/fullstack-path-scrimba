// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true,
// })


// console.log("Listing models...");

// const models = await openai.models.list();
// console.log("Available models:");
// for (const model of models.data) {
//   console.log(`- ${model.id}`);
// }

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY_FUND,
    dangerouslyAllowBrowser: true,
});

async function testOpenAI() {
    console.log("🚀 Testing OpenAI API...");
    
    try {
        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: "Write a short poem about the stock market in 4 lines.",
        });
        
        console.log("✅ Success!", response.output_text);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

// Only run when button is clicked, not on page load
document.getElementById('test-openai-btn')?.addEventListener('click', testOpenAI);