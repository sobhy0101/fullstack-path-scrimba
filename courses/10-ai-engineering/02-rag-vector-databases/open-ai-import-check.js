import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
})


console.log("Listing models...");

const models = await openai.models.list();
console.log("Available models:");
for (const model of models.data) {
  console.log(`- ${model.id}`);
}