import { env } from 'cloudflare:workers';
import migrationSql from '@/drizzle/0000_noisy_lady_deathstrike.sql?raw';

const DEMO_USER_ID = 'usr_demo_sg';
let initialized: Promise<void> | undefined;

function getD1() {
  if (!env.DB) throw new Error('D1 binding DB is unavailable.');
  return env.DB;
}

async function initialize() {
  const db = getD1();
  const statements = migrationSql
    .split('--> statement-breakpoint')
    .map((statement) => statement.trim())
    .filter(Boolean)
    .map((statement) => statement
      .replace(/^CREATE TABLE /, 'CREATE TABLE IF NOT EXISTS ')
      .replace(/^CREATE UNIQUE INDEX /, 'CREATE UNIQUE INDEX IF NOT EXISTS ')
      .replace(/^CREATE INDEX /, 'CREATE INDEX IF NOT EXISTS '));
  await db.batch(statements.map((statement) => db.prepare(statement)));

  const now = Date.now();
  await db.batch([
    db.prepare('INSERT OR IGNORE INTO users (id, display_name, role, status, created_at) VALUES (?, ?, ?, ?, ?)')
      .bind(DEMO_USER_ID, '石根洁', 'admin', 'active', now),
    db.prepare('INSERT OR IGNORE INTO projects (id, owner_id, title, scenario, summary, current_solution, goal, status, visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('prj_seed_short_drama', DEMO_USER_ID, '12 集国风 AI 短剧验证', '短剧', '验证角色一致性与批量镜头生产是否达到真实交付要求。', '云端模型 + 手工筛片', '单集生成时间降低 40%，废片率低于 20%', 'real_delivery', 'team', now - 172800000, now),
    db.prepare('INSERT OR IGNORE INTO workflows (id, owner_id, project_id, title, scenario, model_name, hardware_sku, latest_version, status, visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('wf_seed_0281', DEMO_USER_ID, 'prj_seed_short_drama', '短剧分镜转视频 · 角色一致性', '短剧', 'Wan2.2 FP8', 'Siltok Pro', 4, 'verified', 'beta', now - 129600000, now),
    db.prepare('INSERT OR IGNORE INTO workflow_versions (id, workflow_id, version, quantization, parameters_json, changelog, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
      .bind('wfv_seed_0281_v4', 'wf_seed_0281', 4, 'FP8', JSON.stringify({ resolution: '1280x720', duration: 5, steps: 12, batch: 1 }), '优化侧脸参考帧与 VAE 解码阶段。', now - 86400000),
    db.prepare('INSERT OR IGNORE INTO runs (id, workflow_id, user_id, status, engine_version, first_frame_seconds, peak_vram_gb, total_outputs, usable_outputs, started_at, completed_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('run_seed_latest', 'wf_seed_0281', DEMO_USER_ID, 'running', 'Silitok Speed 0.3.1', 42.8, 21.6, 12, 9, now - 198000, null),
    db.prepare('INSERT OR IGNORE INTO issues (id, reporter_id, project_id, workflow_id, title, category, severity, status, description, actual_result, visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('iss_seed_consistency', DEMO_USER_ID, 'prj_seed_short_drama', 'wf_seed_0281', '角色侧脸一致性下降', '效果', 'P1', 'reproduced', '连续镜头切换到侧脸时，五官特征漂移。', '12 个镜头中有 3 个需要返工。', 'team', now - 1080000, now - 900000),
    db.prepare('INSERT OR IGNORE INTO issues (id, reporter_id, project_id, workflow_id, title, category, severity, status, description, actual_result, visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('iss_seed_vae', DEMO_USER_ID, 'prj_seed_short_drama', 'wf_seed_0281', 'VAE 解码偶发显存峰值', '性能', 'P1', 'in_progress', '长镜头在 VAE 解码阶段出现瞬时显存峰值。', '峰值接近 24GB，偶发任务失败。', 'team', now - 3600000, now - 1800000),
    db.prepare('INSERT OR IGNORE INTO issues (id, reporter_id, title, category, severity, status, description, visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .bind('iss_seed_download', DEMO_USER_ID, '首次下载缺少剩余时间', '交互', 'P2', 'triage', 'OOBE 模型下载只显示百分比，没有速度和剩余时间。', 'beta', now - 86400000, now - 86400000),
  ]);
  await db.prepare('PRAGMA optimize').run();
}

export async function ensureDatabase() {
  initialized ??= initialize().catch((error) => {
    initialized = undefined;
    throw error;
  });
  return initialized;
}

export async function getReadyDb() {
  await ensureDatabase();
  return getD1();
}

export function getPreviewUserId() {
  return DEMO_USER_ID;
}
