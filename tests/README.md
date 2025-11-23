# Next.js Website Footer Test Suite

This test suite provides comprehensive testing for the footer links and functionality of the Next.js website (https://nextjs.org).

## Test Files Overview

### 1. `nextjs-footer.spec.ts`
Main test file containing detailed tests for:
- Footer section structure validation
- Individual link verification for each section (Resources, More, About Vercel, Legal)
- Social media links testing
- Newsletter subscription form validation
- Accessibility checks
- Performance validation

### 2. `footer-links-validation.spec.ts`
Focused on link validation and HTTP response testing:
- Internal Next.js links (200 status validation)
- External Vercel links accessibility
- GitHub links validation
- Social media links accessibility
- Link navigation behavior testing
- Form functionality testing

### 3. `footer-comprehensive.spec.ts`
Comprehensive test using utility classes:
- Complete footer structure validation
- Dynamic footer data extraction
- Integrated testing using helper utilities

### 4. `footer-test-data.ts`
Test data configuration file containing:
- Expected footer sections and links
- Social media link definitions
- Internal/external link categorization
- Test configuration constants

### 5. `footer-test-utils.ts`
Utility class with helper methods for:
- Footer navigation and setup
- Link validation methods
- Section testing utilities
- Accessibility validation
- Dynamic data extraction

## Footer Structure Analyzed

Based on the analysis of nextjs.org, the footer contains:

### Resources Section
- Docs (/docs)
- Support Policy (/support-policy)
- Learn (/learn)
- Showcase (/showcase)
- Blog (/blog)
- Team (/team)
- Analytics (external - Vercel)
- Next.js Conf (/conf)
- Previews (external - Vercel)
- Evals (/evals)

### More Section
- Next.js Commerce (external - Vercel)
- Contact Sales (external - Vercel)
- Community (external - Vercel)
- GitHub (external - GitHub)
- Releases (external - GitHub)
- Telemetry (/telemetry)
- Governance (/governance)

### About Vercel Section
- Next.js + Vercel (external - Vercel)
- Open Source Software (external - Vercel)
- GitHub (external - GitHub Vercel org)
- Bluesky (external - Bluesky)
- X (external - X/Twitter)

### Legal Section
- Privacy Policy (external - Vercel)

### Additional Elements
- Newsletter subscription form
- Social media icons (GitHub, X/Twitter, Bluesky)
- Vercel logo link
- Copyright notice
- Cookie preferences button
- Theme switcher (if available)

## Running the Tests

### Prerequisites
Make sure you have Playwright installed and configured:

```bash
npm install @playwright/test
npx playwright install
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

## Test Coverage

The test suite covers:

✅ **Structural Testing**
- Footer section presence and visibility
- Correct heading hierarchy
- Proper semantic HTML structure

✅ **Link Testing**
- All internal links functionality
- External link accessibility
- Correct href attributes
- Link text consistency

✅ **Functionality Testing**
- Newsletter subscription form
- Cookie preferences button
- Theme switcher (if present)
- Social media links

✅ **Accessibility Testing**
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader compatibility

✅ **Performance Testing**
- Footer load times
- Link response times
- Page rendering impact

✅ **Cross-browser Testing**
- Chromium, Firefox, Safari support
- Mobile and desktop viewports

## Maintenance

This test suite should be updated when:
- Footer structure changes on nextjs.org
- New links are added or removed
- Link URLs are modified
- New functionality is added to the footer

## Notes

- Tests use the live nextjs.org website
- Some external link tests may occasionally fail due to network issues
- Tests include retry logic for flaky network conditions
- The test suite is designed to be maintainable and easily extensible
