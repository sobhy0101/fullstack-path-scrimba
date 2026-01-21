import { OpenAI } from "openai"

const outputImg = document.getElementById('output-img')

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

document.getElementById("submit-btn").addEventListener("click", () => {
    const prompt = document.getElementById("instruction").value
    generateImage(prompt)
})

async function generateImage(prompt) {
    const response = await openai.images.generate({
        model: 'dall-e-3', // default dall-e-2. Dall 2 is cheaper, but lower quality. It doesn't use style or response_format params.
        prompt: prompt, //required
        n: 1, //default 1 
        size: '1024x1024', //default 1024x1024
        style: 'natural', //default vivid (other option: natural)
        response_format: 'b64_json' //default url. Using url will only keep the image for one hour. Using b64_json will return a base64 encoded string of the image that browsers can render directly. Note that b64_json responses are much larger.
    })
    console.log(response)
    outputImg.innerHTML = `<img src="data:image/png;base64,${response.data[0].b64_json}" alt="The Image API Failed">`
}

//A 16th-century woman with long brown hair standing in front of a green vista with cloudy skies. She's looking at the viewer with a faint smile on her lips.

/* {
    "created": 1768986023,
    "data": [
        {
            "revised_prompt": "A 16th-century Caucasian woman with long, black, brownish hair standing in front of a lush, green landscape under cloudy skies. She is posing with a serene and faint smile on her lips as she gazes directly at the viewer, reflecting a quiet confidence and grace often associated with women of her era.",
            "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-qtYpSFNWsxkQpdoc4jRjQi5n/user-G8Hy52n6IJaEfGiFZdDz2OdS/img-Y90SdeA9BY7S3BBbiOy1tlI3.png?st=2026-01-21T08%3A00%3A23Z&se=2026-01-21T10%3A00%3A23Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=32836cae-d25f-4fe9-827b-1c8c59c442cc&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-01-21T07%3A03%3A59Z&ske=2026-01-22T07%3A03%3A59Z&sks=b&skv=2024-08-04&sig=oWVzMynu9r9n7KCsL59INVT0JFNcpechCf3iVzNb5lI%3D"
        }
    ]
}
*/