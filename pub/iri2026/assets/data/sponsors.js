/**
 * WebPub Sponsors Page Data
 *
 * This file contains the sponsors page content for the dedicated /sponsors route.
 * It is separate from additional-pages.js to avoid conflicts.
 *
 * DEFAULT: Disabled (no sponsors content)
 *
 * When a WebPub is built with sponsors enabled, the backend will overwrite
 * this file with the actual sponsors content:
 *
 * window.WEBPUB_SPONSORS_PAGE = {
 *   enabled: true,
 *   content: "<h2>Our Sponsors</h2>..."
 * };
 *
 * The frontend /sponsors route checks this file to display sponsors content.
 * If enabled is false, the sponsors nav link will not appear.
 *
 * NOTE: We check for existing data to preserve mock data in development mode.
 * The mock-data.initializer.ts sets this before script load.
 */
if (typeof window.WEBPUB_SPONSORS_PAGE === "undefined") {
  window.WEBPUB_SPONSORS_PAGE = {
    enabled: false,
  };
}
