import { Browser, BrowserContext, chromium, Page } from '@playwright/test';
import './envLoader';
import fs from 'fs-extra';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';

console.log('\n   Global setup starting...\n');

export default async () => {
  const env = process.env.ENV || 'SATU8602';

  const foldersToClean = [
    path.resolve(__dirname, `../../reporters/junit-report-${env}`),
    path.resolve(__dirname, `../../reporters/html-report-${env}`),
    path.resolve(__dirname, `../../test-results/test-results-${env}`),
    path.resolve(__dirname, '../logs/')
  ];

  for (const folder of foldersToClean) {
    try {
      if (fs.existsSync(folder)) {
        await fs.remove(folder);
        console.log(` ✓ Cleaned folder: ${folder}`);
      }
    } catch (err) {
      console.error(` ✗ Failed to clean folder: ${folder}`, err);
    }
  }

  console.log('\n ✓ Global setup completed\n');

  const browser: Browser = await chromium.launch({ headless: false });

  const context: BrowserContext = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  const page: Page = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.load();

  await loginPage.fillAndSubmitLogin(process.env.email, process.env.password);

  await page.waitForTimeout(2000);

  await context.storageState({ path: `./.auth/${process.env.ENV}_state.json` });
  console.log(`\n ✓ Generated state: ./.auth/${process.env.ENV}_state.json\n`);

  await browser.close();
};
