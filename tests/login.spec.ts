
import { generateRegisterUser } from "../test-data/generateRegisterUser.data";
import { test } from "../support/utils/fixtures";

const user = generateRegisterUser()
test.use({
  storageState: { cookies: [], origins: [] }
})

test.describe('Login tests', () => {

  test.beforeEach('Register User via API', async ({ registerUserApiSteps }) => {
    await registerUserApiSteps.performRegisterUserApi(user)
  });

  test(`Login with User via UI`, async ({ loginSteps }) => {
    await loginSteps.performLogin(user.email, process.env.password)
  });

});




