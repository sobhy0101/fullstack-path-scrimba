// PollyGlot - AI Language Translation App
// Built for Scrimba AI Engineering Course

// ============================================
// CONFIGURATION
// ============================================

// Toggle between mock data (Week 1) and real API (Week 2)
const USE_MOCK_DATA = true;

// Input validation constants
const MAX_INPUT_LENGTH = 280;
const MIN_INTERVAL = 2000; // 2 seconds between API calls

// API call tracking
let lastCallTime = 0;
let apiCallCount = 0;
const MAX_API_CALLS_PER_SESSION = 50; // Extra safety net

// ============================================
// MOCK DATA
// ============================================

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
  },
  "How much does this cost?": {
    "French": "Combien ça coûte?",
    "Spanish": "¿Cuánto cuesta esto?",
    "Arabic": "كم يكلف هذا؟",
    "Filipino": "Magkano ito?"
  },
  "I need help": {
    "French": "J'ai besoin d'aide",
    "Spanish": "Necesito ayuda",
    "Arabic": "أحتاج إلى مساعدة",
    "Filipino": "Kailangan ko ng tulong"
  },
  "What time is it?": {
    "French": "Quelle heure est-il?",
    "Spanish": "¿Qué hora es?",
    "Arabic": "كم الساعة؟",
    "Filipino": "Anong oras na?"
  }
};

// ============================================
// DOM ELEMENTS
// ============================================

const inputText = document.getElementById('input-text');
const charCounter = document.getElementById('char-counter');
const languageRadios = document.querySelectorAll('input[name="language"]');
const translateBtn = document.getElementById('translate-btn');
const resetBtn = document.getElementById('reset-btn');
const outputSection = document.getElementById('output-section');
const originalText = document.getElementById('original-text');
const translatedText = document.getElementById('translated-text');
const targetLanguageBadge = document.getElementById('target-language-badge');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const devModeBadge = document.getElementById('dev-mode-badge');

// ============================================
// EVENT LISTENERS
// ============================================

// Character counter update
inputText.addEventListener('input', updateCharacterCount);

// Translate button
translateBtn.addEventListener('click', handleTranslate);

// Reset button
resetBtn.addEventListener('click', handleReset);

// Enter key in textarea (Shift+Enter for new line)
inputText.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleTranslate();
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function getSelectedLanguage() {
  const selectedRadio = document.querySelector('input[name="language"]:checked');
  return selectedRadio ? selectedRadio.value : '';
}

// ============================================
// CHARACTER COUNTER
// ============================================

function updateCharacterCount() {
  const currentLength = inputText.value.length;
  const remaining = MAX_INPUT_LENGTH - currentLength;
  
  charCounter.textContent = `${currentLength}/${MAX_INPUT_LENGTH}`;
  
  // Remove previous warning classes
  charCounter.classList.remove('warning', 'danger');
  
  // Add appropriate class based on remaining characters
  if (remaining < 50) {
    charCounter.classList.add('danger');
  } else if (remaining < 100) {
    charCounter.classList.add('warning');
  }
}

// ============================================
// INPUT VALIDATION
// ============================================

function validateInput(text, language) {
  // Check if text is empty
  if (text.trim().length === 0) {
    showError('Please enter some text to translate');
    return false;
  }
  
  // Check if text exceeds maximum length
  if (text.length > MAX_INPUT_LENGTH) {
    showError(`Please limit input to ${MAX_INPUT_LENGTH} characters (currently ${text.length})`);
    return false;
  }
  
  // Check if language is selected
  if (!language) {
    showError('Please select a target language');
    return false;
  }
  
  return true;
}

// ============================================
// RATE LIMITING
// ============================================

