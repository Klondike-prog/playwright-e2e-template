import { test, Page } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import Logger from '../utils/logger';
import { RegisterUser } from '../interfaces/RegisterUser.interface';
import { getApiContext } from '../utils/apiHelper';
import { registerUserApi } from '../api/registerUser.api';

export default class RegisterUserApiSteps {
    async performRegisterUserApi(user: RegisterUser) {
        await test.step(`Register new User via API : ${user.email}`, async () => {
            Logger.onPage('Register User API')
            const apiContext = await getApiContext();
            await registerUserApi(apiContext, user);
            Logger.passed(`Registered user: ${user.email}`)
        });
    };
}
