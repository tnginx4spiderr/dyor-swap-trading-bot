import { DyorswapApi, Pool } from '../dex/dyorswap.js';
import { logger } from '../utils/logger.js';

export interface PoolApr extends Pool {
  feeApr: number;
}

export class PoolScanner {
  private api = new DyorswapApi();

  async scan(): Promise<PoolApr[]> {
    const pools = await this.api.listAllPairs();
    const scored = pools.map(p => ({
      ...p,
      feeApr: p.liquidity > 0 ? (p.volume24h * p.avgFee) / p.liquidity * 365 : 0
    }));
    scored.sort((a,b) => b.feeApr - a.feeApr);
    logger.info({ top: scored[0] }, 'Top DYORSWAP pool by fee APR');
    return scored;
  }
}
