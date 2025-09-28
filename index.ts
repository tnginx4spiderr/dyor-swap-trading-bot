import { env, leaders } from './config.js';
import { logger } from './utils/logger.js';
import { loadKeypair } from './utils/wallet.js';
import { LeaderWatcher } from './copytrading/watcher.js';
import { Executor } from './execution/executor.js';
import { TradeDB } from './storage/db.js';
import { PoolScanner } from './analytics/poolScanner.js';

async function main() {
  const kp = loadKeypair(env.WALLET_SECRET_KEY);
  logger.info({ publicKey: kp.publicKey }, 'loaded wallet');

  const db = new TradeDB(env.DB_PATH);
  const watcher = new LeaderWatcher();
  const exec = new Executor();
  const scanner = new PoolScanner();

  // run pool scan once at boot (non-blocking)
  scanner.scan().catch(e => logger.warn({ err: e?.message }, 'pool scan failed'));

  // simple poll loop
  const intervalMs = 10_000;
  logger.info({ leaders, intervalMs }, 'starting leader watcher');

  setInterval(async () => {
    const events = await watcher.pollOnce(leaders);
    for (const ev of events) {
      try {
        const res = await exec.mirrorSwap({
          inMint: ev.inMint,
          outMint: ev.outMint,
          amount: String(Math.min(Number(env.MAX_TRADE_QUOTE || 0), Number(ev.amount)) || ev.amount),
          slippageBps: env.SLIPPAGE_BPS,
          dexWhitelist: env.DEX_WHITELIST ? env.DEX_WHITELIST.split(',') : undefined,
          secret: env.WALLET_SECRET_KEY
        });
        db.insert({
          ts: Date.now(),
          leader: ev.leader,
          inMint: ev.inMint,
          outMint: ev.outMint,
          amountIn: ev.amount,
          amountOut: res.outAmount,
          route: res.route,
          txid: res.txid,
          status: 'EXECUTED'
        });
      } catch (e:any) {
        logger.error({ leader: ev.leader, err: e?.message }, 'mirror execution failed');
        db.insert({
          ts: Date.now(),
          leader: ev.leader,
          inMint: ev.inMint,
          outMint: ev.outMint,
          amountIn: ev.amount,
          amountOut: undefined,
          route: ev.dex,
          txid: ev.sig,
          status: 'FAILED'
        });
      }
    }
  }, intervalMs);
}

main().catch(e => {
  // Ensure errors are visible before process exit (e.g., bad env)
  console.error(e);
  process.exit(1);
});
