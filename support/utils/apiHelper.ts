// api/helpers/apiClient.ts
import { APIRequestContext, request } from '@playwright/test';

let context: APIRequestContext;

export async function getApiContext(): Promise<APIRequestContext> {

    context = await request.newContext({
        baseURL: 'https://api.practicesoftwaretesting.com',
        extraHTTPHeaders: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Origin': 'https://practicesoftwaretesting.com',
            'Referer': 'https://practicesoftwaretesting.com/',
        },
    });

    return context;
}
