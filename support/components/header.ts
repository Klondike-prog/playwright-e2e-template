import {Locator, Page} from '@playwright/test';

export default class Header {
    readonly page: Page;
    readonly accountButton: Locator;
    readonly userMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountButton = page.locator('a.account');
        this.userMenu= page.locator('[data-test="nav-menu"]')
    }
}
