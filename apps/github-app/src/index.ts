import './load-env.js';
import { BullMqReviewQueue } from '@ai-pr-reviewer/queue';
import { loadConfig } from './config.js';
import { createServer } from './server.js';

async function main() {
  const config = loadConfig();
  const reviewQueue = new BullMqReviewQueue(config.REDIS_URL);
  const app = createServer({ config, reviewQueue });

  const shutdown = async () => {
    await reviewQueue.close();
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => {
    void shutdown();
  });

  process.on('SIGTERM', () => {
    void shutdown();
  });

  await app.listen({
    host: '0.0.0.0',
    port: config.PORT,
  });
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
