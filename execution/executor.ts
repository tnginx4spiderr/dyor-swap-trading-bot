import { PlasmaRouterClient } from '../dex/plasmaRouter.js';
import { signTransaction } from '../utils/wallet.js';
import axios from 'axios';
import { env } from '../config.js';
import { logger } from '../utils/logger.js';

export class Executor {
  private router = new PlasmaRouterClient();

  async mirrorSwap(opts: {
    inMint: string;
    outMint: string;
    amount: string;
    slippageBps: number;
    dexWhitelist?: string[];
    secret: string;
  }): Promise<{ txid: string; route: string; outAmount: string }> {
    const q = await this.router.getQuote({
      inMint: opts.inMint,
      outMint: opts.outMint,
      amount: opts.amount,
      slippageBps: opts.slippageBps,
      dexWhitelist: opts.dexWhitelist
    });

    // Decode base64 (placeholder), sign, and send via RPC
    const unsignedTx = Buffer.from(q.tx, 'base64');
    const signed = await signTransaction(unsignedTx, opts.secret);

    const { data } = await axios.post(env.RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'sendRawTransaction', // placeholder for PlasmaMainnet
      params: [Buffer.from(signed).toString('base64')]
    }, { timeout: 20_000 });

    const txid = data.result || 'UNKNOWN_TX';
    logger.info({ txid, route: q.route, outAmount: q.outAmount }, 'executed swap');
    return { txid, route: q.route, outAmount: q.outAmount };
  }
}
