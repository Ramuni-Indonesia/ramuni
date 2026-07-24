import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site || new URL('https://ramuni.id')).toString().replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nDisallow: /preview/\nSitemap: ${origin}/sitemap-index.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
