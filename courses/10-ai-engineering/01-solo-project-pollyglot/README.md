# PollyGlot - AI Language Translation App

## Solo Project for AI Engineering Course

Welcome to the PollyGlot project! This is a solo project designed for the AI Engineering course, where we build an AI-powered language translation application. PollyGlot leverages advanced natural language processing techniques to provide accurate and context-aware translations between multiple languages.

## 💰 Budget-Conscious Development Plan

**Project Budget**: $1 (~600+ translations with gpt-3.5-turbo)  
**Technology Stack**: Vanilla JavaScript (HTML/CSS/JS)  
**Deployment**: GitHub Pages (frontend) + Vercel Serverless Functions (backend)  
**Supported Languages**: French, Spanish, Arabic, Filipino (Tagalog)

---

## Project Overview

### Core Requirements

- Build it from scratch
- Follow the design. Figma link: [Figma Design](https://www.figma.com/design/Bnh2EcBnqRbRB9vUS47myp/OpenAi-API---PollyGlot--Copy-)
- Make sure you:
  - Setup the OpenAI API
  - Select a model (gpt-3.5-turbo for cost efficiency)
  - Engineer a prompt (minimal token usage)
  - Use temperature (0.3 for consistent translations)
  - Use max_tokens (150 - sufficient for translations with safety buffer)
  - Implement input validation (280 character limit)
  - Add character counter for user feedback
  - Render the completion
- Use vanilla JavaScript (no frameworks)

### Stretch Goals

- Turn into chat app
- Add functionality: Ability to correct mistakes
- ~~Add AI generated images~~ (Excluded to conserve API credits)
- Handle errors
- Deploy (with API key hidden via Vercel serverless function)

---

## 🚀 Recommended Development Workflow

### Week 1: Build UI with Mock Data (0 API Costs)

- Create complete HTML/CSS layout following Figma design
- Implement all UI interactions and animations
- Use mock translation data for testing functionality
- Perfect the user experience without API calls
- **Goal**: Fully functional app with fake data

### Week 2: Integrate OpenAI API (Minimal Testing)

- Set up Vercel serverless function for secure API calls
- Integrate real OpenAI API with cost-optimized settings
- Test with 5-10 real translations to verify functionality
- Implement error handling for API failures
- **Goal**: Working API integration with minimal credit usage

### Final Polish: Production Ready

- Use remaining credits for final testing across all languages
- Deploy to GitHub Pages + Vercel
- Document the project with screenshots
- **Goal**: Portfolio-ready deployed application

---

## 💡 API Cost Optimization Strategies

### 1. Use Cheapest Model

```javascript
model: "gpt-3.5-turbo"  // ~$0.0015 per 1K tokens (60x cheaper than GPT-4)
```

### 2. Keep Prompts Concise

```javascript
// ❌ Wasteful approach (uses ~100 tokens)
const prompt = `You are a professional translator with expertise in multiple languages.
Please carefully translate the following text while preserving its meaning and nuance.
Source text: "${text}"
Target language: ${language}`;

// ✅ Optimized approach (uses ~10-15 tokens)
const prompt = `Translate to ${language}: ${text}`;
```

### 3. Limit max_tokens

```javascript
max_tokens: 150  // Provides buffer for longer translations and special characters
```

### 4. Set Optimal Temperature

```javascript
temperature: 0.3  // Lower = more consistent, deterministic translations
```

### 5. Batch Requests (Future Enhancement)

- For multiple translations, queue them and send together
- Reduces overhead from multiple API calls

---

## 🔒 Efficient Prompt Engineering

### Recommended Prompt Structure

```javascript
const prompt = `Translate to ${language}: ${text}`;
```

**Why this works:**

- Minimal tokens = lower cost
- Clear instruction = accurate results
- No unnecessary context = faster response
- GPT-3.5-turbo understands simple instructions well

### Example Implementation

```javascript
async function getTranslation(text, targetLanguage) {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: `Translate to ${targetLanguage}: ${text}`,
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
      max_tokens: 150
    })
  });
  
  return await response.json();
}
```

---

## ⏱️ Rate Limiting Implementation

### Permanent Rate Limiter (Production Feature)

```javascript
let lastCallTime = 0;
const MIN_INTERVAL = 2000; // 2 seconds between calls

async function translate() {
  const now = Date.now();
  
  if (now - lastCallTime < MIN_INTERVAL) {
    alert('Please wait before translating again');
    return;
  }
  
  lastCallTime = now;
  
  // Proceed with API call
  const translation = await getTranslation(inputText, selectedLanguage);
  displayTranslation(translation);
}
```

**Benefits:**

- Prevents accidental double-clicks
- Protects against API spam
- Improves user experience
- Reduces unnecessary API costs

---

## ✅ Input Validation & Character Limits

### Why Limit Input Length?

With `max_tokens: 150` for API responses, we need to ensure user input doesn't exceed what can be translated:

**Token-to-Character Conversion:**

- 1 token ≈ 4 characters (English average)
- Arabic/RTL languages may use more tokens
- Translations can be longer than source text

**Recommended Limits:**

- **Input limit**: 280 characters (~70 tokens)
- **Output buffer**: 150 tokens (enough for expanded translations)
- **Prompt overhead**: ~10 tokens
- **Total**: Stays well within API limits

### Implementation

```javascript
const MAX_INPUT_LENGTH = 280;

function validateInput(text) {
  if (text.trim().length === 0) {
    alert('Please enter some text to translate');
    return false;
  }
  
  if (text.length > MAX_INPUT_LENGTH) {
    alert(`Please limit input to ${MAX_INPUT_LENGTH} characters (currently ${text.length})`);
    return false;
  }
  
  return true;
}

// Usage in translate function
async function translate() {
  const inputText = document.getElementById('input-text').value;
  const selectedLanguage = document.getElementById('language-select').value;
  
  // Validate before proceeding
  if (!validateInput(inputText)) {
    return;
  }
  
  // Rate limiting check
  const now = Date.now();
  if (now - lastCallTime < MIN_INTERVAL) {
    alert('Please wait before translating again');
    return;
  }
  
  lastCallTime = now;
  
  // Proceed with translation
  const translation = await getTranslation(inputText, selectedLanguage);
  displayTranslation(translation);
}
```

### Character Counter UI

Provide real-time feedback to users:

```javascript
function updateCharacterCount() {
  const input = document.getElementById('input-text');
  const counter = document.getElementById('char-counter');
  const currentLength = input.value.length;
  const remaining = MAX_INPUT_LENGTH - currentLength;
  
  counter.textContent = `${currentLength}/${MAX_INPUT_LENGTH}`;
  
  // Visual feedback when approaching limit
  if (remaining < 50) {
    counter.style.color = '#ff6b6b'; // Red warning
  } else if (remaining < 100) {
    counter.style.color = '#ffa500'; // Orange caution
  } else {
    counter.style.color = '#666'; // Default gray
  }
}

// Add event listener to textarea
document.getElementById('input-text').addEventListener('input', updateCharacterCount);
```

### HTML Structure for Counter

```html
<div class="input-container">
  <textarea 
    id="input-text" 
    maxlength="280" 
    placeholder="Enter text to translate..."
  ></textarea>
  <div class="char-counter-container">
    <span id="char-counter">0/280</span>
  </div>
</div>
```

**Benefits:**
- Prevents truncated translations
- Gives users clear feedback
- Avoids wasted API calls
- Professional UX

---

## 🗂️ Mock Data Structure

Use this during Week 1 development to avoid API costs:

```javascript
const MOCK_TRANSLATIONS = {
  "Hello, how are you?": {
    "French": "Bonjour, comment allez-vous?",
    "Spanish": "Hola, ¿cómo estás?",
    "Arabic": "مرحبا، كيف حالك؟",
    "Filipino": "Kumusta ka?"
  },
  "Good morning!": {
    "French": "Bonjour!",
    "Spanish": "¡Buenos días!",
    "Arabic": "صباح الخير!",
    "Filipino": "Magandang umaga!"
  },
  "Thank you very much": {
    "French": "Merci beaucoup",
    "Spanish": "Muchas gracias",
    "Arabic": "شكرا جزيلا",
    "Filipino": "Maraming salamat"
  },
  "I love learning languages": {
    "French": "J'adore apprendre les langues",
    "Spanish": "Me encanta aprender idiomas",
    "Arabic": "أحب تعلم اللغات",
    "Filipino": "Mahilig akong matuto ng mga wika"
  },
  "Where is the library?": {
    "French": "Où est la bibliothèque?",
    "Spanish": "¿Dónde está la biblioteca?",
    "Arabic": "أين المكتبة؟",
    "Filipino": "Nasaan ang aklatan?"
  }
};

// Mock function for development
function getMockTranslation(text, language) {
  return MOCK_TRANSLATIONS[text]?.[language] || 
         `[Mock translation of "${text}" to ${language}]`;
}

// Toggle between mock and real API
const USE_MOCK_DATA = true; // Set to false when ready to test real API

async function translate(text, language) {
  if (USE_MOCK_DATA) {
    return getMockTranslation(text, language);
  } else {
    return await getTranslation(text, language); // Real API call
  }
}
```

---

## 🔐 Deployment Architecture (Secure API Key)

### Frontend (GitHub Pages)

- Static HTML/CSS/JS files
- User interface and interactions
- Calls Vercel serverless function (not OpenAI directly)

### Backend (Vercel Serverless Function)

- Handles OpenAI API calls
- Keeps API key secret
- Returns translation to frontend

### File Structure

```text
pollyglot/
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── (images from Figma)
├── api/
│   └── translate.js  (Vercel serverless function)
├── docs/
│   ├── PollyGlot - Transcript.log
│   └── My Response.md
├── .env.local  (API key - not committed)
├── vercel.json
└── README.md
```

### Vercel Setup (Quick Guide)

1. Install Vercel CLI: `npm i -g vercel`
2. Create `api/translate.js` with OpenAI logic
3. Add API key to Vercel environment variables
4. Deploy: `vercel --prod`
5. Update frontend to call Vercel function URL

---

## 📊 Cost Breakdown Estimate

| Activity                      | Estimated Calls     | Cost       |
| ----------------------------- | ------------------- | ---------- |
| Development Testing (Week 2)  | 10 translations     | $0.015     |
| Final Testing (All languages) | 20 translations     | $0.030     |
| Production Usage Buffer       | 50 translations     | $0.075     |
| **Total Estimated**           | **80 translations** | **~$0.12** |
| **Remaining Budget**          | **520 translations**| **~$0.88** |

You'll stay well under your $1 budget! 🎉

---

## 🎯 Success Checklist

- [ ] Week 1: Complete UI with mock data
- [ ] Week 1: Test all user interactions
- [ ] Week 2: Set up Vercel serverless function
- [ ] Week 2: Integrate OpenAI API
- [ ] Week 2: Test with 5-10 real translations
- [ ] Week 2: Implement error handling
- [ ] Final: Deploy to GitHub Pages + Vercel
- [ ] Final: Add screenshots to README
- [ ] Final: Share project on LinkedIn/X

---

## 📚 Additional Resources

- [Figma Design](https://www.figma.com/design/Bnh2EcBnqRbRB9vUS47myp/OpenAi-API---PollyGlot--Copy-)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vercel Serverless Functions Guide](https://vercel.com/docs/functions)
- [GitHub Pages Documentation](https://docs.github.com/pages)
