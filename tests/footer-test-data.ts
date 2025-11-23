export interface FooterLink {
  text: string;
  href: string;
  isExternal: boolean;
  section: string;
}

export interface FooterSection {
  section: string;
  links: FooterLink[];
}

export const EXPECTED_FOOTER_SECTIONS: FooterSection[] = [
  {
    section: 'Resources',
    links: [
      { text: 'Docs', href: '/docs', isExternal: false, section: 'Resources' },
      { text: 'Support Policy', href: '/support-policy', isExternal: false, section: 'Resources' },
      { text: 'Learn', href: '/learn', isExternal: false, section: 'Resources' },
      { text: 'Showcase', href: '/showcase', isExternal: false, section: 'Resources' },
      { text: 'Blog', href: '/blog', isExternal: false, section: 'Resources' },
      { text: 'Team', href: '/team', isExternal: false, section: 'Resources' },
      { text: 'Analytics', href: 'https://vercel.com/analytics', isExternal: true, section: 'Resources' },
      { text: 'Next.js Conf', href: '/conf', isExternal: false, section: 'Resources' },
      { text: 'Previews', href: 'https://vercel.com/products/previews', isExternal: true, section: 'Resources' },
      { text: 'Evals', href: '/evals', isExternal: false, section: 'Resources' }
    ]
  },
  {
    section: 'More',
    links: [
      { text: 'Next.js Commerce', href: 'https://vercel.com/templates/next.js/nextjs-commerce', isExternal: true, section: 'More' },
      { text: 'Contact Sales', href: 'https://vercel.com/contact/sales', isExternal: true, section: 'More' },
      { text: 'Community', href: 'https://community.vercel.com', isExternal: true, section: 'More' },
      { text: 'GitHub', href: 'https://github.com/vercel/next.js', isExternal: true, section: 'More' },
      { text: 'Releases', href: 'https://github.com/vercel/next.js/releases', isExternal: true, section: 'More' },
      { text: 'Telemetry', href: '/telemetry', isExternal: false, section: 'More' },
      { text: 'Governance', href: '/governance', isExternal: false, section: 'More' }
    ]
  },
  {
    section: 'About Vercel',
    links: [
      { text: 'Next.js + Vercel', href: 'https://vercel.com/solutions/nextjs', isExternal: true, section: 'About Vercel' },
      { text: 'Open Source Software', href: 'https://vercel.com/oss', isExternal: true, section: 'About Vercel' },
      { text: 'GitHub', href: 'https://github.com/vercel', isExternal: true, section: 'About Vercel' },
      { text: 'Bluesky', href: 'https://bsky.app/profile/vercel.com', isExternal: true, section: 'About Vercel' },
      { text: 'X', href: 'https://x.com/vercel', isExternal: true, section: 'About Vercel' }
    ]
  },
  {
    section: 'Legal',
    links: [
      { text: 'Privacy Policy', href: 'https://vercel.com/legal/privacy-policy', isExternal: true, section: 'Legal' }
    ]
  }
];

export const SOCIAL_MEDIA_LINKS = [
  { platform: 'GitHub', href: 'https://github.com/vercel/next.js', selector: 'footer a[href*="github.com/vercel/next.js"]' },
  { platform: 'Twitter/X', href: 'https://x.com/nextjs', selector: 'footer a[href*="x.com/nextjs"]' },
  { platform: 'Bluesky', href: 'https://bsky.app/profile/nextjs.org', selector: 'footer a[href*="bsky.app/profile/nextjs.org"]' }
];

export const INTERNAL_LINKS = EXPECTED_FOOTER_SECTIONS
  .flatMap(section => section.links)
  .filter(link => !link.isExternal)
  .map(link => link.href);

export const EXTERNAL_LINKS = EXPECTED_FOOTER_SECTIONS
  .flatMap(section => section.links)
  .filter(link => link.isExternal)
  .map(link => link.href);

export const TEST_CONFIG = {
  baseUrl: 'https://nextjs.org',
  timeout: 30000,
  retries: 2,
  maxConcurrentRequests: 5
};
