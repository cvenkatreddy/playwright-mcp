import { test, expect } from '@playwright/test';
import {
  createApiClient,
  expectJsonResponse,
  expectActivity,
  expectAuthor,
  expectBook,
  expectCoverPhoto,
  expectUser,
  Activity,
  Author,
  Book,
  CoverPhoto,
  User,
  ApiClient,
} from './helpers';

let client: ApiClient;

test.beforeAll(async () => {
  client = await createApiClient();
});

test.afterAll(async () => {
  await client.dispose();
});

test.describe.configure({ mode: 'serial' });

test.describe('Activities endpoints', () => {
  test('GET /api/v1/Activities returns activity list', async () => {
    const response = await client.get('/api/v1/Activities');
    const activities = await expectJsonResponse<Activity[]>(response, 200);
    expect(Array.isArray(activities)).toBeTruthy();
    for (const activity of activities) {
      expectActivity(activity);
    }
  });

  test('POST /api/v1/Activities creates activity', async () => {
    const payload = {
      id: 9999,
      title: 'Playwright API Activity',
      dueDate: new Date().toISOString(),
      completed: false,
    } satisfies Activity;

    const response = await client.post('/api/v1/Activities', { data: payload });
    const created = await expectJsonResponse<Activity>(response, 200);
    expectActivity(created);
    expect(created.title).toBe(payload.title);
  });

  test('GET /api/v1/Activities/{id}', async () => {
    const response = await client.get('/api/v1/Activities/1');
    const activity = await expectJsonResponse<Activity>(response, 200);
    expectActivity(activity);
    expect(activity.id).toBe(1);
  });

  test('PUT /api/v1/Activities/{id} updates activity', async () => {
    const payload = {
      id: 1,
      title: 'Updated activity',
      dueDate: new Date().toISOString(),
      completed: true,
    } satisfies Activity;

    const response = await client.put('/api/v1/Activities/1', { data: payload });
    const updated = await expectJsonResponse<Activity>(response, 200);
    expectActivity(updated);
    expect(updated.title).toBe(payload.title);
    expect(updated.completed).toBe(true);
  });

  test('DELETE /api/v1/Activities/{id} deletes activity', async () => {
    const response = await client.delete('/api/v1/Activities/1');
    expect(response.status()).toBe(200);
  });
});

test.describe('Authors endpoints', () => {
  test('GET /api/v1/Authors returns authors list', async () => {
    const response = await client.get('/api/v1/Authors');
    const authors = await expectJsonResponse<Author[]>(response, 200);
    expect(Array.isArray(authors)).toBeTruthy();
    for (const author of authors) {
      expectAuthor(author);
    }
  });

  test('POST /api/v1/Authors creates author', async () => {
    const payload = {
      id: 9999,
      idBook: 1,
      firstName: 'Playwright',
      lastName: 'Tester',
    } satisfies Author;

    const response = await client.post('/api/v1/Authors', { data: payload });
    const created = await expectJsonResponse<Author>(response, 200);
    expectAuthor(created);
    expect(created.firstName).toBe(payload.firstName);
  });

  test('GET /api/v1/Authors/{id}', async () => {
    const response = await client.get('/api/v1/Authors/1');
    const author = await expectJsonResponse<Author>(response, 200);
    expectAuthor(author);
    expect(author.id).toBe(1);
  });

  test('PUT /api/v1/Authors/{id} updates author', async () => {
    const payload = {
      id: 1,
      idBook: 1,
      firstName: 'Updated',
      lastName: 'Author',
    } satisfies Author;

    const response = await client.put('/api/v1/Authors/1', { data: payload });
    const updated = await expectJsonResponse<Author>(response, 200);
    expectAuthor(updated);
    expect(updated.firstName).toBe(payload.firstName);
  });

  test('DELETE /api/v1/Authors/{id} deletes author', async () => {
    const response = await client.delete('/api/v1/Authors/1');
    expect(response.status()).toBe(200);
  });
});

