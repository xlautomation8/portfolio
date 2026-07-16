import { test, expect, type Page } from '@playwright/test';
import { promises as fs } from 'fs';

const SITE_TARGET = process.env.SITE_TARGET?.trim().toLowerCase() || 'local';
const BASE_URL =
  SITE_TARGET === 'utkarsh.site' || SITE_TARGET === 'prod' || SITE_TARGET === 'remote'
    ? 'https://utkarsh.site'
    : 'http://localhost:8080';

async function openNavigationMenu(page: Page) {
  const navToggle = page.locator('#navToggle');
  if (await navToggle.isVisible().catch(() => false)) {
    await navToggle.click({ force: true });
    await page.waitForTimeout(300);
  }

  const navMenu = page.locator('header nav#navLinks');
  await expect(navMenu).toBeVisible({ timeout: 10000 });

  const isVisible = await navMenu.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.getBoundingClientRect().height > 0;
  }).catch(() => false);

  if (!isVisible) {
    await page.evaluate(() => {
      const el = document.getElementById('navLinks');
      if (el) {
        el.classList.add('open');
      }
    });
    await page.waitForTimeout(200);
  }

  await expect(navMenu).toBeAttached();
}

test.describe('Utkarsh Sinha Portfolio Website - Full Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({
      path: testInfo.outputPath('final-screenshot.png'),
      fullPage: true,
    });
  });

  test('1. Home page smoke test - Verify hero content, navigation, CTAs, and resume link', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');

    const heroSection = page.locator('section#home').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });

    const nameHeading = heroSection.locator('h1.hero-name');
    await expect(nameHeading).toBeVisible();
    await expect(nameHeading).toContainText('Utkarsh Sinha');

    const roleHeading = heroSection.locator('h2.hero-title');
    await expect(roleHeading).toBeVisible();
    await expect(roleHeading).toContainText('QA Automation Architect');
    await expect(roleHeading).toContainText('AI-Driven Quality Engineering Leader');

    const statItems = heroSection.locator('.hero-stats .stat');
    await expect(statItems).toHaveCount(4);
    await expect(statItems.first()).toBeVisible();
    await expect(heroSection).toContainText(/18\+\s*years/i);
    await expect(heroSection).toContainText(/70%\s*automation\s*coverage/i);
    await expect(heroSection).toContainText(/99\.5%\s*production\s*stability/i);
    await expect(heroSection).toContainText(/20\+\s*engineers\s*mentored/i);

    await openNavigationMenu(page);

    const navLinks = page.locator('header nav a.nav-link');
    await expect(navLinks).toHaveCount(8);

    const sectionLinks = [
      { href: '#about', sectionId: '#about' },
      { href: '#experience', sectionId: '#experience' },
      { href: '#skills', sectionId: '#skills' },
      { href: '#projects', sectionId: '#projects' },
      { href: '#education', sectionId: '#education' },
      { href: '#contact', sectionId: '#contact' },
    ];

    for (const link of sectionLinks) {
      await openNavigationMenu(page);
      const navLink = page.locator(`header nav a.nav-link[href="${link.href}"]`).first();
      await expect(navLink).toBeAttached();
      await expect.poll(async () => {
        return await navLink.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden';
        });
      }).toBe(true);
      await navLink.scrollIntoViewIfNeeded();
      await expect(navLink).toBeVisible();
      await navLink.click();
      await page.waitForURL(`**/${link.href}`);
      await expect(page.locator(link.sectionId)).toBeVisible();
    }

    const homeLink = page.locator('header a.logo').first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await page.waitForURL('**/#home');
    await expect(page.locator('section#home')).toBeVisible();

    const getInTouchBtn = page.locator('.hero-cta a[href="#contact"].btn-primary').first();
    await expect(getInTouchBtn).toBeVisible();
    await getInTouchBtn.click();
    await page.waitForURL('**/#contact');
    await expect(page.locator('section#contact')).toBeVisible();
    await expect(page.locator('section#contact .section-title')).toContainText("Let's Build Something Reliable");

    await page.goto(`${BASE_URL}/#home`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');

    const viewWorkBtn = page.locator('.hero-cta a[href="#projects"].btn-outline').first();
    await expect(viewWorkBtn).toBeVisible();
    await viewWorkBtn.click();
    await expect(page).toHaveURL(`${BASE_URL}/#projects`);
    await expect(page.locator('section#projects')).toBeVisible();
    await expect(page.locator('section#projects .section-title')).toContainText('Selected Work');

    const certificatesLink = page.locator('header nav a.nav-link[href="certificates.html"]').first();
    await expect(certificatesLink).toHaveCount(1);
    await expect(certificatesLink).toContainText('view certificates');

    await openNavigationMenu(page);
    const resumeLink = page.locator('header nav a.nav-link[href*="UTKARSH_SINHA"][href$=".pdf"]').first();
    await expect(resumeLink).toBeAttached();
    await expect(resumeLink).toHaveAttribute('href', /UTKARSH_SINHA.*\.pdf$/i);

    console.log('✓ Test 1 Passed: Home page smoke test verified');
  });

  test('2. Certificates page link - Verify certificates page navigates and loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');

    await openNavigationMenu(page);
    const certificatesLink = page.locator('header nav a.nav-link[href="certificates.html"]').first();
    await expect(certificatesLink).toBeAttached();
    await certificatesLink.click();

    await expect(page).toHaveURL(`${BASE_URL}/certificates.html`);

    const pageTitle = page.locator('title');
    const titleText = await pageTitle.textContent();
    expect(titleText).toContain('Certificates');

    console.log('✓ Test 4 Passed: Certificates page accessible');
  });

  test('3. Contact page smoke test - Verify contact section and all contact links', async ({ page }) => {
    await page.goto(`${BASE_URL}/#contact`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');

    const contactSection = page.locator('section#contact').first();
    await expect(contactSection).toBeVisible({ timeout: 10000 });
    await expect(contactSection.locator('.section-title')).toContainText("Let's Build Something Reliable");

    const emailLink = page.locator('.contact-card[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toContainText('xlautomation8@gmail.com');
    await expect(emailLink).toHaveAttribute('href', 'mailto:xlautomation8@gmail.com');

    const phoneLink = page.locator('.contact-card[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toContainText('+91-7798927033');
    await expect(phoneLink).toHaveAttribute('href', 'tel:+917798927033');

    const linkedinLink = page.locator('.contact-card[href*="linkedin"]').first();
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toContainText('linkedin.com/in/utkarsh-sinha-automation');
    await expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/utkarsh-sinha-automation');

    console.log('✓ Test 3 Passed: Contact page links verified');
  });

  test('4. CV download link - Verify PDF download completes with non-zero file size', async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');

    await openNavigationMenu(page);

    const resumeLink = page.locator('header nav a.nav-link[href*="UTKARSH_SINHA"][href$=".pdf"]').first();
    await expect(resumeLink).toBeAttached();
    await expect(resumeLink).toHaveAttribute('href', /UTKARSH_SINHA.*\.pdf$/i);

    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await resumeLink.click();

    const download = await downloadPromise;
    const suggestedName = download.suggestedFilename();
    expect(suggestedName.toLowerCase()).toContain('.pdf');

    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    if (!downloadPath) {
      throw new Error('Downloaded file path was not available');
    }

    const fileStats = await fs.stat(downloadPath);
    expect(fileStats.size).toBeGreaterThan(0);

    console.log(`✓ Test 4 Passed: CV download verified (${suggestedName}, ${fileStats.size} bytes)`);
  });
});
