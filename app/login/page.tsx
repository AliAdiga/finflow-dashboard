'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Zap, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

const C = {
  bg:'#07070E', surface:'#0C0C1C', border:'rgba(255,255,255,0.06)',
  blue:'#5B8AFF', green:'#00D98F', coral:'#FF5A6E',
  t1:'#EAEAF4', t2:'#7070A0', t3:'#3E3E60',
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#07070E;font-family:'DM Sans',system-ui,sans-serif}
  ::placeholder{color:#3E3E60;font-family:'DM Sans',sans-serif}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
  .up{animation:fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both}
  .si{animation:slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both}
  .btn-blue{transition:filter 0.15s}.btn-blue:hover{filter:brightness(1.1)}
  .btn-ghost:hover{background:rgba(255,255,255,0.06)!important}
  input{font-family:'DM Sans',sans-serif}
  a{text-decoration:none}
`

function InputField({ label, type = 'text', Icon, value, onChange, placeholder, disabled }) {
  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: C.t2, letterSpacing: '0.08em', display: 'block', marginBottom: 6, textTransform: 'uppercase' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: focused ? C.blue : C.t3, transition: 'color 0.15s', pointerEvents: 'none' }} />}
        <input
          type={type === 'password' && show ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ width: '100%', paddingLeft: Icon ? 38 : 14, paddingRight: type === 'password' ? 42 : 14, paddingTop: 11, paddingBottom: 11, borderRadius: 8, fontSize: 14, outline: 'none', background: 'rgba(255,255,255,0.04)', border: `1px solid ${focused ? 'rgba(91,138,255,0.5)' : 'rgba(255,255,255,0.09)'}`, color: C.t1, transition: 'border-color 0.15s', opacity: disabled ? 0.5 : 1 }}
        />
        {type === 'password' && (
          <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.t3, display: 'flex', alignItems: 'center' }}>
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError(err.message); setLoading(false) }
    else router.push('/dashboard')
  }

  const handleDemo = async () => {
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@finflow.io',
      password: process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'demo123456',
    })
    if (err) { setError('Demo account not configured yet.'); setLoading(false) }
    else router.push('/dashboard')
  }

  const features = ['Real-time MRR & ARR tracking', 'Churn prediction & alerts', 'Multi-channel acquisition analytics', 'Automated revenue reporting']

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundImage: 'radial-gradient(ellipse at 15% 15%, rgba(91,138,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 85%, rgba(0,217,143,0.05) 0%, transparent 50%), radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '100% 100%,100% 100%,28px 28px' }}>
        <div className="up" style={{ display: 'flex', gap: 40, alignItems: 'flex-start', maxWidth: 840, width: '100%' }}>

          {/* Left brand panel */}
          <div style={{ flex: 1, paddingTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#5B8AFF,#00D98F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={17} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, color: C.t1 }}>FinFlow</span>
            </div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 28, color: C.t1, lineHeight: 1.25, marginBottom: 12 }}>Track revenue.<br />Grow faster.</h2>
            <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 28 }}>The revenue intelligence platform trusted by 1,247+ growing SaaS companies.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {features.map((f, i) => (
                <div key={i} className="si" style={{ display: 'flex', alignItems: 'center', gap: 10, animationDelay: `${0.1 + i * 0.08}s` }}>
                  <CheckCircle size={15} color={C.green} />
                  <span style={{ fontSize: 13, color: C.t2 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: 20, background: 'rgba(91,138,255,0.07)', border: '1px solid rgba(91,138,255,0.15)', borderRadius: 12 }}>
              <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 10 }}>"FinFlow cut our reporting time by 80%. We know exactly where every dollar comes from."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#5B8AFF,#A855F7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>SL</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.t1 }}>Sarah Lin</div>
                  <div style={{ fontSize: 11, color: C.t3 }}>CFO, Momentum Inc</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div style={{ width: 380, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, color: C.t1, marginBottom: 4 }}>Welcome back</h3>
            <p style={{ fontSize: 13, color: C.t2, marginBottom: 24 }}>Sign in to your dashboard</p>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(255,90,110,0.1)', border: '1px solid rgba(255,90,110,0.25)', marginBottom: 16 }}>
                <AlertCircle size={14} color={C.coral} />
                <span style={{ fontSize: 13, color: C.coral }}>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <InputField label="Email address" type="email" Icon={Mail} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" disabled={loading} />
              <InputField label="Password" type="password" Icon={Lock} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" disabled={loading} />
              <div style={{ textAlign: 'right', marginTop: -6, marginBottom: 20 }}>
                <span style={{ fontSize: 12, color: C.blue, cursor: 'pointer' }}>Forgot password?</span>
              </div>
              <button type="submit" className="btn-blue" disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg,#5B8AFF,#4A6FE8)', color: 'white', fontSize: 14, fontWeight: 600, fontFamily: '"DM Sans",sans-serif', marginBottom: 10, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Signing in…' : 'Sign in to FinFlow'}
              </button>
            </form>

            <button onClick={handleDemo} className="btn-ghost" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 8, border: `1px solid ${C.border}`, cursor: 'pointer', background: 'transparent', color: C.t2, fontSize: 14, fontWeight: 500, fontFamily: '"DM Sans",sans-serif', transition: 'background 0.15s', marginBottom: 20 }}>
              Continue with demo →
            </button>

            <div style={{ textAlign: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <span style={{ fontSize: 13, color: C.t2 }}>New to FinFlow? </span>
              <Link href="/signup" style={{ fontSize: 13, color: C.blue, fontWeight: 500 }}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}