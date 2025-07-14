import { expect, Locator, Page } from '@playwright/test';
import Header from "../components/header";
import Logger from '../utils/logger';

export class BasePage {
    readonly page: Page;
    readonly header: Header;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this. pageTitle= this.getByDataTestId('page-title')
    }
     getByDataTestId(dataTestId: string){
        return this.page.locator(`[data-test="${dataTestId}"]`)
    }

    async checkPageTitle(title: string) {
        await expect(this.pageTitle).toHaveText(title);
        Logger.passed(`Title ${title} has been found`)
    }
  
}
