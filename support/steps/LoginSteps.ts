import { test, Page } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import Logger from '../utils/logger';

export default class LoginSteps {

    readonly page: Page;
    readonly loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    async performLogin(email: string, password: string) {
        await test.step('Load Login Page', async () => {
            await this.loginPage.load();
            Logger.onPage('LoginPage')
        });
        await test.step(`Fill and submit login form. user: ${email}, password: ${password}`, async () => {
            await this.loginPage.fillAndSubmitLogin(email, password)
            Logger.passed(`Logged in with user:\n name:${email}\n pass: ${password}`)
        });
    };
}
