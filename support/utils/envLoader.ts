import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.ENV;

if (!env) {
  throw new Error(
    ' ✘ ENV is not set. Please run the test with ENV=yourEnv like:\n  cross-env ENV=SATU8602 playwright test'
  );
}

const envPath = path.resolve(__dirname, `../../configs/${env}.env`);
const secretsPath = path.resolve(__dirname,'../../configs/secrets.env');
const result = dotenv.config({ path: envPath });
const secretsResult = dotenv.config({ path: secretsPath });

if (result.error) {
  throw new Error(` ✘ Failed to load .env.${env} file at: ${envPath}`);
}
if (secretsResult.error) {
  throw new Error(` ✘ Failed to load  secrets ${env} file at: ${secretsPath}`);
}

console.log(` ✓ Loaded environment variables from ${env}.env`);
console.log(` ✓ Loaded secrets for environment ${env}`);
