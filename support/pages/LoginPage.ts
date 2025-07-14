import { Locator, Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import Logger from '../utils/logger';

export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitLoginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = this.getByDataTestId('email')
        this.passwordInput = this.getByDataTestId('password')
        this.submitLoginButton = this.getByDataTestId('login-submit')
    }

    async load() {
        await this.loadEndpoint('/auth/login')
    }
    async loadEndpoint(endpoint: string) {
        const fullURL = `${process.env.baseURL}${endpoint}`;
        await this.page.goto(fullURL);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async submitLogin() {
        await this.submitLoginButton.click();
    }

    async fillAndSubmitLogin(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submitLogin();
     
    }
}
