import { loadConfig } from './config.mjs';
import { createProviderService } from './server.mjs';
import { ProviderStore } from './store.mjs';
const config = loadConfig();
const store = new ProviderStore(config.databasePath); store.recover();
const service = createProviderService({ config, store });
service.server.listen(config.port, config.bindHost, () => process.stdout.write(`ramuni-cms-build-provider listening on ${config.bindHost}:${config.port}\n`));
const stop = async () => { await service.stop(); store.close(); process.exit(0); };
process.once('SIGTERM', stop); process.once('SIGINT', stop);
