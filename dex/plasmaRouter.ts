import axios from 'axios';
import { env } from '../config.js';

export interface QuoteRequest {
  inMint: string;
  outMint: string;
  amount: string; // integer in base units
  slippageBps: number;
  dexWhitelist?: string[];
}

export interface QuoteResponse {
  route: string; // human-readable DEX or pool path
  outAmount: string; // integer base units
  tx: string; // base64-encoded unsigned tx (placeholder format)
}

export class PlasmaRouterClient {
  constructor(private base = env.QUOTE_API_BASE, private apiKey?: string | null) {}

  async getQuote(req: QuoteRequest): Promise<QuoteResponse> {
    const headers: Record<string,string> = {};
    if (env.PLASMA_API_KEY) headers['x-api-key'] = env.PLASMA_API_KEY;
    const { data } = await axios.post(this.base, {
      inputMint: req.inMint,
      outputMint: req.outMint,
      amount: req.amount,
      slippageBps: req.slippageBps,
      dexWhitelist: req.dexWhitelist,
    }, { headers });
    // Expect { route, outAmount, tx }
    return data as QuoteResponse;
  }
}
