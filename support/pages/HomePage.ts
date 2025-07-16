import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/logger';


export class HomePage extends BasePage {

    readonly cardBody: Locator;

    constructor(page: Page) {
        super(page);
        this.cardBody = this.getByClass('card-body')
    }

    getCheckboxByLabel(label: string): Locator {
        return this.page.locator('label', { hasText: label }).locator('input[type="checkbox"]')
    }

    async load() {
        await this.page.goto('/');
    }
    async checkLoggedInState(firstName: string, lastName: string) {
        await this.load();
        Logger.onPage('HomePage')
        await this.assertMenu(firstName, lastName)
        Logger.passed(`Check Logged In state for user: ${firstName} ${lastName}`)
    };
    async filterItemsByCategory(category: string) {
        await this.clickItemFilter(category)
        await this.assertItemFilter(category)
    }
    async clickItemFilter(label: string) {
        await this.getCheckboxByLabel(label).click()
    }

    async assertItemFilter(label: string) {
        const regex = new RegExp(label, 'i');
        for (let i = 0; i < await this.cardBody.count(); i++) {
            await expect(this.cardBody.nth(i)).toContainText(regex)
        }
        Logger.passed(`Total of ${await this.cardBody.count()} cards found with word: ${label}`)
    }
    async assertMenu(firstName: string, lastName: string) {
        await expect(this.header.userMenu).toBeVisible()
        await expect(this.header.userMenu).toContainText(`${firstName} ${lastName}`)
    }

}
