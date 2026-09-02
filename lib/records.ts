import { getPreviewUserId, getReadyDb } from '@/db/runtime';

export type ProjectInput = {
  title: string;
  scenario: string;
  summary: string;
  currentSolution?: string;
  goal?: string;
  visibility: 'private' | 'team' | 'beta' | 'public';
};

export type WorkflowInput = {
  title: string;
  scenario: string;
  modelName: string;
  hardwareSku?: string;
  projectId?: string;
  quantization?: string;
  parametersJson?: string;
  changelog?: string;
  visibility: 'private' | 'team' | 'beta' | 'public';
};

export type IssueInput = {
  title: string;
  category: string;
  severity: 'P0' | 'P1' | 'P2' | 'P3';
  description: string;
  expectedResult?: string;
  actualResult?: string;
  projectId?: string;
  workflowId?: string;
  visibility: 'private' | 'team' | 'beta' | 'public';
};

export async function getDashboard() {
  const db = await getReadyDb();
  const [run, issueResult, projectCount, workflowCount, issueCount] = await Promise.all([
    db.prepare(`SELECT r.*, w.title AS workflow_title, w.model_name, w.hardware_sku, w.latest_version
      FROM runs r JOIN workflows w ON w.id = r.workflow_id
      ORDER BY r.started_at DESC LIMIT 1`).first(),
    db.prepare(`SELECT id, title, category, severity, status, updated_at
      FROM issues ORDER BY updated_at DESC LIMIT 6`).all(),
    db.prepare('SELECT COUNT(*) AS total FROM projects').first<{ total: number }>(),
    db.prepare('SELECT COUNT(*) AS total FROM workflows').first<{ total: number }>(),
    db.prepare(`SELECT COUNT(*) AS total FROM issues WHERE status NOT IN ('resolved', 'closed')`).first<{ total: number }>(),
  ]);
  return {
    run,
    issues: issueResult.results,
    counts: {
      projects: Number(projectCount?.total ?? 0),
      workflows: Number(workflowCount?.total ?? 0),
      openIssues: Number(issueCount?.total ?? 0),
    },
  };
}

export async function listProjects() {
  const db = await getReadyDb();
  const result = await db.prepare(`SELECT p.*, u.display_name AS owner_name,
      (SELECT COUNT(*) FROM workflows w WHERE w.project_id = p.id) AS workflow_count,
      (SELECT COUNT(*) FROM issues i WHERE i.project_id = p.id) AS issue_count
    FROM projects p JOIN users u ON u.id = p.owner_id
    ORDER BY p.updated_at DESC`).all();
  return result.results;
}

export async function createProject(input: ProjectInput, ownerId = getPreviewUserId()) {
  const db = await getReadyDb();
  const id = `prj_${crypto.randomUUID()}`;
  const now = Date.now();
  await db.prepare(`INSERT INTO projects
    (id, owner_id, title, scenario, summary, current_solution, goal, status, visibility, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'first_version', ?, ?, ?)`)
    .bind(id, ownerId, input.title, input.scenario, input.summary, input.currentSolution ?? null, input.goal ?? null, input.visibility, now, now)
    .run();
  return { id, ...input, status: 'first_version', createdAt: now };
}

export async function listWorkflows() {
  const db = await getReadyDb();
  const result = await db.prepare(`SELECT w.*, u.display_name AS owner_name, p.title AS project_title,
      (SELECT COUNT(*) FROM runs r WHERE r.workflow_id = w.id) AS run_count,
      (SELECT COUNT(*) FROM issues i WHERE i.workflow_id = w.id) AS issue_count
    FROM workflows w JOIN users u ON u.id = w.owner_id
    LEFT JOIN projects p ON p.id = w.project_id
    ORDER BY w.updated_at DESC`).all();
  return result.results;
}

export async function createWorkflow(input: WorkflowInput, ownerId = getPreviewUserId()) {
  const db = await getReadyDb();
  const id = `wf_${crypto.randomUUID()}`;
  const versionId = `wfv_${crypto.randomUUID()}`;
  const now = Date.now();
  await db.batch([
    db.prepare(`INSERT INTO workflows
      (id, owner_id, project_id, title, scenario, model_name, hardware_sku, latest_version, status, visibility, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'draft', ?, ?, ?)`)
      .bind(id, ownerId, input.projectId ?? null, input.title, input.scenario, input.modelName, input.hardwareSku ?? null, input.visibility, now, now),
    db.prepare(`INSERT INTO workflow_versions
      (id, workflow_id, version, quantization, parameters_json, changelog, created_at)
      VALUES (?, ?, 1, ?, ?, ?, ?)`)
      .bind(versionId, id, input.quantization ?? null, input.parametersJson ?? null, input.changelog ?? '创建第一版', now),
  ]);
  return { id, ...input, latestVersion: 1, status: 'draft', createdAt: now };
}

export async function listIssues() {
  const db = await getReadyDb();
  const result = await db.prepare(`SELECT i.*, u.display_name AS reporter_name, p.title AS project_title, w.title AS workflow_title,
      (SELECT COUNT(*) FROM comments c WHERE c.issue_id = i.id) AS comment_count,
      (SELECT COUNT(*) FROM attachments a WHERE a.issue_id = i.id) AS attachment_count
    FROM issues i JOIN users u ON u.id = i.reporter_id
    LEFT JOIN projects p ON p.id = i.project_id
    LEFT JOIN workflows w ON w.id = i.workflow_id
    ORDER BY CASE i.severity WHEN 'P0' THEN 0 WHEN 'P1' THEN 1 WHEN 'P2' THEN 2 ELSE 3 END, i.updated_at DESC`).all();
  return result.results;
}

export async function createIssue(input: IssueInput, reporterId = getPreviewUserId()) {
  const db = await getReadyDb();
  const id = `iss_${crypto.randomUUID()}`;
  const now = Date.now();
  await db.prepare(`INSERT INTO issues
    (id, reporter_id, project_id, workflow_id, title, category, severity, status, description, expected_result, actual_result, visibility, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'triage', ?, ?, ?, ?, ?, ?)`)
    .bind(id, reporterId, input.projectId ?? null, input.workflowId ?? null, input.title, input.category, input.severity, input.description, input.expectedResult ?? null, input.actualResult ?? null, input.visibility, now, now)
    .run();
  return { id, ...input, status: 'triage', createdAt: now };
}

export async function updateIssueStatus(id: string, status: string) {
  const db = await getReadyDb();
  const allowed = new Set(['triage', 'needs_info', 'reproduced', 'in_progress', 'planned', 'resolved', 'closed']);
  if (!allowed.has(status)) throw new Error('Invalid issue status');
  const result = await db.prepare('UPDATE issues SET status = ?, updated_at = ? WHERE id = ?')
    .bind(status, Date.now(), id).run();
  return result.meta.changes > 0;
}
