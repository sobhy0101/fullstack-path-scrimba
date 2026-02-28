/**
 * Test script for Massive (formerly Polygon) API
 * Tests API authentication and basic endpoint access
 */

async function testMassiveAPI() {
    console.log("🚀 Testing Massive API...");
    
    const apiKey = import.meta.env.VITE_POLYGON_API_SECRET;
    
    if (!apiKey) {
        console.error("❌ API key not found! Check your .env file.");
        return;
    }
    
    try {
        // Test endpoint: Reference Dividends
        const url = "https://api.massive.com/v3/reference/dividends";
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("✅ Success! API Response:", data);
        console.log(`📊 Received ${data.results?.length || 0} dividend records`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

// Alternative: Test with Query String Authentication
async function testMassiveAPIQueryString() {
    console.log("🚀 Testing Massive API (Query String Method)...");
    
    const apiKey = import.meta.env.VITE_POLYGON_API_SECRET;
    
    if (!apiKey) {
        console.error("❌ API key not found! Check your .env file.");
        return;
    }
    
    try {
        const url = `https://api.massive.com/v3/reference/dividends?apiKey=${apiKey}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("✅ Success! API Response:", data);
        console.log(`📊 Received ${data.results?.length || 0} dividend records`);
        
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

// Export for use in other modules or run directly
export { testMassiveAPI, testMassiveAPIQueryString };

// Auto-run when module loads (comment out if you prefer manual testing)
testMassiveAPI();
