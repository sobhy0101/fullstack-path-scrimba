// Lesson 1: Chunking Text for Vector Databases

// import { CharacterTextSplitter } from "@langchain/textsplitters";

// // LangChain text splitter
// async function splitDocument() {
//   const response = await fetch('podcasts.txt');
//   const text = await response.text();
//   const splitter = new CharacterTextSplitter({
//     separator: " ", // Split on spaces
//     chunkSize: 150, // Each chunk will have 150 characters
//     chunkOverlap: 15, // Each chunk will overlap with the previous one by 15 characters
//   });
//   const output = await splitter.createDocuments([text]);
//   console.log(output);
// }
// splitDocument()

/*

Choosing a chunk size:
- Depends on the type of content: short content vs. large documents

- Consider the embedding model and its token limits

- User queries: short and specific vs. longer and more detailed

- Consider how you'll use the retrieved results

*/

/* The output will be an array of documents, where each document is a chunk of the original text. Each chunk will have a maximum of 150 characters, and there will be an overlap of 15 characters between consecutive chunks. This means that the last 15 characters of one chunk will be the first 15 characters of the next chunk, ensuring that important context is preserved across chunks. The output will be logged to the console for review. */


// Lesson 2: Chunking with recursive character text splitter

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// LangChain text splitter
async function splitDocument() {
  const response = await fetch('podcasts.txt');
  const text = await response.text();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 15,
  });
  const output = await splitter.createDocuments([text]);
  console.log(output);
}
splitDocument()

/* The RecursiveCharacterTextSplitter will attempt to split the text into chunks of 150 characters with an overlap of 15 characters. However, if it encounters a natural break in the text (like a sentence or paragraph), it will try to split at that point instead, even if it means the chunk size is smaller than 150 characters. This approach helps to preserve the meaning and context of the text while still adhering to the specified chunk size and overlap. The output will be an array of documents, where each document is a chunk of the original text, and it will be logged to the console for review. */

/* The difference between the CharacterTextSplitter and the RecursiveCharacterTextSplitter is that the latter tries to split the text at natural breakpoints (like sentences or paragraphs) rather than just splitting at a fixed character count. This can help preserve the meaning and context of the text, especially for longer documents, while still adhering to the specified chunk size and overlap. The RecursiveCharacterTextSplitter is often more effective for larger documents where maintaining context is important. */

/* **Note**: Shorter chunks capture precise meaning but might miss wider context. Longer chunks grasp more context but can produce a too broad a scope of information. */
