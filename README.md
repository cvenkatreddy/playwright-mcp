# playwright-mcp
A sample framework that uses the MCP Playwright server with multiple MCP clients, supporting both UI and API testing

# Prerequisites
- Node.js (v16 or higher)
- MCP Playwright server
- MCP clients (Claude Desktop, Windsurf, VS Code)

# Setup/Installtion
- Install any of the MCP clients
    - Claude Desktop
    - Windsurf
    - VS Code
- Create a empty folder --> open with any of the editor --> open a new terminal
    - Install dependencies
        - npm init playwright@latest
          
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
- Run below prompt with any of the llm agents(claude sonnet4/GPT-5-Codex) for generating UI tests for nextjs.org for footer links
```
Use the available tools and navigate to nextjs.org website
analyse the content and create me a suite of tests which will test the footer links of nextjs website
place the tests in @testsfolder
```
what's next, need to run the tests after prompt finishes generating tests

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
