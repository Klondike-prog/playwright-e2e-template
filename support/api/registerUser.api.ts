// api/helpers/registerUser.ts
import { APIRequestContext, expect } from '@playwright/test';
import { RegisterUser } from '../interfaces/RegisterUser.interface';

export async function registerUserApi(
    context: APIRequestContext,
    user: RegisterUser
) {
    const response = await context.post('/users/register', {
        data: {
            first_name: user.firstName,
            last_name: user.lastName,
            dob: user.dateOfBirth,
            phone: user.phoneNumber,
            email: user.email,
            password: user.password,
            street: user.street,
            city: user.city,
            state: user.state,
            postal_code: user.postalCode,
            country: user.country,
        },
    });
    const responseBody = await response.json();
    console.log(responseBody)
    expect(response.status()).toBe(201);

}
