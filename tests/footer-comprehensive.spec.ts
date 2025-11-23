import { test, expect } from '@playwright/test';
import { FooterTestUtils } from './footer-test-utils';
import { EXPECTED_FOOTER_SECTIONS, SOCIAL_MEDIA_LINKS, INTERNAL_LINKS, EXTERNAL_LINKS } from './footer-test-data';

test.describe('Next.js Footer - Comprehensive Test Suite', () => {
  let footerUtils: FooterTestUtils;

  test.beforeEach(async ({ page }) => {
    footerUtils = new FooterTestUtils(page);
    await footerUtils.navigateToHomepage();
  });

  test('should validate complete footer structure and all sections', async () => {
    // Validate each expected section
    for (const section of EXPECTED_FOOTER_SECTIONS) {
      await footerUtils.validateSectionLinks(section.section, section.links);
    }
  });

  test('should validate all social media links', async () => {
    await footerUtils.validateSocialMediaLinks();
  });

  test('should validate newsletter subscription functionality', async () => {
    await footerUtils.testNewsletterForm();
  });

  test('should validate Vercel branding elements', async () => {
    await footerUtils.validateVercelLogo();
    await footerUtils.validateCopyright();
  });

  test('should validate footer accessibility standards', async () => {
    await footerUtils.validateAccessibility();
  });

  test('should validate interactive elements', async () => {
    await footerUtils.validateCookiePreferences();
    await footerUtils.testThemeSwitcher();
  });

  test('should have expected number of footer links', async () => {
    const linkCount = await footerUtils.getFooterLinkCount();
    expect(linkCount).toBeGreaterThan(25); // Based on our analysis
  });

  test('should dynamically extract and validate footer data', async ({ page }) => {
    const extractedData = await footerUtils.extractFooterData();
    
    // Validate that we have the expected sections
    const sectionNames = extractedData.map(section => section.section);
    expect(sectionNames).toContain('Resources');
    expect(sectionNames).toContain('More');
    expect(sectionNames).toContain('About Vercel');
    expect(sectionNames).toContain('Legal');
    
    // Validate total number of links across all sections
    const totalLinks = extractedData.reduce((sum, section) => sum + section.links.length, 0);
    expect(totalLinks).toBeGreaterThan(20);
  });
});
