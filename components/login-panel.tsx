'use client';

import { type SyntheticEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, LoaderCircle, LockKeyhole, MessageCircle, Smartphone } from 'lucide-react';

type ProviderState = 'configured' | 'credentials_required' | 'application_review_required';
type AuthStatus = { providers: { phoneOtp: ProviderState; wechatWeb: ProviderState } };

export function LoginPanel() {
  const [loading, setLoading] = useState(true);
  const [phoneState, setPhoneState] = useState<ProviderState>('credentials_required');
  const [wechatState, setWechatState] = useState<ProviderState>('application_review_required');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void fetch('/api/auth/status').then((response) => response.json() as Promise<AuthStatus>).then((body) => {
      setPhoneState(body.providers.phoneOtp);
      setWechatState(body.providers.wechatWeb);
    }).catch(() => setMessage('暂时无法读取登录服务状态')).finally(() => setLoading(false));
  }, []);

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(sent ? '/api/auth/phone/verify' : '/api/auth/phone/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(sent ? { phone, code } : { phone }),
      });
      const body = await response.json() as { error?: string };
      if (!response.ok) throw new Error(body.error ?? '请求失败');
      if (sent) window.location.href = '/projects';
      else {
        setSent(true);
        setMessage('验证码已发送，5 分钟内有效');
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '请求失败');
    } finally {
      setBusy(false);
    }
  }

  const phoneReady = phoneState === 'configured';
  const wechatReady = wechatState === 'configured';
  return <main className="wechat-login-page">
    <section className="login-cinema">
      <Link className="login-back" href="/"><ArrowLeft /> 返回 Siltok Lab</Link>
      <div className="login-brand"><span className="brand-sigil">S</span><span><b>SILTOK</b><small>LAB</small></span></div>
      <div className="login-copy"><span>CREATOR ACCESS</span><h1>把你的真实项目，<br />带进 Siltok。</h1><p>登录后可以申请远程设备、保存 Skill、上传工作流、提交失败案例，并持续查看团队处理进度。</p></div>
      <div className="login-proof"><div><b>01</b><span><strong>项目素材默认私密</strong><small>只有你和被授权的支持人员可见</small></span></div><div><b>02</b><span><strong>负面反馈不会被隐藏</strong><small>每个问题都有复现与版本状态</small></span></div><div><b>03</b><span><strong>工作流资产可以带走</strong><small>模板公开与案例传播会另行授权</small></span></div></div>
    </section>

    <section className="wechat-login-panel phone-login-panel">
      <div className="login-panel-head"><span>手机号验证码登录</span><h2>加入首批共创用户</h2><p>先用手机号完成注册和登录。微信扫码将在开放平台审核通过后作为快捷入口补充。</p></div>
      {loading ? <div className="phone-provider-loading"><LoaderCircle /> 正在检查短信服务</div> : <form className="phone-auth-form" onSubmit={submit}>
        <label><span>中国大陆手机号</span><div><b>+86</b><input aria-label="手机号" autoComplete="tel" disabled={!phoneReady || sent} inputMode="numeric" maxLength={11} onChange={(event) => setPhone(event.target.value.replace(/\D/g, ''))} placeholder="请输入手机号" required value={phone} /></div></label>
        {sent && <label><span>短信验证码</span><div><input aria-label="验证码" autoComplete="one-time-code" inputMode="numeric" maxLength={6} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} placeholder="6 位验证码" required value={code} /><button type="button" onClick={() => { setSent(false); setCode(''); setMessage(''); }}>重新获取</button></div></label>}
        <button className={`phone-login-action ${!phoneReady ? 'disabled' : ''}`} disabled={!phoneReady || busy || phone.length !== 11 || (sent && code.length !== 6)} type="submit">{busy ? <LoaderCircle className="portal-loader" /> : <Smartphone />}{phoneReady ? sent ? '验证并登录' : '获取验证码' : '短信服务待配置'}<ArrowRight /></button>
        {message && <p className="phone-auth-message">{message}</p>}
        {!phoneReady && <div className="provider-config-note"><LockKeyhole /><span><strong>需要配置腾讯云短信凭证</strong><small>代码、限流、验证码哈希和登录会话已经完成；配置短信签名与模板后即可使用。</small></span></div>}
      </form>}

      <div className="login-divider"><span>其他登录方式</span></div>
      {wechatReady ? <Link className="wechat-secondary-action" href="/api/auth/wechat/start"><MessageCircle /> 微信扫码登录</Link> : <button className="wechat-secondary-action disabled" disabled><MessageCircle /> 微信登录待开放平台审核</button>}
      <ul className="login-consent"><li><Check /> 手机号只用于登录与服务通知</li><li><Check /> 测试素材不自动用于公开案例</li></ul>
      <Link className="preview-link" href="/">暂时使用演示身份浏览 <ArrowRight /></Link>
      <small className="legal-copy">继续即表示同意《服务协议》和《隐私政策》；测试协议与保密协议会在申请内测时单独签署。</small>
    </section>
  </main>;
}
