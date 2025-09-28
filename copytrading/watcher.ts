import axios from 'axios';
import { logger } from '../utils/logger.js';
import { env } from '../config.js';

export interface SwapEvent {
  leader: string;
  sig: string;
  inMint: string;
  outMint: string;
  amount: string;
  dex: 'DYORSWAP' | 'PLASMA_ROUTER';
}

/**
 * Generic "recent transactions" polling.
 * Replace `method` and parsing logic for your PlasmaMainnet RPC.
 */
export class LeaderWatcher {
  private since: Record<string,string | null> = {};

  constructor(private rpc = env.RPC_URL) {}

  async pollOnce(leaders: string[]): Promise<SwapEvent[]> {
    const events: SwapEvent[] = [];
    for (const addr of leaders) {
      try {
        const last = this.since[addr];
        const body = {
          jsonrpc: '2.0',
          id: 1,
          method: 'getSignaturesForAddress', // placeholder; adapt to PlasmaMainnet
          params: [addr, { limit: 20, before: last ?? undefined }]
        };
        const { data } = await axios.post(this.rpc, body, { timeout: 15_000 });
        const signatures: any[] = data.result || [];
        if (signatures.length) this.since[addr] = signatures[0]?.signature ?? this.since[addr];

        // TODO: fetch & parse each tx to detect swaps. Here we emit a dummy when a tx exists.
        for (const s of signatures) {
          events.push({
            leader: addr,
            sig: s.signature,
            inMint: 'PLA',
            outMint: 'USDC',
            amount: '1000000',
            dex: 'PLASMA_ROUTER'
          });
        }
      } catch (e:any) {
        logger.warn({ addr, err: e?.message }, 'watcher poll error');
      }
    }
    if (events.length) logger.info({ count: events.length }, 'detected leader txs');
    return events;
  }
}
