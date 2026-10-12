import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// The site's intended address. In CI the Pages step passes the real one, so the build
// (asset paths and the absolute link-preview URLs) still matches if the repo is named differently.
const DEFAULT_URL = 'https://alexwilder-dev.github.io/kai-leicester/';
const withSlash = (s: string) => (s.endsWith('/') ? s : `${s}/`);
const siteUrl = withSlash(process.env.SITE_URL || DEFAULT_URL);
const base = withSlash(process.env.BASE_PATH || new URL(siteUrl).pathname);

const absoluteUrls = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll(DEFAULT_URL, siteUrl),
});

export default defineConfig({
  base,
  plugins: [react(), absoluteUrls()],
});
