'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { Zap, Mail, Lock, Eye, EyeOff, User, Shield, CheckCircle, AlertCircle } from 'lucide-react'

const C = {
  bg: '#07070E', surface: '#0C0C1C', border: 'rgba(255,255,255,0.06)',
  blue: '#5B8AFF', green: '#00D98F', coral: '#FF5A6E', amber: '#F5A623',
  t1: '#EAEAF4', t2: '#7070A0', t3: '#3E3E60',
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
  input{font-family:'DM Sans',sans-serif}
  a{text-decoration:none}
`

function InputField({ label, type = 'text', Icon, value, onChange, placeholder, disabled }) {
  const [focused, setFocused] = useState(false)
  const [show, setShow] = useState(false)
  return (
    <div style={{ marginBottom: 13 }}>
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

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    setLoading(true)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (err) { setError(err.message); setLoading(false) }
    else setSuccess(true)
  }

  // ── Success state ──────────────────────────────────────
  if (success) {
    return (
      <>
        <style>{STYLES}</style>
        <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,217,143,0.07) 0%, transparent 50%), radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '100%,28px 28px' }}>
          <div className="up" style={{ width: 420, background: C.surface, border: `1px solid rgba(0,217,143,0.2)`, borderRadius: 16, padding: 40, textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,217,143,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={28} color={C.green} />
            </div>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, color: C.t1, marginBottom: 8 }}>Check your email</h3>
            <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 8 }}>We sent a confirmation link to</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.blue, marginBottom: 24 }}>{email}</p>
            <p style={{ fontSize: 13, color: C.t3, lineHeight: 1.6, marginBottom: 28 }}>Click the link in the email to activate your account. Check your spam folder if you don't see it.</p>
            <Link href="/login" style={{ display: 'block', width: '100%', padding: 12, borderRadius: 8, background: 'linear-gradient(135deg,#5B8AFF,#4A6FE8)', color: 'white', fontSize: 14, fontWeight: 600, fontFamily: '"DM Sans",sans-serif', textAlign: 'center' }}>
              Back to sign in →
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundImage: 'radial-gradient(ellipse at 80% 10%, rgba(91,138,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 90%, rgba(0,217,143,0.05) 0%, transparent 50%), radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '100% 100%,100% 100%,28px 28px' }}>
        <div className="up" style={{ display: 'flex', gap: 40, alignItems: 'flex-start', maxWidth: 840, width: '100%' }}>

          {/* Left panel */}
          <div style={{ flex: 1, paddingTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#5B8AFF,#00D98F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={17} color="white" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22, color: C.t1 }}>FinFlow</span>
            </div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 26, color: C.t1, lineHeight: 1.3, marginBottom: 12 }}>Start tracking<br />revenue today.</h2>
            <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 28 }}>Get your first insights in under 5 minutes. No credit card required.</p>
            {[{ Icon: Shield, label: 'SOC 2 Type II certified security' }, { Icon: Zap, label: 'Setup in under 5 minutes' }, { Icon: CheckCircle, label: '14-day free trial, cancel anytime' }].map(({ Icon, label }, i) => (
              <div key={i} className="si" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, animationDelay: `${0.1 + i * 0.08}s` }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(91,138,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} color={C.blue} />
                </div>
                <span style={{ fontSize: 13, color: C.t2 }}>{label}</span>
              </div>
            ))}
            <div style={{ marginTop: 28, display: 'flex', gap: 24 }}>
              {[{ n: '1,247+', l: 'Customers' }, { n: '$84M+', l: 'Revenue tracked' }, { n: '99.9%', l: 'Uptime' }].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 500, color: C.t1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: C.t3, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div style={{ width: 380, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 32 }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, color: C.t1, marginBottom: 4 }}>Create your account</h3>
            <p style={{ fontSize: 13, color: C.t2, marginBottom: 22 }}>Get started free — no credit card needed</p>

            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, background: 'rgba(255,90,110,0.1)', border: '1px solid rgba(255,90,110,0.25)', marginBottom: 14 }}>
                <AlertCircle size={14} color={C.coral} />
                <span style={{ fontSize: 13, color: C.coral }}>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignup}>
              <InputField label="Full name" type="text" Icon={User} value={name} onChange={e => setName(e.target.value)} placeholder="Ali Smith" disabled={loading} />
              <InputField label="Work email" type="email" Icon={Mail} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" disabled={loading} />
              <InputField label="Password" type="password" Icon={Lock} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" disabled={loading} />
              <InputField label="Confirm password" type="password" Icon={Lock} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" disabled={loading} />
              <p style={{ fontSize: 11, color: C.t3, marginBottom: 16, lineHeight: 1.6 }}>
                By creating an account you agree to our{' '}
                <span style={{ color: C.blue, cursor: 'pointer' }}>Terms of Service</span> and{' '}
                <span style={{ color: C.blue, cursor: 'pointer' }}>Privacy Policy</span>.
              </p>
              <button type="submit" className="btn-blue" disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg,#5B8AFF,#4A6FE8)', color: 'white', fontSize: 14, fontWeight: 600, fontFamily: '"DM Sans",sans-serif', marginBottom: 16, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Creating account…' : 'Create account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <span style={{ fontSize: 13, color: C.t2 }}>Already have an account? </span>
              <Link href="/login" style={{ fontSize: 13, color: C.blue, fontWeight: 500 }}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}