# playwright-mcp
A sample framework that uses the MCP Playwright server with multiple MCP clients, supporting both UI and API testing

# Prerequisites
- Node.js (v16 or higher)
- MCP Playwright server
- MCP clients (Claude Desktop, Windsurf, VS Code)

# Installation
- Clone the repository
- Install dependencies
    - npm init playwright@latest

- Install any of the MCP clients
    - Claude Desktop
    - Windsurf
    - VS Code
- Configure MCP Playwright server
```
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@latest"
      ]
    }
  }
}
```
### Run All Footer Tests
```bash
npx playwright test tests/nextjs-footer.spec.ts
npx playwright test tests/footer-links-validation.spec.ts
npx playwright test tests/footer-comprehensive.spec.ts
```

### Run Specific Test Categories
```bash
# Run only structure validation tests
npx playwright test tests/nextjs-footer.spec.ts --grep "should display all expected footer sections"

# Run only link validation tests
npx playwright test tests/footer-links-validation.spec.ts --grep "should validate"

# Run comprehensive tests
npx playwright test tests/footer-comprehensive.spec.ts
```

### Generate Test Report
```bash
npx playwright test --reporter=html
```
