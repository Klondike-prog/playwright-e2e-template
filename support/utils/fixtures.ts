
import { test as base, type TestInfo } from "@playwright/test"
import LoginSteps from "../steps/LoginSteps";
import Logger from "./logger";
import FilterComponentSteps from "../steps/FilterSteps";
import RegisterUserApiSteps from "../steps/RegisterUserApiSteps";
import { HomePage } from "../pages/HomePage";


interface CustomOptions {
    email: string;
    password: string;
}
interface CustomFixtures {
    loginSteps: LoginSteps;
    filterComponentSteps: FilterComponentSteps;
    registerUserApiSteps: RegisterUserApiSteps
    homePage: HomePage
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
        Logger.testStart(testInfo.title)
        await use();
    }, { scope: 'test', auto: true }],

    //Step IMPORTS
    loginSteps: async ({ page }, use) => {

        // const loginSteps = new LoginSteps(page);
        // await loginSteps.performLogin(email, password)
        await use(new LoginSteps(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    filterComponentSteps: async ({ page }, use) => {
        await use(new FilterComponentSteps(page));
    },
    registerUserApiSteps: async ({ }, use) => {
        await use(new RegisterUserApiSteps());
    },


})

export { expect } from "@playwright/test"