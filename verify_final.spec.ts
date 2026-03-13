import { test, expect } from '@playwright/test';

test('verify final portfolio v2', async ({ page }) => {
  await page.goto('http://localhost:3000/index.html');

  // Wait for icons and fonts
  await page.waitForTimeout(2000);

  // Take screenshot of the Strategy/Bento section
  const workSection = page.locator('#work');
  await workSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000); // Wait for scroll animations
  await workSection.screenshot({ path: 'portfolio_v2_final_work.png' });

  // Take screenshot of the Hero
  const heroSection = page.locator('section').first();
  await heroSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await heroSection.screenshot({ path: 'portfolio_v2_final_hero.png' });
});
