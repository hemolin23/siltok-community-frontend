'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LoaderCircle, LockKeyhole, MessageCircle, Smartphone } from 'lucide-react';

type ProviderState = 'configured' | 'credentials_required' | 'application_review_required';

export function LoginPanel() {
  const [loading, setLoading] = useState(true);
  const [wechatState, setWechatState] = useState<ProviderState>('application_review_required');
  useEffect(() => {
    fetch('/api/auth/status').then((response) => response.json()).then((body) => setWechatState(body.providers.wechatWeb)).finally(() => setLoading(false));
  }, []);

  const ready = wechatState === 'configured';
  return <main className="wechat-login-page">
    <section className="login-cinema">
      <a className="login-back" href="/"><ArrowLeft /> 返回 Siltok Lab</a>
      <div className="login-brand"><span className="brand-sigil">S</span><span><b>SILTOK</b><small>LAB</small></span></div>
      <div className="login-copy"><span>CREATOR ACCESS</span><h1>把你的真实项目，<br />带进 Siltok。</h1><p>登录后可以申请远程设备、上传工作流、提交失败案例，并持续查看团队处理进度。</p></div>
      <div className="login-proof"><div><b>01</b><span><strong>项目素材默认私密</strong><small>只有你和被授权的支持人员可见</small></span></div><div><b>02</b><span><strong>负面反馈不会被隐藏</strong><small>每个问题都有复现与版本状态</small></span></div><div><b>03</b><span><strong>工作流资产可以带走</strong><small>模板公开与案例传播会另行授权</small></span></div></div>
    </section>

    <section className="wechat-login-panel">
      <div className="login-panel-head"><span>微信一键登录</span><h2>加入首批共创用户</h2><p>使用微信扫码完成注册与登录。手机号在登录后按需绑定，不作为第一道门槛。</p></div>
      <div className={ready ? 'wechat-portal ready' : 'wechat-portal'}>
        <i className="corner a" /><i className="corner b" /><i className="corner c" /><i className="corner d" />
        {loading ? <LoaderCircle className="portal-loader" /> : <MessageCircle className="wechat-logo" fill="currentColor" />}
        <strong>{loading ? '正在检查登录状态' : ready ? '点击打开微信官方二维码' : '微信登录等待接入凭证'}</strong>
        <small>{ready ? '请使用手机微信扫码确认' : '页面和完整 OAuth 流程已完成，填入微信开放平台网站应用凭证后即刻启用。'}</small>
      </div>
      {ready ? <a className="wechat-login-action" href="/api/auth/wechat/start"><MessageCircle /> 打开微信扫码登录 <ArrowRight /></a> : <button className="wechat-login-action disabled" disabled><LockKeyhole /> 微信开放平台待配置</button>}
      <div className="binding-note"><Smartphone /><span><strong>手机号是辅助绑定</strong><small>用于服务通知、账号找回和后续添加微信，不打断首次注册。</small></span></div>
      <ul className="login-consent"><li><Check /> 登录与运营联系分别授权</li><li><Check /> 测试素材不自动用于公开案例</li></ul>
      <a className="preview-link" href="/">暂时使用演示身份浏览 <ArrowRight /></a>
      <small className="legal-copy">继续即表示同意《服务协议》和《隐私政策》；测试协议与保密协议会在申请内测时单独签署。</small>
    </section>
  </main>;
}
