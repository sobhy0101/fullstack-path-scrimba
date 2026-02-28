import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY_RAG,
  dangerouslyAllowBrowser: true
});

/*
  Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/

const content = [
  "The quick brown fox jumped over the lazy dog",
  "I am Sam. Sam I am.",
  "Green eggs and ham.  I do not like them, Sam-I-am."
];

async function main() {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: content,
    encoding_format: "float",
  });

  console.log(embedding.data[0], embedding.data);
}

main();
