# Create a new OpenAI project named "Dodgy Dave"
$headers = @{
    "Authorization" = "Bearer $env:OPENAI_API_KEY"
    "Content-Type" = "application/json"
}

$body = @{
    name = "Dodgy Dave"
} | ConvertTo-Json

$uri = "https://api.openai.com/v1/organization/projects"

Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body $body | ConvertTo-Json -Depth 10
