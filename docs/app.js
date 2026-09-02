const workflows = [
  ['01','Wan2.2 短剧角色一致性','剧情短片','Wan2.2 FP8','Siltok Pro','4','已复现'],
  ['02','MiniMax H3 分段长视频','AI 漫剧','MiniMax H3','Lite / Pro','7','测试中'],
  ['03','LTX 快速分镜预演','分镜预演','LTX-2.3 FP4','Siltok Lite','3','已验证'],
  ['04','商品图批量视频化','电商素材','Wan2.2 / LTX','Lite / Pro','5','招募中'],
  ['05','角色 LoRA 训练与调用','角色资产','MiniMax H3','Siltok Pro','2','测试中'],
  ['06','视频生成失败诊断','问题诊断','多模型','Lite / Pro','8','可使用'],
];

const experiences = [
  ['抖音','第九序架构','仅 6G 显存本地部署 MiniMax H3','MiniMax H3 / ComfyUI','低显存部署','把下载、依赖、模型位置和节点版本做成前置检查。'],
  ['B站','不止设计工作室','Wan2.2 模型、插件、环境与报错全流程','Wan2.2','部署排错','先固定版本和输入参数，再定位显存、节点与模型路径。'],
  ['抖音','希希说运营','Seedance 2 Fast 与 MiniMax H3 场景实测','MiniMax H3 / Seedance 2','模型对比','统一素材和提示词，同时记录成片速度、可用率与成本。'],
  ['B站','船长的角落','MiniMax H3 + Agent 自动化短片流水线','MiniMax H3 / Agent','剧情短片','从交付物倒推输入资产，把高频人工判断沉淀成 Skill。'],
  ['抖音','小枫 AI｜ComfyUI','Wan2.2 量化工作流与缺失节点排错','Wan2.2 / ComfyUI','16G 适配','低显存场景优先验证量化、卸载、分辨率和时长边界。'],
  ['B站','大凯智障君','LTX 2.3 商业广告批量生成','LTX-2.3','电商广告','批量任务必须记录失败重试、队列时间和单条可用成本。'],
  ['B站','T8star-Aix','MiniMax H3 人像 LoRA 与一致性踩坑','MiniMax H3','角色一致性','角色卡、参考帧、景别和服装约束需要成为固定资产。'],
  ['B站','像素幻想 Lab','Wan2.2 自动提示词低占用工作流','Wan2.2 / ComfyUI','低显存部署','先用低规格样例验证链路，再提高分辨率、时长和批量规模。'],
];

const issues = [
  ['P0','远程运行中断后任务没有自动恢复','稳定性','待复现','影响整批镜头交付'],
  ['P1','角色侧脸连续镜头出现五官漂移','效果','已复现','12 个镜头中 3 个需返工'],
  ['P1','VAE 解码阶段偶发显存峰值','性能','处理中','24GB 设备偶发 OOM'],
  ['P2','首次模型下载没有剩余时间','交互','已排期','用户无法判断等待时长'],
  ['P2','工作流缺失节点时提示不明确','部署','已复现','新用户无法自行恢复'],
];

document.querySelector('#workflow-list').innerHTML = workflows.map(w => `<article><b>${w[0]}</b><div><small>${w[2]}</small><h2>${w[1]}</h2><p>${w[3]} · ${w[4]}</p></div><span><small>当前版本</small><strong>v${w[5]}</strong></span><i>${w[6]}</i><button>打开 ↗</button></article>`).join('');
document.querySelector('#experience-grid').innerHTML = experiences.map((e,i) => `<article><header><span>${e[0]}</span><b>#${String(i+1).padStart(2,'0')}</b></header><small>${e[3]}</small><h2>${e[2]}</h2><p>${e[5]}</p><footer><span>原作者 <strong>${e[1]}</strong></span><span>场景 <strong>${e[4]}</strong></span></footer></article>`).join('');
document.querySelector('#issue-list').innerHTML = issues.map(i => `<article><b class="severity ${i[0].toLowerCase()}">${i[0]}</b><div><h2>${i[1]}</h2><p>${i[2]} · ${i[4]}</p></div><span>${i[3]}</span><button>查看证据 →</button></article>`).join('');

const pages = [...document.querySelectorAll('[data-page]')];
const nav = [...document.querySelectorAll('.site-header nav button')];
function go(name) {
  const target = pages.find(p => p.dataset.page === name) ? name : 'home';
  pages.forEach(p => p.classList.toggle('active', p.dataset.page === target));
  nav.forEach(n => n.classList.toggle('active', n.dataset.go === target));
  if (location.hash !== `#${target}`) history.pushState(null, '', `#${target}`);
  scrollTo({top:0, behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => go(button.dataset.go)));
addEventListener('popstate', () => go(location.hash.slice(1)));
if (location.hash) go(location.hash.slice(1));

const dialog = document.querySelector('#login-dialog');
document.querySelectorAll('[data-login]').forEach(button => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.demo-submit').addEventListener('click', () => {
  dialog.close();
  const toast = document.querySelector('#toast');
  toast.textContent = '公开演示版不会发送真实短信';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
});
