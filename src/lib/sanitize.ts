import DOMPurify from 'dompurify';

export const sanitize = (input: string | null | undefined): string => {
  if (!input) return '';
  // Sanitize and escape the input to prevent XSS and HTML injection
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
};
