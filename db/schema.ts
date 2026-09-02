import { index, integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url'),
  phoneHash: text('phone_hash'),
  wechatUnionId: text('wechat_union_id'),
  role: text('role').notNull().default('member'),
  status: text('status').notNull().default('active'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  scenario: text('scenario').notNull(),
  summary: text('summary').notNull(),
  currentSolution: text('current_solution'),
  goal: text('goal'),
  status: text('status').notNull().default('first_version'),
  visibility: text('visibility').notNull().default('private'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [index('idx_projects_owner_status').on(table.ownerId, table.status)]);

export const workflows = sqliteTable('workflows', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull().references(() => users.id),
  projectId: text('project_id').references(() => projects.id),
  title: text('title').notNull(),
  scenario: text('scenario').notNull(),
  modelName: text('model_name').notNull(),
  hardwareSku: text('hardware_sku'),
  latestVersion: integer('latest_version').notNull().default(1),
  status: text('status').notNull().default('draft'),
  visibility: text('visibility').notNull().default('private'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [index('idx_workflows_scenario_status').on(table.scenario, table.status)]);

export const workflowVersions = sqliteTable('workflow_versions', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').notNull().references(() => workflows.id),
  version: integer('version').notNull(),
  quantization: text('quantization'),
  parametersJson: text('parameters_json'),
  workflowObjectKey: text('workflow_object_key'),
  changelog: text('changelog'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [uniqueIndex('idx_workflow_versions_unique').on(table.workflowId, table.version)]);

export const runs = sqliteTable('runs', {
  id: text('id').primaryKey(),
  workflowId: text('workflow_id').notNull().references(() => workflows.id),
  userId: text('user_id').notNull().references(() => users.id),
  status: text('status').notNull(),
  engineVersion: text('engine_version'),
  firstFrameSeconds: real('first_frame_seconds'),
  peakVramGb: real('peak_vram_gb'),
  totalOutputs: integer('total_outputs').notNull().default(0),
  usableOutputs: integer('usable_outputs').notNull().default(0),
  startedAt: integer('started_at', { mode: 'timestamp_ms' }).notNull(),
  completedAt: integer('completed_at', { mode: 'timestamp_ms' }),
}, (table) => [index('idx_runs_workflow_started').on(table.workflowId, table.startedAt)]);

export const issues = sqliteTable('issues', {
  id: text('id').primaryKey(),
  reporterId: text('reporter_id').notNull().references(() => users.id),
  projectId: text('project_id').references(() => projects.id),
  workflowId: text('workflow_id').references(() => workflows.id),
  title: text('title').notNull(),
  category: text('category').notNull(),
  severity: text('severity').notNull(),
  status: text('status').notNull().default('triage'),
  description: text('description').notNull(),
  expectedResult: text('expected_result'),
  actualResult: text('actual_result'),
  visibility: text('visibility').notNull().default('private'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [index('idx_issues_status_severity').on(table.status, table.severity)]);

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  authorId: text('author_id').notNull().references(() => users.id),
  issueId: text('issue_id').references(() => issues.id),
  projectId: text('project_id').references(() => projects.id),
  workflowId: text('workflow_id').references(() => workflows.id),
  body: text('body').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [index('idx_comments_issue_created').on(table.issueId, table.createdAt)]);

export const attachments = sqliteTable('attachments', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull().references(() => users.id),
  issueId: text('issue_id').references(() => issues.id),
  projectId: text('project_id').references(() => projects.id),
  workflowId: text('workflow_id').references(() => workflows.id),
  filename: text('filename').notNull(),
  objectKey: text('object_key').notNull(),
  contentType: text('content_type').notNull(),
  byteSize: integer('byte_size').notNull(),
  visibility: text('visibility').notNull().default('private'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [index('idx_attachments_owner_created').on(table.ownerId, table.createdAt)]);

export const consents = sqliteTable('consents', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  consentType: text('consent_type').notNull(),
  version: text('version').notNull(),
  grantedAt: integer('granted_at', { mode: 'timestamp_ms' }).notNull(),
  revokedAt: integer('revoked_at', { mode: 'timestamp_ms' }),
}, (table) => [index('idx_consents_user_type').on(table.userId, table.consentType)]);

export const templates = sqliteTable('templates', {
  id: text('id').primaryKey(),
  ownerId: text('owner_id').notNull().references(() => users.id),
  kind: text('kind').notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  summary: text('summary').notNull(),
  modelName: text('model_name'),
  hardwareSku: text('hardware_sku'),
  instructions: text('instructions'),
  inputSchemaJson: text('input_schema_json'),
  evidenceLevel: text('evidence_level').notNull().default('unverified'),
  sourceType: text('source_type').notNull().default('official'),
  status: text('status').notNull().default('beta'),
  visibility: text('visibility').notNull().default('public'),
  installCount: integer('install_count').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [
  uniqueIndex('idx_templates_slug').on(table.slug),
  index('idx_templates_kind_category').on(table.kind, table.category),
]);

export const templateInstalls = sqliteTable('template_installs', {
  id: text('id').primaryKey(),
  templateId: text('template_id').notNull().references(() => templates.id),
  userId: text('user_id').notNull().references(() => users.id),
  status: text('status').notNull().default('saved'),
  installedAt: integer('installed_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [uniqueIndex('idx_template_installs_unique').on(table.templateId, table.userId)]);
