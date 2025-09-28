import axios from 'axios';

export interface Pool {
  id: string;
  liquidity: number;
  volume24h: number;
  avgFee: number; // decimal, e.g. 0.0025
  baseMint: string;
  quoteMint: string;
}

export class DyorswapApi {
  constructor(private base = 'https://dyorswap-api.plasma/dex') {}

  async listAllPairs(): Promise<Pool[]> {
    const { data } = await axios.get(`${this.base}/pair/all`);
    return data as Pool[];
  }
}
