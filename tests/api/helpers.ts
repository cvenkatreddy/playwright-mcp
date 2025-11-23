import { expect, request, APIRequestContext, APIResponse } from '@playwright/test';

export type ApiClient = APIRequestContext;

export interface Activity {
  id: number;
  title: string | null;
  dueDate: string;
  completed: boolean;
}

export interface Author {
  id: number;
  idBook: number;
  firstName: string | null;
  lastName: string | null;
}

export interface Book {
  id: number;
  title: string | null;
  description: string | null;
  pageCount: number;
  excerpt: string | null;
  publishDate: string;
}

export interface CoverPhoto {
  id: number;
  idBook: number;
  url: string | null;
}

export interface User {
  id: number;
  userName: string | null;
  password: string | null;
}

export async function createApiClient(): Promise<ApiClient> {
  return request.newContext({
    baseURL: 'https://fakerestapi.azurewebsites.net',
    extraHTTPHeaders: {
      'Content-Type': 'application/json; v=1.0',
    },
  });
}

export async function expectJsonResponse<T = unknown>(response: APIResponse, status: number): Promise<T> {
  expect(response.status(), `Expected status ${status}, got ${response.status()}`).toBe(status);
  const contentType = response.headers()['content-type'];
  expect(contentType, 'Response should be JSON').toContain('application/json');
  return response.json() as Promise<T>;
}

export function expectActivity(activity: Activity, message?: string): void {
  expect(activity, message).toMatchObject({
    id: expect.any(Number),
    dueDate: expect.any(String),
    completed: expect.any(Boolean),
  });
}

export function expectAuthor(author: Author, message?: string): void {
  expect(author, message).toMatchObject({
    id: expect.any(Number),
    idBook: expect.any(Number),
  });
}

export function expectBook(book: Book, message?: string): void {
  expect(book, message).toMatchObject({
    id: expect.any(Number),
    pageCount: expect.any(Number),
    publishDate: expect.any(String),
  });
}

export function expectCoverPhoto(cover: CoverPhoto, message?: string): void {
  expect(cover, message).toMatchObject({
    id: expect.any(Number),
    idBook: expect.any(Number),
  });
}

export function expectUser(user: User, message?: string): void {
  expect(user, message).toMatchObject({
    id: expect.any(Number),
  });
}
