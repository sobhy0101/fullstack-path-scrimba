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
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);

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