# playwright-mcp
A sample framework that uses the MCP Playwright server with multiple MCP clients, supporting both UI and API testing

UI: [nextjs.org](https://nextjs.org/)

API: [https://fakerestapi.azurewebsites.net/](https://fakerestapi.azurewebsites.net/index.html)

# Prerequisites
- Node v18 or newer
- MCP Playwright server
- MCP clients (Claude Desktop, Windsurf, VS Code)

# Setup/Installtion 
- Create a empty project/folder with name `playwright-mcp`
  
- Open with any editor(windsurf/VS code) and initialise project with playwright(just run below command on terminal and accept everything)
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
- Run the following prompt with the Claude Sonnet 4 LLM agent to generate UI tests for the Next.js.org footer links
```
Use the available tools and navigate to nextjs.org website

analyse the content and create me a suite of tests which will test the footer links of nextjs website

place the tests in @testsfolder
```

<img width="432" height="385" alt="Screenshot 2025-11-23 at 16 25 23" src="https://github.com/user-attachments/assets/4c58a5d3-08b4-4ad2-9f82-495538b6c002" />

Note: The generated test suites will vary based on the chosen LLM, and the same prompt may produce different outputs

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

### API tests for [https://fakerestapi.azurewebsites.net/](https://fakerestapi.azurewebsites.net/index.html)
- Run the following prompt to generate API tests for the schema: [https://fakerestapi.azurewebsites.net/swagger/v1/swagger.json](https://fakerestapi.azurewebsites.net/swagger/v1/swagger.json)
  
<img width="422" height="228" alt="Screenshot 2025-11-23 at 17 00 23" src="https://github.com/user-attachments/assets/0345cbe6-b395-4854-82d8-9a91ce51cf38" />

Note: The generated test suites will vary based on the chosen LLM, and the same prompt may produce different outputs

### Run generated API tests
```bash
npx playwright test tests/api/fakerest.spec.ts
```

