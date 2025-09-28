import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  RPC_URL: z.string().url(),
  WALLET_SECRET_KEY: z.string(),
  LEADER_ADDRESSES: z.string().default(''),
  MAX_TRADE_QUOTE: z.coerce.number().int().nonnegative().default(0),
  SLIPPAGE_BPS: z.coerce.number().int().min(0).default(100),
  DEX_WHITELIST: z.string().default(''),
  PLASMA_API_KEY: z.string().optional().nullable(),
  QUOTE_API_BASE: z.string().url().optional().default('https://api.plasma.router/quote'),
  LOG_LEVEL: z.string().default('info'),
  DB_PATH: z.string().default('./data/trades.db'),
});

export type Env = z.infer<typeof EnvSchema>;

export const env: Env = EnvSchema.parse(process.env);

export const leaders = env.LEADER_ADDRESSES.split(',').map(s => s.trim()).filter(Boolean);
