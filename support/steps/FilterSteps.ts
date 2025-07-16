import { test, Page } from '@playwright/test';
import { HomePage } from "../pages/HomePage"
import Logger from '../utils/logger';

export default class FilterComponentSteps {

    readonly page: Page;
    readonly homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
    }

    async filterItemsByCategory(category: string) {
        await test.step('Load Home Page', async () => {
            await this.homePage.checkLoggedInState('John', 'Doe')
            Logger.onPage('HomePage')
        });
        await test.step(`Filter items by category: ${category}`, async () => {
            Logger.time(`Filter items by categroy: ${category}`)
            await this.homePage.filterItemsByCategory(category)
            Logger.passed(`Category: ${category} passed.`)
        });
    };
}
