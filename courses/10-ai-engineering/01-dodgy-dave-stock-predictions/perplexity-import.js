import Perplexity from '@perplexity-ai/perplexity_ai';

const client = new Perplexity({
    apiKey: import.meta.env.VITE_PERPLEXITY_API_KEY,
});

async function main() {
    const search = await client.search.create({
        query: "latest AI developments 2024",
        maxResults: 5,
        maxTokensPerPage: 2048
    });

    for (const result of search.results) {
        console.log(`${result.title}: ${result.url}`);
    }
}

main();