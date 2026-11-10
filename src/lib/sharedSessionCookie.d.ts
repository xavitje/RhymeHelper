type SyncStorage = { getItem(key: string): string | null; setItem(key: string, value: string): void; removeItem(key: string): void };
export function sharedCookiesEnabled(): boolean;
export function cookieGet(key: string): string | null;
export function cookieSet(key: string, value: string): void;
export function cookieRemove(key: string): void;
export const sharedAuthStorage: SyncStorage;
