import { test, expect } from '@playwright/test';

test.describe('Next.js Footer Links Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://nextjs.org');
    await page.waitForLoadState('networkidle');
  });

  test('should validate all internal Next.js links return 200 status', async ({ page, request }) => {
    const internalLinks = [
      '/docs',
      '/support-policy', 
      '/learn',
      '/showcase',
      '/blog',
      '/team',
      '/conf',
      '/evals',
      '/telemetry',
      '/governance'
    ];

    for (const link of internalLinks) {
      const response = await request.get(`https://nextjs.org${link}`);
      expect(response.status()).toBe(200);
    }
  });

  test('should validate external Vercel links are accessible', async ({ request }) => {
    const vercelLinks = [
      'https://vercel.com/analytics',
      'https://vercel.com/products/previews', 
      'https://vercel.com/templates/next.js/nextjs-commerce',
      'https://vercel.com/contact/sales',
      'https://vercel.com/solutions/nextjs',
      'https://vercel.com/oss',
      'https://vercel.com/legal/privacy-policy'
    ];

    for (const link of vercelLinks) {
      const response = await request.get(link);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('should validate GitHub links are accessible', async ({ request }) => {
    const githubLinks = [
      'https://github.com/vercel/next.js',
      'https://github.com/vercel/next.js/releases',
      'https://github.com/vercel'
    ];

    for (const link of githubLinks) {
      const response = await request.get(link);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('should validate social media links are accessible', async ({ request }) => {
    const socialLinks = [
      'https://community.vercel.com/',
      'https://x.com/nextjs',
      'https://x.com/vercel',
      'https://bsky.app/profile/nextjs.org',
      'https://bsky.app/profile/vercel.com'
    ];

    for (const link of socialLinks) {
      const response = await request.get(link);
      expect(response.status()).toBeLessThan(400);
    }
  });

  test('should test footer link navigation behavior', async ({ page, context }) => {
    // Test that external links open in new tab/window (if configured)
    const externalLink = page.locator('footer a[href*="github.com/vercel/next.js"]').first();
    
    // Check if link has target="_blank" or similar
    const target = await externalLink.getAttribute('target');
    const href = await externalLink.getAttribute('href');
    
    expect(href).toContain('github.com');
    
    // Test clicking the link
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      externalLink.click()
    ]);
    
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('github.com');
    await newPage.close();
  });

  test('should test internal link navigation', async ({ page }) => {
    // Test internal navigation
    const docsLink = page.locator('footer a[href="/docs"]').first();
    await docsLink.click();
    
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/docs');
    
    // Navigate back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBe('https://nextjs.org/');
  });

  test('should validate newsletter subscription form', async ({ page }) => {
    const emailInput = page.locator('footer input[type="email"], footer input[placeholder*="domain.com"]');
    const subscribeButton = page.locator('footer button:has-text("Subscribe")');
    
    // Test form interaction
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
    
    // Check if subscribe button is enabled
    await expect(subscribeButton).toBeEnabled();
  });

  test('should validate footer link text and href consistency', async ({ page }) => {
    // Define expected link mappings
    const expectedLinks = [
      { text: 'Docs', expectedHref: '/docs' },
      { text: 'Learn', expectedHref: '/learn' },
      { text: 'Blog', expectedHref: '/blog' },
      { text: 'Showcase', expectedHref: '/showcase' },
      { text: 'Team', expectedHref: '/team' },
      { text: 'Privacy Policy', expectedHref: 'vercel.com/legal/privacy-policy' }
    ];

    for (const { text, expectedHref } of expectedLinks) {
      const link = page.locator(`footer a:has-text("${text}")`).first();
      const actualHref = await link.getAttribute('href');
      
      expect(actualHref).toContain(expectedHref);
    }
  });

  test('should check footer accessibility attributes', async ({ page }) => {
    // Check for proper ARIA labels and accessibility
    const footerElement = page.locator('footer, [role="contentinfo"]');
    await expect(footerElement).toBeVisible();

    // Check that links have proper text or aria-labels
    const footerLinks = page.locator('footer a');
    const count = await footerLinks.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const link = footerLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Each link should have either visible text or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should validate footer performance', async ({ page }) => {
    // Check that footer loads quickly and doesn't block page rendering
    const startTime = Date.now();
    
    await page.goto('https://nextjs.org');
    await page.waitForSelector('footer, [role="contentinfo"]');
    
    const loadTime = Date.now() - startTime;
    
    // Footer should load within reasonable time (5 seconds)
    expect(loadTime).toBeLessThan(5000);
    
    // Check that all footer links are rendered
    const footerLinks = page.locator('footer a');
    const linkCount = await footerLinks.count();
    
    expect(linkCount).toBeGreaterThan(15); // Should have at least 15 links based on our analysis
  });
});