test.describe('Books endpoints', () => {
  test('GET /api/v1/Books returns books list', async () => {
    const response = await client.get('/api/v1/Books');
    const books = await expectJsonResponse<Book[]>(response, 200);
    expect(Array.isArray(books)).toBeTruthy();
    for (const book of books) {
      expectBook(book);
    }
  });

  test('POST /api/v1/Books creates book', async () => {
    const payload = {
      id: 9999,
      title: 'Playwright Book',
      description: 'Testing fake REST API',
      pageCount: 123,
      excerpt: 'Excerpt text',
      publishDate: new Date().toISOString(),
    } satisfies Book;

    const response = await client.post('/api/v1/Books', { data: payload });
    const created = await expectJsonResponse<Book>(response, 200);
    expectBook(created);
    expect(created.title).toBe(payload.title);
  });

  test('GET /api/v1/Books/{id}', async () => {
    const response = await client.get('/api/v1/Books/1');
    const book = await expectJsonResponse<Book>(response, 200);
    expectBook(book);
    expect(book.id).toBe(1);
  });

  test('PUT /api/v1/Books/{id} updates book', async () => {
    const payload = {
      id: 1,
      title: 'Updated book',
      description: 'Updated description',
      pageCount: 321,
      excerpt: 'Updated excerpt',
      publishDate: new Date().toISOString(),
    } satisfies Book;

    const response = await client.put('/api/v1/Books/1', { data: payload });
    const updated = await expectJsonResponse<Book>(response, 200);
    expectBook(updated);
    expect(updated.title).toBe(payload.title);
  });

  test('DELETE /api/v1/Books/{id} deletes book', async () => {
    const response = await client.delete('/api/v1/Books/1');
    expect(response.status()).toBe(200);
  });
});

test.describe('CoverPhotos endpoints', () => {
  test('GET /api/v1/CoverPhotos returns list', async () => {
    const response = await client.get('/api/v1/CoverPhotos');
    const covers = await expectJsonResponse<CoverPhoto[]>(response, 200);
    expect(Array.isArray(covers)).toBeTruthy();
    for (const cover of covers) {
      expectCoverPhoto(cover);
    }
  });

  test('POST /api/v1/CoverPhotos creates cover photo', async () => {
    const payload = {
      id: 9999,
      idBook: 1,
      url: 'https://example.com/cover',
    } satisfies CoverPhoto;

    const response = await client.post('/api/v1/CoverPhotos', { data: payload });
    const created = await expectJsonResponse<CoverPhoto>(response, 200);
    expectCoverPhoto(created);
    expect(created.url).toBe(payload.url);
  });

  test('GET /api/v1/CoverPhotos/{id}', async () => {
    const response = await client.get('/api/v1/CoverPhotos/1');
    const cover = await expectJsonResponse<CoverPhoto>(response, 200);
    expectCoverPhoto(cover);
    expect(cover.id).toBe(1);
  });

  test('PUT /api/v1/CoverPhotos/{id} updates cover photo', async () => {
    const payload = {
      id: 1,
      idBook: 1,
      url: 'https://example.com/cover-updated',
    } satisfies CoverPhoto;

    const response = await client.put('/api/v1/CoverPhotos/1', { data: payload });
    const updated = await expectJsonResponse<CoverPhoto>(response, 200);
    expectCoverPhoto(updated);
    expect(updated.url).toBe(payload.url);
  });

  test('DELETE /api/v1/CoverPhotos/{id} deletes cover photo', async () => {
    const response = await client.delete('/api/v1/CoverPhotos/1');
    expect(response.status()).toBe(200);
  });
});

test.describe('Users endpoints', () => {
  test('GET /api/v1/Users returns list', async () => {
    const response = await client.get('/api/v1/Users');
    const users = await expectJsonResponse<User[]>(response, 200);
    expect(Array.isArray(users)).toBeTruthy();
    for (const user of users) {
      expectUser(user);
    }
  });

  test('POST /api/v1/Users creates user', async () => {
    const payload = {
      id: 9999,
      userName: 'playwright-user',
      password: 'secret',
    } satisfies User;

    const response = await client.post('/api/v1/Users', { data: payload });
    expect(response.status()).toBe(200);
  });

  test('GET /api/v1/Users/{id}', async () => {
    const response = await client.get('/api/v1/Users/1');
    const user = await expectJsonResponse<User>(response, 200);
    expectUser(user);
    expect(user.id).toBe(1);
  });

  test('PUT /api/v1/Users/{id} updates user', async () => {
    const payload = {
      id: 1,
      userName: 'updated-user',
      password: 'updated',
    } satisfies User;

    const response = await client.put('/api/v1/Users/1', { data: payload });
    expect(response.status()).toBe(200);
  });

  test('DELETE /api/v1/Users/{id} deletes user', async () => {
    const response = await client.delete('/api/v1/Users/1');
    expect(response.status()).toBe(200);
  });
});
