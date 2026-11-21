// Site constants for icemakersale.com
export const ORIGIN = 'https://icemakersale.com';
export const SITE = 'Ice Maker Sale';
export const WRITER = 'Kevin Marsh';
export const ISO = '2026-11-21';
export const AS_OF = 'November 21, 2026';
export const INDEXNOW_KEY = 'c598aca3a939be83cb5963cd1bbe0ae0';
// Amazon links live here so the Associates tag can be added in one place later.
export const AMZ_TAG = '';
export const amz = (query) => `https://www.amazon.com/s?k=${encodeURIComponent(query)}${AMZ_TAG ? `&tag=${AMZ_TAG}` : ''}`;
export const safe = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
