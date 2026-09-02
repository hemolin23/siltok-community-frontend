import { AdminDashboard } from '@/components/admin-dashboard';
import { WorkspaceFrame } from '@/components/workspace-frame';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  return <WorkspaceFrame active="admin" eyebrow="SILTOK OPERATIONS" title="用户与内容后台" description="查看注册、登录、项目、工作流、问题和用户上传记录。手机号不以明文写入数据库。" createHref="/" createLabel="返回站点">
    <AdminDashboard />
  </WorkspaceFrame>;
}
