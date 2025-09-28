import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

export interface TradeLog {
  ts: number;
  leader: string;
  inMint: string;
  outMint: string;
  amountIn: string;
  amountOut?: string;
  route: string;
  txid: string;
  status: 'EXECUTED' | 'FAILED';
}

export class TradeDB {
  private db: Database.Database;

  constructor(public path: string) {
    mkdirSync(dirname(path), { recursive: true });
    this.db = new Database(path);
    this.db.pragma('journal_mode = wal');
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS trades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts INTEGER NOT NULL,
        leader TEXT NOT NULL,
        in_mint TEXT NOT NULL,
        out_mint TEXT NOT NULL,
        amount_in TEXT NOT NULL,
        amount_out TEXT,
        route TEXT NOT NULL,
        txid TEXT NOT NULL,
        status TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_trades_ts ON trades(ts);
    `);
  }

  insert(t: TradeLog) {
    const stmt = this.db.prepare(`
      INSERT INTO trades (ts, leader, in_mint, out_mint, amount_in, amount_out, route, txid, status)
      VALUES (@ts, @leader, @inMint, @outMint, @amountIn, @amountOut, @route, @txid, @status)
    `);
    stmt.run({
      ts: t.ts,
      leader: t.leader,
      inMint: t.inMint,
      outMint: t.outMint,
      amountIn: t.amountIn,
      amountOut: t.amountOut ?? null,
      route: t.route,
      txid: t.txid,
      status: t.status,
    });
  }
}
