import { test, expect } from '@playwright/test';

test.describe.parallel('@api API client tests (ReqRes)', () => {
  const baseUrl = 'https://reqres.in/api';
  const apiKey = 'free_user_3Efe1u5p1dqSA5Ox6e3aA0Lyazw';

  test('GET -> returns list of users', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?page=2`, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).not.toHaveProperty('error');
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('POST -> create new user', async ({ request }) => {
    const payload = {
      name: 'Stefan',
      job: 'QA Automation',
    };
    const response = await request.post(`${baseUrl}/users`, {
      data: payload,
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    expect(response.status()).toBe(201);
  });

  test('POST -> log in without password', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('GET -> send request with wrong api key', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?page=2`, {
      headers: {
        'x-api-key': 'GREGESHEN_KLIUCH_123',
        'Content-Type': 'application/json',
      },
    });

    // expect(response.status()).not.toBe(200);

    const body = await response.json();
    console.log(body);
    expect(body).toHaveProperty('error');
  });
});
