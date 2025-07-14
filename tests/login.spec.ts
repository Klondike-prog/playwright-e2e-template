
import { test } from "../support/utils/fixtures";
import { BasePage } from "../support/pages/BasePage";
import Logger from "../support/utils/logger";

// test.use({
// storageState: { cookies: [], origins: [] }
// }) 

test.describe('Login tests', () => {
  test('Visit Opaque HomePage', async ({ page }) => {

    const basePage = new BasePage(page)
    await page.goto('/account/favorites')
    await basePage.checkPageTitle('Favorites')

  });

});

