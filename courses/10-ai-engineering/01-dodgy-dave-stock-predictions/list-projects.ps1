# List all OpenAI projects
$headers = @{
    "Authorization" = "Bearer $env:OPENAI_API_KEY"
    "Content-Type" = "application/json"
}

# Remove query parameters if you want to see all projects
$uri = "https://api.openai.com/v1/organization/projects?limit=20&include_archived=false"

Invoke-RestMethod -Uri $uri -Headers $headers -Method Get | ConvertTo-Json -Depth 10