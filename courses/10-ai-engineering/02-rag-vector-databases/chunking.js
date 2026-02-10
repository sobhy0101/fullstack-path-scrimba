import { CharacterTextSplitter } from "@langchain/textsplitters";

// LangChain text splitter
async function splitDocument() {
  const response = await fetch('podcasts.txt');
  const text = await response.text();
  console.log(text);
}
splitDocument()