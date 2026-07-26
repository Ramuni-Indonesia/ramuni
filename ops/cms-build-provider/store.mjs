import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
export class ProviderStore {
  constructor(path) {
    mkdirSync(dirname(path), { recursive: true, mode: 0o750 }); this.db = new DatabaseSync(path);
    this.db.exec("PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; CREATE TABLE IF NOT EXISTS events(event_id TEXT PRIMARY KEY, request_hash TEXT NOT NULL, payload TEXT NOT NULL, status TEXT NOT NULL, accepted_at INTEGER NOT NULL, started_at INTEGER, callback_body TEXT, callback_attempts INTEGER NOT NULL DEFAULT 0, callback_next_at INTEGER, callback_error TEXT, build_error TEXT, completed_at INTEGER);");
    const columns = new Set(this.db.prepare('PRAGMA table_info(events)').all().map((row) => row.name));
    if (!columns.has('build_error')) this.db.exec('ALTER TABLE events ADD COLUMN build_error TEXT');
  }
  close() { this.db.close(); }
  recover() { return this.db.prepare("UPDATE events SET status='queued', started_at=NULL WHERE status='processing'").run().changes; }
  accept(event, requestHash, now) {
    const existing = this.db.prepare('SELECT * FROM events WHERE event_id=?').get(event.eventId);
    if (existing) return { duplicate: true, conflict: existing.request_hash !== requestHash, event: this.decode(existing) };
    this.db.prepare("INSERT INTO events(event_id,request_hash,payload,status,accepted_at) VALUES(?,?,?,'queued',?)").run(event.eventId, requestHash, JSON.stringify(event), now);
    return { duplicate: false, conflict: false, event: { ...event, status: 'queued' } };
  }
  decode(row) { return row ? { ...JSON.parse(row.payload), status: row.status, callbackBody: row.callback_body, callbackAttempts: row.callback_attempts, callbackNextAt: row.callback_next_at, buildError: row.build_error } : null; }
  claim() {
    const row = this.db.prepare("SELECT * FROM events WHERE status='queued' ORDER BY accepted_at LIMIT 1").get();
    if (!row) return null;
    const result = this.db.prepare("UPDATE events SET status='processing',started_at=? WHERE event_id=? AND status='queued'").run(Date.now(), row.event_id);
    if (result.changes !== 1) return null;
    return { ...this.decode(row), status: 'processing' };
  }
  finishBuild(eventId, callbackBody, buildError = null) { this.db.prepare("UPDATE events SET status='callback-pending',callback_body=?,callback_next_at=?,build_error=?,completed_at=? WHERE event_id=? AND status='processing'").run(callbackBody, Date.now(), buildError, Date.now(), eventId); }
  nextCallback() { return this.decode(this.db.prepare("SELECT * FROM events WHERE status='callback-pending' AND callback_next_at<=? ORDER BY callback_next_at LIMIT 1").get(Date.now())); }
  callbackDelivered(eventId, success) { this.db.prepare("UPDATE events SET status=?,callback_attempts=callback_attempts+1,callback_error=NULL WHERE event_id=?").run(success ? 'succeeded' : 'failed', eventId); }
  callbackRetry(eventId, error, delay, dead) { this.db.prepare("UPDATE events SET status=?,callback_attempts=callback_attempts+1,callback_error=?,callback_next_at=? WHERE event_id=?").run(dead ? 'callback-dead' : 'callback-pending', error, Date.now()+delay, eventId); }
  get(eventId) { return this.decode(this.db.prepare('SELECT * FROM events WHERE event_id=?').get(eventId)); }
  counts() { return Object.fromEntries(this.db.prepare('SELECT status,COUNT(*) count FROM events GROUP BY status').all().map((row) => [row.status, Number(row.count)])); }
}
