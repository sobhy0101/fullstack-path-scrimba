# Tracking Token Usage for Dodgy Dave Project

## Recommended Approach

Since the Admin API requires special permissions, here's the **easiest way** to track token usage for this learning project:

### Option 1: Create a Course-Specific API Key (Recommended)

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Name it: "Dodgy Dave - AI Engineering Course"
4. Set permissions: "All" (or restricted to specific models)
5. Copy the key and save it securely
6. Update your `.env` file to use this key for this project
7. View usage at [OpenAI Usage Dashboard](https://platform.openai.com/usage)
   - Filter by the specific API key to see tokens used

### Option 2: Use Projects (Requires Admin Access)

If you have admin access to your organization:

1. Go to [OpenAI Projects](https://platform.openai.com/organization/projects)
2. Create a new project named "Dodgy Dave"
3. Create API keys specifically for that project
4. Usage will be tracked per project

## Checking Current Usage

You can view your usage programmatically with your current API key:

```powershell
# Run this to see your recent usage
.\check-usage.ps1
```

## Environment Setup

Create a `.env` file in this directory:

```env
OPENAI_API_KEY=your-key-here
```

Then load it in your scripts with:

```powershell
# Load environment variables from .env
Get-Content .env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.+)$') {
        [Environment]::SetEnvironmentVariable($matches[1], $matches[2])
    }
}
```
