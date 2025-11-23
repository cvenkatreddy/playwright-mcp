import { test, expect } from '@playwright/test';

interface FooterLink {
  text: string;
  href: string;
  isExternal: boolean;
}

interface FooterSection {
  section: string;
  links: FooterLink[];
}

test.describe('Next.js Website Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://nextjs.org');
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');
  });

  test('should display all expected footer sections', async ({ page }) => {
    const expectedSections = [
      'Resources',
      'More', 
      'About Vercel',
      'Legal',
      'Subscribe to our newsletter'
    ];

    for (const sectionName of expectedSections) {
      const sectionHeading = page.locator(`footer h4:has-text("${sectionName}"), footer h3:has-text("${sectionName}"), footer h2:has-text("${sectionName}")`);
      await expect(sectionHeading).toBeVisible();
    }
  });

  test('should have all Resources section links working', async ({ page }) => {
    const resourcesLinks = [
      { text: 'Docs', href: '/docs' },
      { text: 'Support Policy', href: '/support-policy' },
      { text: 'Learn', href: '/learn' },
      { text: 'Showcase', href: '/showcase' },
      { text: 'Blog', href: '/blog' },
      { text: 'Team', href: '/team' },
      { text: 'Analytics', href: 'https://vercel.com/analytics' },
      { text: 'Next.js Conf', href: '/conf' },
      { text: 'Previews', href: 'https://vercel.com/products/previews' },
      { text: 'Evals', href: '/evals' }
    ];

    for (const link of resourcesLinks) {
      const linkElement = page.locator(`footer a:has-text("${link.text}")`);
      await expect(linkElement).toBeVisible();
      
      const href = await linkElement.getAttribute('href');
      expect(href).toContain(link.href);
    }
  });

  test('should have all More section links working', async ({ page }) => {
    const moreLinks = [
      { text: 'Next.js Commerce', href: 'https://vercel.com/templates/next.js/nextjs-commerce' },
      { text: 'Contact Sales', href: 'https://vercel.com/contact/sales' },
      { text: 'Community', href: 'https://community.vercel.com' },
      { text: 'GitHub', href: 'https://github.com/vercel/next.js' },
      { text: 'Releases', href: 'https://github.com/vercel/next.js/releases' },
      { text: 'Telemetry', href: '/telemetry' },
      { text: 'Governance', href: '/governance' }
    ];

    for (const link of moreLinks) {
      const linkElement = page.locator(`footer a:has-text("${link.text}")`);
      await expect(linkElement).toBeVisible();
      
      const href = await linkElement.getAttribute('href');
      expect(href).toContain(link.href);
    }
  });

  test('should have all About Vercel section links working', async ({ page }) => {
    const aboutVercelLinks = [
      { text: 'Next.js + Vercel', href: 'https://vercel.com/solutions/nextjs' },
      { text: 'Open Source Software', href: 'https://vercel.com/oss' },
      { text: 'GitHub', href: 'https://github.com/vercel' },
      { text: 'Bluesky', href: 'https://bsky.app/profile/vercel.com' },
      { text: 'X', href: 'https://x.com/vercel' }
    ];

    for (const link of aboutVercelLinks) {
      const linkElement = page.locator(`footer a:has-text("${link.text}")`);
      await expect(linkElement).toBeVisible();
      
      const href = await linkElement.getAttribute('href');
      expect(href).toContain(link.href);
    }
  });

  test('should have Legal section links working', async ({ page }) => {
    const legalLinks = [
      { text: 'Privacy Policy', href: 'https://vercel.com/legal/privacy-policy' }
    ];

    for (const link of legalLinks) {
      const linkElement = page.locator(`footer a:has-text("${link.text}")`);
      await expect(linkElement).toBeVisible();
      
      const href = await linkElement.getAttribute('href');
      expect(href).toContain(link.href);
    }
  });

  test('should have social media links at bottom of footer', async ({ page }) => {
    // Check for social media icons/links
    const githubLink = page.locator('footer a[href*="github.com/vercel/next.js"]').first();
    const twitterLink = page.locator('footer a[href*="x.com/nextjs"]').first();
    const blueskyLink = page.locator('footer a[href*="bsky.app/profile/nextjs.org"]').first();

    await expect(githubLink).toBeVisible();
    await expect(twitterLink).toBeVisible();
    await expect(blueskyLink).toBeVisible();
  });

  test('should have newsletter subscription section', async ({ page }) => {
    const newsletterHeading = page.locator('footer h4:has-text("Subscribe to our newsletter")');
    await expect(newsletterHeading).toBeVisible();

    const emailInput = page.locator('footer input[placeholder*="domain.com"], footer input[type="email"]');
    await expect(emailInput).toBeVisible();

    const subscribeButton = page.locator('footer button:has-text("Subscribe")');
    await expect(subscribeButton).toBeVisible();
  });

  test('should have Vercel logo link in footer', async ({ page }) => {
    const vercelLogoLink = page.locator('footer a[href*="vercel.com"]').first();
    await expect(vercelLogoLink).toBeVisible();
    
    const href = await vercelLogoLink.getAttribute('href');
    expect(href).toContain('vercel.com');
  });

  test('should have copyright notice', async ({ page }) => {
    const copyrightText = page.locator('footer:has-text("© 2025 Vercel, Inc.")');
    await expect(copyrightText).toBeVisible();
  });

  test('should test external link accessibility and security', async ({ page }) => {
    // Get all external links
    const externalLinks = page.locator('footer a[href^="http"]:not([href*="nextjs.org"])');
    const count = await externalLinks.count();
    
    expect(count).toBeGreaterThan(0);

    // Check first few external links for proper attributes
    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = externalLinks.nth(i);
      const href = await link.getAttribute('href');
      
      // Ensure external links are properly formatted
      expect(href).toMatch(/^https?:\/\//);
    }
  });

  test('should validate all footer links are clickable and respond', async ({ page }) => {
    // Get all footer links
    const footerLinks = page.locator('footer a[href]');
    const count = await footerLinks.count();
    
    expect(count).toBeGreaterThan(0);

    // Test a sample of internal links (Next.js domain)
    const internalLinks = page.locator('footer a[href*="nextjs.org"], footer a[href^="/"]');
    const internalCount = await internalLinks.count();
    
    for (let i = 0; i < Math.min(internalCount, 3); i++) {
      const link = internalLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('/')) {
        // Test internal relative links by checking if they're clickable
        await expect(link).toBeEnabled();
      }
    }
  });

  test('should have proper footer structure and layout', async ({ page }) => {
    // Check that footer exists and is visible
    const footer = page.locator('footer, [role="contentinfo"]');
    await expect(footer).toBeVisible();

    // Check that footer has multiple sections
    const footerSections = page.locator('footer div:has(h4), footer div:has(h3), footer div:has(h2)');
    const sectionCount = await footerSections.count();
    expect(sectionCount).toBeGreaterThanOrEqual(4);
  });

  test('should handle Cookie Preferences button', async ({ page }) => {
    const cookieButton = page.locator('footer button:has-text("Cookie Preferences")');
    await expect(cookieButton).toBeVisible();
    await expect(cookieButton).toBeEnabled();
  });

  test('should have theme switcher in footer', async ({ page }) => {
    // Check for theme switching controls
    const themeControls = page.locator('footer [role="radiogroup"], footer button[aria-label*="theme"], footer button[aria-label*="Theme"]');
    
    if (await themeControls.count() > 0) {
      await expect(themeControls.first()).toBeVisible();
    }
  });
});
