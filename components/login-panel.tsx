'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Check, LoaderCircle, LockKeyhole, MessageCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ProviderState = 'configured' | 'credentials_required' | 'application_review_required';

export function LoginPanel() {
  const [loading, setLoading] = useState(true);
  const [phoneState, setPhoneState] = useState<ProviderState>('credentials_required');
  const [wechatState, setWechatState] = useState<ProviderState>('application_review_required');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/api/auth/status').then((response) => response.json()).then((body) => {
      setPhoneState(body.providers.phoneOtp);
      setWechatState(body.providers.wechatWeb);
    }).finally(() => setLoading(false));
  }, []);

  function unavailable(provider: 'phone' | 'wechat') {
    setMessage(provider === 'phone' ? '手机号登录结构已完成；填入腾讯云短信凭据后即可启用验证码发送。' : '微信扫码入口已预留；网站应用审核并填入 AppID 后即可启用。');
  }

  return <main className="login-page">
    <section className="login-story">
      <a href="/"><ArrowLeft /> 返回产品预览</a>
      <span className="mark-glyph">S</span>
      <span className="panel-kicker">SILTOK ID</span>
      <h1>一次登录，连接你的项目、工作流和设备。</h1>
      <ul><li><Check /> 手机号只用于登录与服务通知</li><li><Check /> 微信联系授权与登录授权分开</li><li><Check /> 商业素材默认保持私密</li></ul>
    </section>
    <section className="login-panel">
      <div><span className="panel-kicker">WELCOME BACK</span><h2>登录 Siltok Lab</h2><p>当前为产品预览环境，数据库与对象存储已启用。</p></div>
      <form onSubmit={(event) => { event.preventDefault(); unavailable('phone'); }}>
        <label htmlFor="phone">手机号</label><div className="phone-input"><span>+86</span><Input id="phone" inputMode="tel" pattern="1[3-9][0-9]{9}" placeholder="请输入手机号" required /></div>
        <div className="otp-row"><Input inputMode="numeric" maxLength={6} placeholder="6 位验证码" aria-label="验证码" required /><Button type="button" variant="outline" onClick={() => unavailable('phone')}>获取验证码</Button></div>
        <Button className="login-primary" disabled={loading || phoneState !== 'configured'}>{loading ? <LoaderCircle className="animate-spin" /> : <Smartphone />} 手机号登录</Button>
      </form>
      <div className="login-separator"><span>或</span></div>
      <Button className="wechat-button" variant="outline" disabled={loading || wechatState !== 'configured'} onClick={() => unavailable('wechat')}><MessageCircle /> 微信扫码登录</Button>
      {message ? <div className="provider-message"><LockKeyhole /> {message}</div> : null}
      <Button className="preview-entry" variant="ghost" render={<a href="/" />}>使用演示身份进入产品</Button>
      <small>继续即表示同意服务协议与隐私政策；运营联系和案例公开会单独征得同意。</small>
    </section>
  </main>;
}
