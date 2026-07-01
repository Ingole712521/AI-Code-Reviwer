import { config } from 'dotenv';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootEnv = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../../.env');
const localEnv = resolve(fileURLToPath(new URL('.', import.meta.url)), '../.env');

if (existsSync(rootEnv)) {
  config({ path: rootEnv });
} else if (existsSync(localEnv)) {
  config({ path: localEnv });
} else {
  config();
}