function checkRateLimit() {
  const now = Date.now();
  
  if (now - lastCallTime < MIN_INTERVAL) {
    const waitTime = Math.ceil((MIN_INTERVAL - (now - lastCallTime)) / 1000);
    showError(`Please wait ${waitTime} second(s) before translating again`);
    return false;
  }
  
  // Check session limit
  if (apiCallCount >= MAX_API_CALLS_PER_SESSION) {
    showError('Session limit reached for budget protection. Please refresh the page to continue.');
    return false;
  }
  
  return true;
}

// ============================================
// MOCK TRANSLATION FUNCTION
// ============================================

function getMockTranslation(text, language) {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if we have an exact match
      if (MOCK_TRANSLATIONS[text] && MOCK_TRANSLATIONS[text][language]) {
        resolve(MOCK_TRANSLATIONS[text][language]);
      } else {
        // Generate a mock translation for unknown text
        resolve(`[Mock ${language} translation of: "${text}"]`);
      }
    }, 1000); // 1 second delay to simulate API call
  });
}

// ============================================
// REAL API TRANSLATION FUNCTION
// ============================================

async function getTranslation(text, targetLanguage) {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        prompt: `Translate to ${targetLanguage}: ${text}`,
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.translation;
    
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate. Please check your connection and try again.');
  }
}

// ============================================
// MAIN TRANSLATION HANDLER
// ============================================

async function handleTranslate() {
  const text = inputText.value;
  const language = getSelectedLanguage();
  
  // Hide previous results and errors
  hideError();
  hideOutput();
  
  // Validate input
  if (!validateInput(text, language)) {
    return;
  }
  
  // Check rate limiting (only for real API calls)
  if (!USE_MOCK_DATA && !checkRateLimit()) {
    return;
  }
  
  // Show loading indicator
  showLoading();
  
  try {
    let translation;
    
    // Choose between mock or real API
    if (USE_MOCK_DATA) {
      translation = await getMockTranslation(text, language);
    } else {
      translation = await getTranslation(text, language);
      
      // Update tracking variables
      lastCallTime = Date.now();
      apiCallCount++;
    }
    
    // Display the results
    displayTranslation(text, translation, language);
    
  } catch (error) {
    showError(error.message || 'An unexpected error occurred');
  } finally {
    hideLoading();
  }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayTranslation(original, translated, language) {
  originalText.textContent = original;
  translatedText.textContent = translated;
  targetLanguageBadge.textContent = language;
  
  outputSection.style.display = 'block';
  
  // Scroll to results
  outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showLoading() {
  loadingIndicator.style.display = 'block';
  translateBtn.disabled = true;
}

function hideLoading() {
  loadingIndicator.style.display = 'none';
  translateBtn.disabled = false;
}

function showError(message) {
  errorText.textContent = message;
  errorMessage.style.display = 'block';
  
  // Auto-hide error after 5 seconds
  setTimeout(hideError, 5000);
}

function hideError() {
  errorMessage.style.display = 'none';
}

function hideOutput() {
  outputSection.style.display = 'none';
}

// ============================================
// RESET FUNCTION
// ============================================

function handleReset() {
  // Clear inputs
  inputText.value = '';
  
  // Uncheck all radio buttons
  languageRadios.forEach(radio => {
    radio.checked = false;
  });
  
  // Reset character counter
  updateCharacterCount();
  
  // Hide output and errors
  hideOutput();
  hideError();
  
  // Focus back on input
  inputText.focus();
}

// ============================================
// INITIALIZATION
// ============================================

function initialize() {
  // Set initial character count
  updateCharacterCount();
  
  // Update dev mode badge based on configuration
  if (USE_MOCK_DATA) {
    devModeBadge.innerHTML = '<span class="status-dot"></span> Mock Mode';
    devModeBadge.style.background = '#f59e0b'; // Orange
  } else {
    devModeBadge.innerHTML = '<span class="status-dot"></span> Live API';
    devModeBadge.style.background = '#10b981'; // Green
  }
  
  console.log('PollyGlot initialized');
  console.log('Mode:', USE_MOCK_DATA ? 'Mock Data' : 'Live API');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
