import { env } from 'cloudflare:workers';
import migrationSql from '@/drizzle/0000_noisy_lady_deathstrike.sql?raw';
import templateMigrationSql from '@/drizzle/0001_template_library.sql?raw';

const DEMO_USER_ID = 'usr_demo_sg';
let initialized: Promise<void> | undefined;

function getD1() {
  if (!env.DB) throw new Error('D1 binding DB is unavailable.');
  return env.DB;
}

async function initialize() {
  const db = getD1();
  const statements = [migrationSql, templateMigrationSql].join('--> statement-breakpoint')
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
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_skill_character', DEMO_USER_ID, 'skill', 'character-consistency-director', '角色一致性导演 Skill', '剧情短片',
        '把角色设定、镜头距离和参考帧规则固化为可复用的导演步骤。', 'Wan2.2 / MiniMax H3', 'Lite / Pro',
        '读取角色卡与分镜，检查参考帧、景别、服装和关键特征，再生成镜头级提示与失败重试策略。',
        JSON.stringify(['角色卡', '分镜脚本', '参考图']), 'verified_run', 'official', 'beta', 126, now - 3600000, now),
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_skill_tvc', DEMO_USER_ID, 'skill', 'tvc-shot-planner', 'TVC 广告镜头规划 Skill', '商业广告',
        '从商品卖点生成镜头表、运镜方案和可交付检查清单。', 'MiniMax H3', 'Pro 优先',
        '先提取产品卖点和品牌约束，再拆成开场、功能、细节、使用场景与收尾镜头。',
        JSON.stringify(['商品图', '卖点', '品牌规范']), 'community_testing', 'official', 'beta', 84, now - 3500000, now),
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_skill_diagnose', DEMO_USER_ID, 'skill', 'video-failure-diagnosis', '视频生成失败诊断 Skill', '问题诊断',
        '根据报错、显存峰值和输出异常，给出可复现检查与降级方案。', '多模型', 'Lite / Pro',
        '优先判断环境、节点、显存、VAE、输入素材和模型能力边界，并记录每次修改前后的证据。',
        JSON.stringify(['错误日志', '工作流 JSON', '失败样片']), 'official_reviewed', 'official', 'ready', 212, now - 3400000, now),
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_workflow_shortdrama', DEMO_USER_ID, 'workflow', 'wan-short-drama-consistency', 'Wan2.2 短剧角色一致性', '剧情短片',
        '从角色卡与分镜到五秒镜头，保留参考帧、参数和失败记录。', 'Wan2.2 FP8', 'Siltok Pro',
        '导入角色资产，按镜头生成并记录可用率；侧脸与远景进入单独重试分支。',
        JSON.stringify(['角色卡', '分镜表', '参考图']), 'verified_run', 'official', 'ready', 98, now - 3300000, now),
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_workflow_product', DEMO_USER_ID, 'workflow', 'product-video-variants', '商品图批量视频化', '电商素材',
        '同一商品生成多套投流素材，并统计废片率与单条可用成本。', 'LTX-2.3 / Wan2.2', 'Lite / Pro',
        '上传商品图与参考素材，批量生成不同卖点版本，人工只标记可用与返工原因。',
        JSON.stringify(['商品图', '卖点表', '参考视频']), 'community_testing', 'official', 'beta', 73, now - 3200000, now),
    db.prepare(`INSERT OR IGNORE INTO templates
      (id, owner_id, kind, slug, title, category, summary, model_name, hardware_sku, instructions, input_schema_json, evidence_level, source_type, status, visibility, install_count, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'public', ?, ?, ?)`).bind(
        'tpl_workflow_previz', DEMO_USER_ID, 'workflow', 'ltx-fast-previz', 'LTX 快速分镜预演', '分镜预演',
        '用低成本快速生成导演预演，确认节奏后再进入高规格生成。', 'LTX-2.3', 'Siltok Lite',
        '先用低规格批量预演镜头节奏，通过后自动切换推荐参数进入高规格队列。',
        JSON.stringify(['剧本', '分镜描述', '画幅']), 'lab_testing', 'official', 'testing', 51, now - 3100000, now),
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
