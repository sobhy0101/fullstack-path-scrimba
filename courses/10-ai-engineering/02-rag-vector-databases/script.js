import { openai, supabase } from './config.js';
import podcasts from './content.js';

async function main(input) {
  const data = await Promise.all(
    input.map( async (textChunk) => {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: textChunk
        });
        return { 
          content: textChunk, 
          embedding: embeddingResponse.data[0].embedding 
        }
    })
  );
  
  // Insert content and embedding into Supabase
  await supabase.from('documents').insert(data); 
  console.log('Embedding and storing complete!');
}

// Make main accessible globally for manual testing
window.main = main;
window.podcasts = podcasts;

// Comment out to prevent auto-run on page load
// main(podcasts)

// Test code - uncomment to verify vector dimensions
/*
const { data } = await supabase
  .from('documents')
  .select('embedding')
  .eq('id', 6)
  .single();

// Parse the vector string to an array
const embeddingArray = JSON.parse(data.embedding);
console.log('Vector dimensions:', embeddingArray.length); // Should be 1536
console.log('String length:', data.embedding.length);     // 19477 characters
*/