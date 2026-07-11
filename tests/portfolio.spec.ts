import { test, expect } from '@playwright/test';

const BASE_URL = 'https://utkarsh.site';

test.describe('Utkarsh Sinha Portfolio Website - Full Test Suite', () => {
  
  // Test 1: Home page and hero content
  test('1. Home page and hero content - Verify hero section displays correct content and metrics', async ({ page }) => {
    // Navigate to home page
    await page.goto(`${BASE_URL}/`);
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Verify main name text shows "Utkarsh Sinha" as a heading
    const nameHeading = page.locator('h1');
    await expect(nameHeading).toContainText('Utkarsh Sinha');
    
    // Verify the role text shows "QA Automation Architect" and "AI-Driven Quality Engineering Leader"
    const roleHeading = page.locator('h2').first();
    await expect(roleHeading).toContainText('QA Automation Architect');
    await expect(roleHeading).toContainText('AI-Driven Quality Engineering Leader');
    
    // Verify metrics in the hero section
    const pageContent = page.locator('body');
    await expect(pageContent).toContainText('18+ years');
    await expect(pageContent).toContainText('70% automation coverage');
    await expect(pageContent).toContainText('99.5% production stability');
    await expect(pageContent).toContainText('20+ engineers mentored');
    
    console.log('✓ Test 1 Passed: Hero content verified');
  });

  // Test 2: Top navigation anchor behavior
  test('2. Top navigation anchor behavior - Verify navigation links scroll to correct sections', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    // Test home link
    await page.click('a[href="#home"]');
    await expect(page).toHaveURL(`${BASE_URL}/#home`);
    
    // Test about link
    await page.click('nav a[href="#about"]');
    await expect(page).toHaveURL(`${BASE_URL}/#about`);
    const aboutSection = page.locator('text=01 · about');
    await expect(aboutSection).toBeVisible();
    
    // Test experience link
    await page.click('nav a[href="#experience"]');
    await expect(page).toHaveURL(`${BASE_URL}/#experience`);
    const experienceSection = page.locator('text=02 · experience');
    await expect(experienceSection).toBeVisible();
    
    // Test skills link
    await page.click('nav a[href="#skills"]');
    await expect(page).toHaveURL(`${BASE_URL}/#skills`);
    const skillsSection = page.locator('text=03 · skills');
    await expect(skillsSection).toBeVisible();
    
    // Test projects link
    await page.click('nav a[href="#projects"]');
    await expect(page).toHaveURL(`${BASE_URL}/#projects`);
    const projectsSection = page.locator('text=04 · projects');
    await expect(projectsSection).toBeVisible();
    
    // Test education link
    await page.click('a[href="#education"]');
    await expect(page).toHaveURL(`${BASE_URL}/#education`);
    const educationSection = page.locator('text=05 · education');
    await expect(educationSection).toBeVisible();
    
    // Test contact link
    await page.click('nav a[href="#contact"]');
    await expect(page).toHaveURL(`${BASE_URL}/#contact`);
    const contactSection = page.locator('text=06 · contact');
    await expect(contactSection).toBeVisible();
    
    console.log('✓ Test 2 Passed: All navigation links working');
  });

  // Test 3: Hero CTAs routing
  test('3. Hero CTAs routing - Verify CTA buttons navigate to correct sections', async ({ page }) => {
    await page.goto(`${BASE_URL}/#home`);
    await page.waitForLoadState('networkidle');
    
    // Test "get in touch" button - should navigate to contact section
    const getInTouchBtn = page.locator('a[href="#contact"].btn-primary, button:has-text("get in touch")').first();
    await getInTouchBtn.click();
    await expect(page).toHaveURL(`${BASE_URL}/#contact`);
    const contactHeading = page.locator('text=Let\'s Build Something Reliable');
    await expect(contactHeading).toBeVisible();
    
    // Go back to home
    await page.goto(`${BASE_URL}/#home`);
    await page.waitForLoadState('networkidle');
    
    // Test "view work" button - should navigate to projects section
    const viewWorkBtn = page.locator('a[href="#projects"].btn-outline, button:has-text("view work")').first();
    await viewWorkBtn.click();
    await expect(page).toHaveURL(`${BASE_URL}/#projects`);
    const projectsHeading = page.locator('text=Selected Work');
    await expect(projectsHeading).toBeVisible();
    
    console.log('✓ Test 3 Passed: Hero CTAs routing working');
  });

  // Test 4: Certificates page link
  test('4. Certificates page link - Verify certificates page navigates and loads', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    // Locate and click "view certificates" link
    const certificatesLink = page.locator('a[href="certificates.html"]');
    await expect(certificatesLink).toBeVisible();
    await certificatesLink.click();
    
    // Verify the browser navigates to certificates.html
    await expect(page).toHaveURL(`${BASE_URL}/certificates.html`);
    
    // Verify that the new page loads successfully (no 404 error)
    // Check for page title
    const pageTitle = page.locator('title');
    const titleText = await pageTitle.textContent();
    expect(titleText).toContain('Certificates');
    
    console.log('✓ Test 4 Passed: Certificates page accessible');
  });

  // Test 5: Resume PDF download
  test('5. Resume PDF download - Verify resume PDF link is accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState('networkidle');
    
    // Locate the "get resume" link
    const resumeLink = page.locator('a[href*="UTKARSH_SINHA"]');
    await expect(resumeLink).toBeVisible();
    
    // Verify the correct href
    const href = await resumeLink.getAttribute('href');
    expect(href).toContain('assets/UTKARSH_SINHA_18Years_Automation_AI_Expert.pdf');
    
    // Verify it's an absolute or relative path to the PDF
    expect(href).toMatch(/\.pdf$/);
    
    console.log('✓ Test 5 Passed: Resume PDF link verified');
  });

  // Test 6: Email contact link
  test('6. Email contact link - Verify email link uses mailto protocol', async ({ page }) => {
    await page.goto(`${BASE_URL}/#contact`);
    await page.waitForLoadState('networkidle');
    
    // Locate the email contact link
    const emailLink = page.locator('a[href*="mailto"]');
    await expect(emailLink).toBeVisible();
    
    // Verify the email address text
    const emailText = await emailLink.textContent();
    expect(emailText).toContain('xlautomation8@gmail.com');
    
    // Verify the href uses mailto protocol
    const emailHref = await emailLink.getAttribute('href');
    expect(emailHref).toBe('mailto:xlautomation8@gmail.com');
    
    console.log('✓ Test 6 Passed: Email contact link verified');
  });

  // Test 7: Phone contact link
  test('7. Phone contact link - Verify phone link uses tel protocol', async ({ page }) => {
    await page.goto(`${BASE_URL}/#contact`);
    await page.waitForLoadState('networkidle');
    
    // Locate the phone contact link
    const phoneLink = page.locator('a[href*="tel"]');
    await expect(phoneLink).toBeVisible();
    
    // Verify the phone number text
    const phoneText = await phoneLink.textContent();
    expect(phoneText).toContain('+91-7798927033');
    
    // Verify the href uses tel protocol with correct format
    const phoneHref = await phoneLink.getAttribute('href');
    expect(phoneHref).toBe('tel:+917798927033');
    
    console.log('✓ Test 7 Passed: Phone contact link verified');
  });

  // Test 8: LinkedIn profile link
  test('8. LinkedIn profile link - Verify LinkedIn link is accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/#contact`);
    await page.waitForLoadState('networkidle');
    
    // Locate the LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin"]');
    await expect(linkedinLink).toBeVisible();
    
    // Verify the LinkedIn URL
    const linkedinText = await linkedinLink.textContent();
    expect(linkedinText).toContain('linkedin.com/in/utkarsh-sinha-automation');
    
    // Verify the href is correct
    const linkedinHref = await linkedinLink.getAttribute('href');
    expect(linkedinHref).toBe('https://linkedin.com/in/utkarsh-sinha-automation');
    
    console.log('✓ Test 8 Passed: LinkedIn profile link verified');
  });

});
