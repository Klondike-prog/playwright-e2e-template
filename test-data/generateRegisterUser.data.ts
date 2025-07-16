import { faker } from '@faker-js/faker';
import { RegisterUser } from '../support/interfaces/RegisterUser.interface';

export function generateRegisterUser(): RegisterUser {
  return {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1984-01-01',
    street: faker.location.streetAddress(),
    postalCode: '400200',
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.countryCode(),
    phoneNumber: faker.string.numeric(10),
    email: faker.internet.email().toLowerCase(),
    password: process.env.PASSWORD
  };
}
