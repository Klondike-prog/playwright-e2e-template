
import { test } from "../support/utils/fixtures";

test.describe('Test filter items component', () => {

    test('Filter items by category type', async ({ filterComponentSteps }) => {
        await filterComponentSteps.filterItemsByCategory('Hammer')
    });

});

