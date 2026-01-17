import { dates } from './utils/dates'
// import './test-polygon-api.js' // TEMP: Testing Massive API
import OpenAI from 'openai'

const tickersArr = []

const generateReportBtn = document.querySelector('.generate-report-btn')

generateReportBtn.addEventListener('click', fetchStockData)

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const tickerInput = document.getElementById('ticker-input')
    if (tickerInput.value.length > 2) {
        generateReportBtn.disabled = false
        const newTickerStr = tickerInput.value
        tickersArr.push(newTickerStr.toUpperCase())
        tickerInput.value = ''
        renderTickers()
    } else {
        const label = document.getElementsByTagName('label')[0]
        label.style.color = 'red'
        label.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
    }
})

function renderTickers() {
    const tickersDiv = document.querySelector('.ticker-choice-display')
    tickersDiv.innerHTML = ''
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement('span')
        newTickerSpan.textContent = ticker
        newTickerSpan.classList.add('ticker')
        tickersDiv.appendChild(newTickerSpan)
    })
}

const loadingArea = document.querySelector('.loading-panel')
const apiMessage = document.getElementById('api-message')

async function fetchStockData() {
    document.querySelector('.action-panel').style.display = 'none'
    loadingArea.style.display = 'flex'
    try {
        const stockData = await Promise.all(tickersArr.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${import.meta.env.VITE_POLYGON_API_SECRET}`
            const response = await fetch(url)
            const data = await response.text()
            const status = await response.status
            if (status === 200) {
                apiMessage.innerText = 'Creating report...'
                return data
            } else {
                loadingArea.innerText = 'There was an error fetching stock data.'
            }
        }))
        fetchReport(stockData.join(''))
    } catch(err) {
        loadingArea.innerText = 'There was an error fetching stock data.'
        console.error('error: ', err)
    }
}

async function fetchReport(data) {
    /** 
 * Challenge:
 * 1. Use the OpenAI API to generate a report advising 
 * on whether to buy or sell the shares based on the data 
 * that comes in as a parameter.
 * 
 * 🎁  Hints:
 * 1. You will need to set up a new instance of OpenAI and remember to set dangerouslyAllowBrowser.
* 2. You will need to call the chat.completions.create endpoint and pass in an array of messages and a model.
* 3. The array of messages needs two objects, both with 'role' and 'content' keys. The 'system' object should hold an instruction. The 'user' object should hold the data that is coming in to fetchReport as a parameter. 
* 4. You might have to experiment with the instructions you give the model to get a report you are happy with. For now, don't worry too much about the quality of the report as we will do some tweaking later. 
* 5. Call renderReport with the text you get back from the OpenAI API.
* 6. For bonus points, use a try catch to handle errors.

 * 
 * 🏆 Bonus points: use a try catch to handle errors.
 * **/

    const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    })

    try {
        const messages = [
            {
                role: 'system',
                content: 'You are a helpful financial advisor. Based on the stock data provided, generate a concise report advising whether to buy, hold, or sell the shares. Keep the report under 200 words.'
            },
            {
                role: 'user',
                content: `Here is the stock data: ${data}`
            }
        ]

        const response = await openai.chat.completions.create({
            model: 'gpt-5-nano-2025-08-07',
            messages: messages
        })

        const report = response.choices[0].message.content
        renderReport(report)
    } catch (error) {
        renderReport(`Error generating report: ${error.message}`)
    }
}

function renderReport(output) {
    loadingArea.style.display = 'none'
    const outputArea = document.querySelector('.output-panel')
    const report = document.createElement('p')
    outputArea.appendChild(report)
    report.textContent = output
    outputArea.style.display = 'flex'
}