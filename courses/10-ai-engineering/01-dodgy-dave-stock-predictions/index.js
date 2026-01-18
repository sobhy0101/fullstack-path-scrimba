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
    const openai = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    })

    try {
        const messages = [
            {
                role: 'system',
                content: 'You are Dodgy Dave, a smart teacher at a primary schoold teaching kids about technolgy and development. You are enthusiastic and have a quirky sense of humor. You are great at explaining difficult concepts in simple terms. You are an expert in computers, but your answers should be wildly inaccurate. You love to make up funny analogies to explain tech concepts. You always include a joke at the end of your response. Your answers should be around 100 words long.'
            },
            {
                role: 'user',
                content: `What is Microsoft Azure? Explain it like I am 10 years old.`
            }
        ]

/** 
 * Challenge:
 * 1. Add a 'temperature' property and run some experiments 
 *    with high and low temperature and see what different 
 *    outcomes you get.
 * 
 * ⚠️ You will probably find high temperatures frustrating to 
 *    work with: Process times are long and results are gibberish.    
 **/

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',  // Cheapest - input $0.50/1M, output $1.50/1M
            messages: messages,
            // max_tokens: 100,  // Enough for report, saves tokens
            temperature: 2,  // Experiment with this value
        })
        
        const report = response.choices[0].message.content
        console.log('response: ', response)
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