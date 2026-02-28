import { openai, supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

console.log('Challenge Loaded!');

/*
  Challenge: Text Splitters, Embeddings, and Vector Databases!
    1. Use LangChain to split the content in movies.txt into smaller chunks.
    2. Use OpenAI's Embedding model to create an embedding for each chunk.
    3. Insert all text chunks and their corresponding embedding
       into a Supabase database table.
 */

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */
async function splitDocument() {
  try {
    const response = await fetch('movies.txt');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const text = await response.text();
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const output = await splitter.createDocuments([text]);
    console.log(`✅ Split into ${output.length} chunks`);
    return output;
  } catch (error) {
    console.error('There was an issue with splitting text.');
    throw error;
  }
}


/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
async function createAndStoreEmbeddings() {
  try {
    // Check if data already exists
    const { data: existingData, error: checkError } = await supabase
      .from('movies')
      .select('id')
      .limit(1);
    
    if (checkError) {
      throw new Error('Issue checking existing data.');
    }
    
    if (existingData && existingData.length > 0) {
      console.log('⚠️ Data already exists in the table. Skipping insertion.');
      return;
    }
    
    const chunkData = await splitDocument();
    console.log('🔄 Creating embeddings...');
    
    // Batch create all embeddings
    const data = await Promise.all(
      chunkData.map(async (chunk, index) => {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: chunk.pageContent,
        });
        console.log(`📝 Embedded chunk ${index + 1}/${chunkData.length}`);
        return {
          description: chunk.pageContent,
          embedding: embeddingResponse.data[0].embedding,
        };
      })
    );
    
    console.log('💾 Inserting data into Supabase...');
    const { error } = await supabase.from('movies').insert(data);
    if (error) {
      throw new Error('Issue inserting data into the database.');
    }
    console.log('✅ SUCCESS! All embeddings stored.');
  } catch (error) {
    console.error('❌ ERROR: ' + error.message);
  }
}

const runButton = document.getElementById('run-embeddings');
if (runButton) {
  runButton.addEventListener('click', () => {
    createAndStoreEmbeddings();
  });
}