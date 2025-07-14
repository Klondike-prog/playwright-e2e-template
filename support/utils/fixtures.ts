
import { test as base, type TestInfo } from "@playwright/test"
import LoginSteps from "../steps/LoginSteps";
import Logger from "./logger";

interface CustomOptions {
    email: string;
    password: string;
}
interface CustomFixtures {
    loginSteps: LoginSteps;
    initializeLogger: Logger;
    forEachTest: void;
}

export const test = base.extend<CustomFixtures, CustomOptions>({
    email: [async ({ }) => { }, { scope: 'worker', option: true }],
    password: [async ({ }) => { }, { scope: 'worker', option: true }],

    forEachTest: [async ({ }, use, testInfo: TestInfo) => {
        Logger.initializeLogger(
            testInfo.title,
            testInfo.workerIndex,
            testInfo.file
        );
        await use();
    }, { scope: 'test', auto: true }],

    //Step IMPORTS
    loginSteps: async ({ page, email, password }, use) => {

        const loginSteps = new LoginSteps(page);
        await loginSteps.performLogin(email, password)

        await use(loginSteps);
    },




})

export { expect } from "@playwright/test"