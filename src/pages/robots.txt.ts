import type { APIRoute } from 'astro';
import { releaseGates } from '../config/release';

export const GET: APIRoute = ({ site }) => {
  const origin = (site || new URL('https://www.ramuni.id')).toString().replace(/\/$/, '');

  if (!releaseGates.siteIndexable) {
    return new Response('User-agent: *\nAllow: /\n', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\nDisallow: /preview/\nSitemap: ${origin}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
