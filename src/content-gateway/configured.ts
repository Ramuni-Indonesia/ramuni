import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { CandidateOverlayGateway } from './candidate-overlay';
import { CmsDeliveryGateway } from './cms-delivery';
import { HybridContentGateway } from './hybrid';
import { parseProviderCandidate } from './normalization';
import type { ContentSourceMode, MarketingContentGateway } from './types';

const MAX_CANDIDATE_BYTES = 6 * 1024 * 1024;

function required(env: NodeJS.ProcessEnv, name: string): string {
  const value = env[name]?.trim();
  if (!value) throw new Error(`${name} is required for the selected CMS content source`);
  return value;
}

async function deliveryToken(env: NodeJS.ProcessEnv): Promise<string> {
  if (env.RAMUNI_CMS_DELIVERY_TOKEN_FILE?.trim()) {
    const path = resolve(env.RAMUNI_CMS_DELIVERY_TOKEN_FILE);
    const metadata = await stat(path);
    if (!metadata.isFile() || (metadata.mode & 0o077) !== 0) throw new Error('RAMUNI_CMS_DELIVERY_TOKEN_FILE must have protected permissions');
    const value = (await readFile(path, 'utf8')).trim();
    if (!value) throw new Error('RAMUNI_CMS_DELIVERY_TOKEN_FILE is empty');
    return value;
  }
  return required(env, 'RAMUNI_CMS_DELIVERY_TOKEN');
}

export async function createConfiguredContentGateway(input: { local: MarketingContentGateway; env?: NodeJS.ProcessEnv }): Promise<MarketingContentGateway> {
  const env = input.env ?? process.env;
  const source = (env.RAMUNI_CONTENT_SOURCE?.trim() || 'local') as ContentSourceMode;
  if (source === 'local') return input.local;
  if (source !== 'cms-active' && source !== 'cms-candidate') throw new Error(`Unsupported RAMUNI_CONTENT_SOURCE: ${source}`);
  const locale = env.RAMUNI_CMS_LOCALE?.trim() || 'id-ID';
  const cms = new CmsDeliveryGateway({ baseUrl: required(env, 'RAMUNI_CMS_BASE_URL'), token: await deliveryToken(env), locale });
  if (source === 'cms-active') return cms;
  const active = env.RAMUNI_CMS_MIGRATION_FALLBACK === 'local' ? new HybridContentGateway(input.local, cms, locale) : cms;
  const candidatePath = resolve(required(env, 'RAMUNI_CMS_CANDIDATE_FILE'));
  const metadata = await stat(candidatePath);
  if (!metadata.isFile() || metadata.size > MAX_CANDIDATE_BYTES) throw new Error('CMS candidate file is invalid or exceeds 6 MiB');
  const candidate = parseProviderCandidate(JSON.parse(await readFile(candidatePath, 'utf8')));
  return new CandidateOverlayGateway(active, candidate, {
    eventId: required(env, 'RAMUNI_CMS_EVENT_ID'), snapshotId: required(env, 'RAMUNI_CMS_SNAPSHOT_ID'), revisionHash: required(env, 'RAMUNI_CMS_REVISION_HASH'),
  });
}
