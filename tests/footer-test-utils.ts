import { Page, Locator, expect } from '@playwright/test';
import { FooterSection, FooterLink } from './footer-test-data';

export class FooterTestUtils {
  constructor(private page: Page) {}

  /**
   * Navigate to Next.js homepage and wait for footer to load
   */
  async navigateToHomepage(): Promise<void> {
    await this.page.goto('https://nextjs.org');
    await this.page.waitForLoadState('networkidle');
    await this.waitForFooterToLoad();
  }

  /**
   * Wait for footer element to be visible
   */
  async waitForFooterToLoad(): Promise<void> {
    const footer = this.page.locator('footer, [role="contentinfo"]');
    await expect(footer).toBeVisible();
  }

  /**
   * Get footer element
   */
  getFooter(): Locator {
    return this.page.locator('footer, [role="contentinfo"]');
  }

  /**
   * Get all links in a specific footer section
   */
  getSectionLinks(sectionName: string): Locator {
    return this.page.locator(`footer div:has(h4:has-text("${sectionName}")) a, footer div:has(h3:has-text("${sectionName}")) a, footer div:has(h2:has-text("${sectionName}")) a`);
  }

  /**
   * Get a specific link by text
   */
  getLinkByText(text: string): Locator {
    return this.page.locator(`footer a:has-text("${text}")`);
  }

  /**
   * Get all footer links
   */
  getAllFooterLinks(): Locator {
    return this.page.locator('footer a[href]');
  }

  /**
   * Extract all footer data dynamically from the page
   */
  async extractFooterData(): Promise<FooterSection[]> {
    return await this.page.evaluate(() => {
      const footerSections: FooterSection[] = [];
      const contentinfo = document.querySelector('[role="contentinfo"]') || document.querySelector('footer');
      
      if (!contentinfo) return [];
      
      const sections = contentinfo.querySelectorAll('div > h4, div > h3, div > h2');
      
      sections.forEach(heading => {
        const sectionName = heading.textContent?.trim() || '';
        const sectionDiv = heading.parentElement;
        if (!sectionDiv) return;
        
        const links = Array.from(sectionDiv.querySelectorAll('a'));
        
        footerSections.push({
          section: sectionName,
          links: links.map(link => ({
            text: link.textContent?.trim() || '',
            href: link.href,
            isExternal: !link.href.includes('nextjs.org'),
            section: sectionName
          }))
        });
      });
      
      return footerSections;
    });
  }

  /**
   * Validate that a link has the expected href
   */
  async validateLinkHref(linkText: string, expectedHref: string): Promise<void> {
    const link = this.getLinkByText(linkText);
    await expect(link).toBeVisible();
    
    const actualHref = await link.getAttribute('href');
    expect(actualHref).toContain(expectedHref);
  }

  /**
   * Validate that all links in a section are present and visible
   */
  async validateSectionLinks(sectionName: string, expectedLinks: FooterLink[]): Promise<void> {
    const sectionHeading = this.page.locator(`footer h4:has-text("${sectionName}"), footer h3:has-text("${sectionName}"), footer h2:has-text("${sectionName}")`);
    await expect(sectionHeading).toBeVisible();

    for (const expectedLink of expectedLinks) {
      await this.validateLinkHref(expectedLink.text, expectedLink.href);
    }
  }

  /**
   * Check if a link opens in a new tab
   */
  async checkLinkOpensInNewTab(linkSelector: string): Promise<boolean> {
    const link = this.page.locator(linkSelector);
    const target = await link.getAttribute('target');
    const rel = await link.getAttribute('rel');
    
    return target === '_blank' || (rel !== null && rel.includes('noopener'));
  }

  /**
   * Test newsletter subscription form
   */
  async testNewsletterForm(email: string = 'test@example.com'): Promise<void> {
    const emailInput = this.page.locator('footer input[type="email"], footer input[placeholder*="domain.com"]');
    const subscribeButton = this.page.locator('footer button:has-text("Subscribe")');
    
    await expect(emailInput).toBeVisible();
    await expect(subscribeButton).toBeVisible();
    
    await emailInput.fill(email);
    await expect(emailInput).toHaveValue(email);
    await expect(subscribeButton).toBeEnabled();
  }

  /**
   * Validate social media links
   */
  async validateSocialMediaLinks(): Promise<void> {
    const socialLinks = [
      { platform: 'GitHub', selector: 'footer a[href*="github.com/vercel/next.js"]' },
      { platform: 'Twitter/X', selector: 'footer a[href*="x.com/nextjs"]' },
      { platform: 'Bluesky', selector: 'footer a[href*="bsky.app/profile/nextjs.org"]' }
    ];

    for (const social of socialLinks) {
      const link = this.page.locator(social.selector).first();
      // Check if link exists in DOM, it might be hidden but still present
      const count = await this.page.locator(social.selector).count();
      expect(count).toBeGreaterThan(0);
      
      // Verify the href is correct
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  }

  /**
   * Check footer accessibility
   */
  async validateAccessibility(): Promise<void> {
    const footer = this.getFooter();
    await expect(footer).toBeVisible();

    // Check that all links have proper text or aria-labels
    const links = this.getAllFooterLinks();
    const count = await links.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      expect(text || ariaLabel).toBeTruthy();
    }
  }

  /**
   * Validate copyright notice
   */
  async validateCopyright(): Promise<void> {
    const currentYear = new Date().getFullYear();
    const copyrightText = this.page.locator(`footer:has-text("© ${currentYear} Vercel, Inc.")`);
    await expect(copyrightText).toBeVisible();
  }

  /**
   * Test theme switcher if present
   */
  async testThemeSwitcher(): Promise<void> {
    const themeControls = this.page.locator('footer [role="radiogroup"], footer button[aria-label*="theme"], footer button[aria-label*="Theme"]');
    
    const count = await themeControls.count();
    if (count > 0) {
      await expect(themeControls.first()).toBeVisible();
    }
  }

  /**
   * Validate Cookie Preferences button
   */
  async validateCookiePreferences(): Promise<void> {
    const cookieButton = this.page.locator('footer button:has-text("Cookie Preferences")');
    await expect(cookieButton).toBeVisible();
    await expect(cookieButton).toBeEnabled();
  }

  /**
   * Count total number of footer links
   */
  async getFooterLinkCount(): Promise<number> {
    const links = this.getAllFooterLinks();
    return await links.count();
  }

  /**
   * Validate Vercel logo link
   */
  async validateVercelLogo(): Promise<void> {
    const vercelLogoLink = this.page.locator('footer a[href*="vercel.com"]').first();
    await expect(vercelLogoLink).toBeVisible();
    
    const href = await vercelLogoLink.getAttribute('href');
    expect(href).toContain('vercel.com');
  }
}
