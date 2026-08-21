import DOMPurify from 'dompurify';

/**
 * Sanitizes input text to prevent XSS attacks.
 * Strips all HTML tags by default.
 */
export const sanitizeInput = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [], // Strip all HTML tags
    ALLOWED_ATTR: []  // Strip all attributes
  });
};
