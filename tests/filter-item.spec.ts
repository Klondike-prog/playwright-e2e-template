
import { base } from "@faker-js/faker";
import { test } from "../support/utils/fixtures";

test.describe('Test filter items component', () => {

    test('Filter items by category type', async ({ filterComponentSteps, basePage }) => {
        await filterComponentSteps.filterItemsByCategory('Hammer')
        await basePage.visualComparison('filter-by-hammer.png')
    });

});

