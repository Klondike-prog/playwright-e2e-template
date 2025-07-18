# 🎭 Playwright

[![npm version](https://img.shields.io/npm/v/playwright.svg)](https://www.npmjs.com/package/playwright) <!-- GEN:chromium-version-badge -->[![Chromium version](https://img.shields.io/badge/chromium-139.0.7258.31-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)<!-- GEN:stop --> <!-- GEN:firefox-version-badge -->[![Firefox version](https://img.shields.io/badge/firefox-140.0.2-blue.svg?logo=firefoxbrowser)](https://www.mozilla.org/en-US/firefox/new/)<!-- GEN:stop --> <!-- GEN:webkit-version-badge -->[![WebKit version](https://img.shields.io/badge/webkit-26.0-blue.svg?logo=safari)](https://webkit.org/)<!-- GEN:stop --> [![Join Discord](https://img.shields.io/badge/join-discord-informational)](https://aka.ms/playwright/discord)

## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

## Scope

The scope of the project represents a template for playwright E2E Tests using TypeScript based off POM (Page Object Model). All tests are performed on a mock website called [practicesoftwaretesting](https://practicesoftwaretesting.com) 
The template is set for multiple environments (stage and dev), but you can add as many envs as you wish.


## Installation

Playwright has its own test runner for end-to-end tests, we call it Playwright Test.

Add dependency and install browsers.

```Shell
npm i -D @playwright/test
# install supported browsers
npx playwright install
```

You can optionally install only selected browsers, see [install browsers](https://playwright.dev/docs/cli#install-browsers) for more details. Or you can install no browsers at all and use existing [browser channels](https://playwright.dev/docs/browsers).

## Dependencies
```Shell
# install package.json dependencies
npm install
```
## Set secrets environment variables
```Shell
# Create a secrets.env file in configs/ 
# set password=yourPassword inside the file, in order to run the current test suite, otherwise tests will fail.
configs/secrets.env/
password=yourPassword
```

## Run Tests

```Shell
npm run test:stage
npm run test:dev
```
## Generate Log Index html

```Shell
npm run post:test

```

## Resources

* [Documentation](https://playwright.dev)
* [API reference](https://playwright.dev/docs/api/class-playwright/)
* [Contribution guide](CONTRIBUTING.md)
* [Changelog](https://github.com/microsoft/playwright/releases)
