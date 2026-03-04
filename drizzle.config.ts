import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const DATABASE_URL = "postgresql://neondb_owner:npg_6cy8FZKMgHYL@ep-polished-resonance-a12wz94z-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

console.log("Environment variable: ", process.env);  // Add this line to debug
export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
