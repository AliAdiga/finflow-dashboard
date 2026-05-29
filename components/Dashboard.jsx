'use client'
import { useState, useEffect } from "react";
import { LayoutDashboard, TrendingUp, Receipt, Zap, TrendingDown, ArrowRight, Download, Search, Settings, Bell, LogOut, Eye, EyeOff, User, Mail, Lock, Shield, Target, Trash2, X, CheckCircle, ChevronRight } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const C = {
  bg:'#07070E',surface:'#0C0C1C',sidebar:'#09091A',
  border:'rgba(255,255,255,0.06)',
  blue:'#5B8AFF',green:'#00D98F',coral:'#FF5A6E',amber:'#F5A623',
  t1:'#EAEAF4',t2:'#7070A0',t3:'#3E3E60',
};
const PALETTE = {
  blue:{accent:'#5B8AFF',glow:'rgba(91,138,255,0.1)',border:'rgba(91,138,255,0.25)'},
  green:{accent:'#00D98F',glow:'rgba(0,217,143,0.09)',border:'rgba(0,217,143,0.22)'},
  amber:{accent:'#F5A623',glow:'rgba(245,166,35,0.09)',border:'rgba(245,166,35,0.22)'},
  coral:{accent:'#FF5A6E',glow:'rgba(255,90,110,0.09)',border:'rgba(255,90,110,0.22)'},
};
const STATUS_S={paid:{bg:'rgba(0,217,143,0.12)',text:'#00D98F'},pending:{bg:'rgba(245,166,35,0.12)',text:'#F5A623'},failed:{bg:'rgba(255,90,110,0.12)',text:'#FF5A6E'}};
const AVATAR_C=['#5B8AFF','#00D98F','#F5A623','#FF5A6E','#A855F7','#22D3EE'];

const revenueData=[
  {month:'Jun',revenue:52400,newMrr:8200,expansion:3100,churn:1800},
  {month:'Jul',revenue:58700,newMrr:9400,expansion:2800,churn:1900},
  {month:'Aug',revenue:61200,newMrr:7600,expansion:3400,churn:2100},
  {month:'Sep',revenue:65800,newMrr:10200,expansion:4100,churn:1600},
  {month:'Oct',revenue:69300,newMrr:8900,expansion:3600,churn:2200},
  {month:'Nov',revenue:72100,newMrr:9100,expansion:3200,churn:2400},
  {month:'Dec',revenue:74600,newMrr:8400,expansion:4800,churn:2100},
  {month:'Jan',revenue:76200,newMrr:7200,expansion:3900,churn:2500},
  {month:'Feb',revenue:78900,newMrr:8600,expansion:4200,churn:1900},
  {month:'Mar',revenue:79800,newMrr:7400,expansion:3100,churn:2800},
  {month:'Apr',revenue:81500,newMrr:9200,expansion:5100,churn:2100},
  {month:'May',revenue:84320,newMrr:10800,expansion:5600,churn:2200},
];
const transactions=[
  {id:'TXN-8821',customer:'Acme Corp',plan:'Enterprise',amount:2400,status:'paid',date:'May 28',avatar:'AC'},
  {id:'TXN-8820',customer:'Vercel Inc',plan:'Pro',amount:299,status:'paid',date:'May 28',avatar:'VI'},
  {id:'TXN-8819',customer:'Linear App',plan:'Pro',amount:299,status:'pending',date:'May 27',avatar:'LA'},
  {id:'TXN-8818',customer:'Figma Ltd',plan:'Starter',amount:49,status:'paid',date:'May 27',avatar:'FL'},
  {id:'TXN-8817',customer:'Stripe Inc',plan:'Enterprise',amount:2400,status:'paid',date:'May 26',avatar:'SI'},
  {id:'TXN-8816',customer:'Notion HQ',plan:'Pro',amount:299,status:'failed',date:'May 26',avatar:'NH'},
  {id:'TXN-8815',customer:'Loom Inc',plan:'Starter',amount:49,status:'paid',date:'May 25',avatar:'LI'},
  {id:'TXN-8814',customer:'Slack Corp',plan:'Enterprise',amount:2400,status:'paid',date:'May 25',avatar:'SC'},
  {id:'TXN-8813',customer:'Dropbox',plan:'Enterprise',amount:2400,status:'paid',date:'May 24',avatar:'DI'},
  {id:'TXN-8812',customer:'Atlassian',plan:'Pro',amount:299,status:'paid',date:'May 24',avatar:'AT'},
  {id:'TXN-8811',customer:'GitHub Inc',plan:'Starter',amount:49,status:'pending',date:'May 23',avatar:'GH'},
  {id:'TXN-8810',customer:'Zoom Corp',plan:'Pro',amount:299,status:'failed',date:'May 23',avatar:'ZC'},
];
const channels=[{name:'Direct / SEO',value:42,color:C.blue},{name:'Product Hunt',value:28,color:C.green},{name:'Referrals',value:18,color:C.amber},{name:'Paid Ads',value:12,color:C.coral}];
const planBreakdown=[{plan:'Enterprise',customers:48,mrr:115200,color:C.blue},{plan:'Pro',customers:312,mrr:93288,color:C.green},{plan:'Starter',customers:887,mrr:43463,color:C.amber}];
const SUMMARY=[{label:'Total Revenue (YTD)',target:813440,color:C.blue},{label:'New MRR (May)',target:10800,color:C.green},{label:'Expansion MRR (May)',target:5600,color:C.amber},{label:'Churned MRR (May)',target:2200,color:C.coral}];
const sparklines={
  mrr:[{v:52},{v:59},{v:61},{v:66},{v:69},{v:72},{v:75},{v:76},{v:79},{v:80},{v:82},{v:84}],
  arr:[{v:628},{v:704},{v:734},{v:790},{v:832},{v:865},{v:895},{v:914},{v:947},{v:958},{v:978},{v:1012}],
  customers:[{v:892},{v:934},{v:978},{v:1024},{v:1067},{v:1098},{v:1124},{v:1143},{v:1178},{v:1195},{v:1218},{v:1247}],
  churn:[{v:3.2},{v:3.1},{v:2.9},{v:2.8},{v:2.7},{v:2.8},{v:2.6},{v:2.7},{v:2.5},{v:2.6},{v:2.5},{v:2.4}],
};
const GOALS=[
  {label:'MRR Target',current:84320,target:100000,unit:'$',color:C.blue},
  {label:'New Customers',current:1247,target:1500,unit:'',color:C.green},
  {label:'Churn Goal',current:2.4,target:2.0,unit:'%',color:C.amber,inverse:true},
];
const NOTIFS=[
  {title:'New Enterprise signup — Acme Corp',time:'2m ago',color:C.green},
  {title:'Churn alert: Notion HQ payment failed',time:'18m ago',color:C.coral},
  {title:'MRR milestone reached: $84k',time:'1h ago',color:C.blue},
];

const STYLES=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600&family=JetBrains+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  ::placeholder{color:#3E3E60;font-family:'DM Sans',sans-serif}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.09);border-radius:3px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
  .up{animation:fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) both}
  .in{animation:fadeIn 0.4s ease both}
  .si{animation:slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both}
  .card:hover{transform:scale(1.022)}
  .card{transition:transform 0.2s ease}
  .rh:hover{background:rgba(255,255,255,0.025)!important}
  .nh:hover{background:rgba(255,255,255,0.04)!important}
  .btn:hover{background:rgba(255,255,255,0.08)!important}
  .btn-blue:hover{filter:brightness(1.1)}
  .btn-blue{transition:filter 0.15s}
  input{font-family:'DM Sans',sans-serif}
`;

function useCountUp(target,duration=1800,delay=0){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let timeout,raf;
    timeout=setTimeout(()=>{
      let start=null;
      function step(ts){if(!start)start=ts;const p=Math.min((ts-start)/duration,1);setVal(target*(1-Math.pow(1-p,3)));if(p<1)raf=requestAnimationFrame(step);}
      raf=requestAnimationFrame(step);
    },delay);
    return()=>{clearTimeout(timeout);cancelAnimationFrame(raf);};
  },[target]);
  return val;
}

function getGreeting(){const h=new Date().getHours();if(h<12)return'Good morning';if(h<18)return'Good afternoon';return'Good evening';}
function getDate(){return new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});}

// ── Input Field ───────────────────────────────────────────
function InputField({label,type='text',Icon,value,onChange,placeholder}){
  const [focused,setFocused]=useState(false);
  const [show,setShow]=useState(false);
  return(
    <div style={{marginBottom:16}}>
      <label style={{fontSize:12,fontWeight:600,color:C.t2,letterSpacing:'0.06em',display:'block',marginBottom:6,textTransform:'uppercase'}}>{label}</label>
      <div style={{position:'relative'}}>
        {Icon&&<Icon size={15} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:focused?C.blue:C.t3,transition:'color 0.15s',pointerEvents:'none'}}/>}
        <input
          type={type==='password'&&show?'text':type}
          value={value} onChange={onChange} placeholder={placeholder}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{width:'100%',paddingLeft:Icon?38:14,paddingRight:type==='password'?42:14,paddingTop:11,paddingBottom:11,borderRadius:8,fontSize:14,outline:'none',background:'rgba(255,255,255,0.04)',border:`1px solid ${focused?'rgba(91,138,255,0.5)':'rgba(255,255,255,0.09)'}`,color:C.t1,transition:'border-color 0.15s',}}
        />
        {type==='password'&&<button onClick={()=>setShow(!show)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:C.t3,display:'flex',alignItems:'center'}}>
          {show?<EyeOff size={15}/>:<Eye size={15}/>}
        </button>}
      </div>
    </div>
  );
}

// ── Login Page ────────────────────────────────────────────
function LoginPage({onLogin,onSignup}){
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const features=['Real-time MRR & ARR tracking','Churn prediction & alerts','Multi-channel acquisition analytics','Automated revenue reporting'];
  return(
    <div style={{minHeight:'100vh',background:C.bg,fontFamily:'"DM Sans",system-ui,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24,backgroundImage:'radial-gradient(ellipse at 15% 15%, rgba(91,138,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 85% 85%, rgba(0,217,143,0.05) 0%, transparent 50%), radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'100% 100%,100% 100%,28px 28px'}}>
      <div className="up" style={{display:'flex',gap:40,alignItems:'flex-start',maxWidth:840,width:'100%'}}>
        {/* Left brand panel */}
        <div style={{flex:1,paddingTop:8}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:32}}>
            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#5B8AFF,#00D98F)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Zap size={17} color="white" strokeWidth={2.5}/>
            </div>
            <span style={{fontFamily:'Syne',fontWeight:800,fontSize:22,color:C.t1}}>FinFlow</span>
          </div>
          <h2 style={{fontFamily:'Syne',fontWeight:700,fontSize:28,color:C.t1,lineHeight:1.25,marginBottom:12}}>Track revenue.<br/>Grow faster.</h2>
          <p style={{fontSize:14,color:C.t2,lineHeight:1.7,marginBottom:28}}>The revenue intelligence platform trusted by 1,247+ growing SaaS companies.</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {features.map((f,i)=>(
              <div key={i} className="si" style={{display:'flex',alignItems:'center',gap:10,animationDelay:`${0.1+i*0.08}s`}}>
                <CheckCircle size={15} color={C.green}/>
                <span style={{fontSize:13,color:C.t2}}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:32,padding:20,background:'rgba(91,138,255,0.07)',border:'1px solid rgba(91,138,255,0.15)',borderRadius:12}}>
            <p style={{fontSize:13,color:C.t2,lineHeight:1.6,fontStyle:'italic',marginBottom:10}}>"FinFlow cut our reporting time by 80%. We know exactly where every dollar comes from."</p>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#5B8AFF,#A855F7)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'white'}}>SL</div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:C.t1}}>Sarah Lin</div>
                <div style={{fontSize:11,color:C.t3}}>CFO, Momentum Inc</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div style={{width:380,background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:32}}>
          <h3 style={{fontFamily:'Syne',fontWeight:700,fontSize:20,color:C.t1,marginBottom:4}}>Welcome back</h3>
          <p style={{fontSize:13,color:C.t2,marginBottom:24}}>Sign in to your dashboard</p>
          <InputField label="Email address" type="email" Icon={Mail} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
          <InputField label="Password" type="password" Icon={Lock} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/>
          <div style={{textAlign:'right',marginTop:-8,marginBottom:20}}>
            <span style={{fontSize:12,color:C.blue,cursor:'pointer'}}>Forgot password?</span>
          </div>
          <button className="btn-blue" onClick={onLogin} style={{width:'100%',padding:'13px',borderRadius:8,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#5B8AFF,#4A6FE8)',color:'white',fontSize:14,fontWeight:600,fontFamily:'"DM Sans",sans-serif',marginBottom:12}}>
            Sign in to FinFlow
          </button>
          <button onClick={onLogin} className="btn" style={{width:'100%',padding:'12px',borderRadius:8,border:`1px solid ${C.border}`,cursor:'pointer',background:'transparent',color:C.t2,fontSize:14,fontWeight:500,fontFamily:'"DM Sans",sans-serif',transition:'background 0.15s',marginBottom:20}}>
            Continue with demo →
          </button>
          <div style={{textAlign:'center',borderTop:`1px solid ${C.border}`,paddingTop:16}}>
            <span style={{fontSize:13,color:C.t2}}>New to FinFlow? </span>
            <span onClick={onSignup} style={{fontSize:13,color:C.blue,cursor:'pointer',fontWeight:500}}>Create an account</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Signup Page ───────────────────────────────────────────
function SignupPage({onSignup,onLogin}){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const [cpw,setCpw]=useState('');
  return(
    <div style={{minHeight:'100vh',background:C.bg,fontFamily:'"DM Sans",system-ui,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24,backgroundImage:'radial-gradient(ellipse at 80% 10%, rgba(91,138,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 20% 90%, rgba(0,217,143,0.05) 0%, transparent 50%), radial-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)',backgroundSize:'100% 100%,100% 100%,28px 28px'}}>
      <div className="up" style={{display:'flex',gap:40,alignItems:'flex-start',maxWidth:840,width:'100%'}}>
        {/* Left */}
        <div style={{flex:1,paddingTop:8}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:32}}>
            <div style={{width:36,height:36,borderRadius:10,background:'linear-gradient(135deg,#5B8AFF,#00D98F)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <Zap size={17} color="white" strokeWidth={2.5}/>
            </div>
            <span style={{fontFamily:'Syne',fontWeight:800,fontSize:22,color:C.t1}}>FinFlow</span>
          </div>
          <h2 style={{fontFamily:'Syne',fontWeight:700,fontSize:26,color:C.t1,lineHeight:1.3,marginBottom:12}}>Start tracking<br/>revenue today.</h2>
          <p style={{fontSize:14,color:C.t2,lineHeight:1.7,marginBottom:28}}>Get your first insights in under 5 minutes. No credit card required.</p>
          {[{icon:Shield,label:'SOC 2 Type II certified'},{icon:Zap,label:'Setup in under 5 minutes'},{icon:CheckCircle,label:'14-day free trial, cancel anytime'}].map(({icon:Icon,label},i)=>(
            <div key={i} className="si" style={{display:'flex',alignItems:'center',gap:10,marginBottom:10,animationDelay:`${0.1+i*0.08}s`}}>
              <div style={{width:28,height:28,borderRadius:8,background:`rgba(91,138,255,0.1)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Icon size={13} color={C.blue}/>
              </div>
              <span style={{fontSize:13,color:C.t2}}>{label}</span>
            </div>
          ))}
          <div style={{marginTop:28,display:'flex',gap:20}}>
            {[{n:'1,247+',l:'Customers'},{n:'$84M+',l:'Revenue tracked'},{n:'99.9%',l:'Uptime'}].map(s=>(
              <div key={s.l}>
                <div style={{fontFamily:'JetBrains Mono',fontSize:18,fontWeight:500,color:C.t1}}>{s.n}</div>
                <div style={{fontSize:11,color:C.t3,marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={{width:380,background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:32}}>
          <h3 style={{fontFamily:'Syne',fontWeight:700,fontSize:20,color:C.t1,marginBottom:4}}>Create your account</h3>
          <p style={{fontSize:13,color:C.t2,marginBottom:24}}>Get started free — no credit card needed</p>
          <InputField label="Full name" type="text" Icon={User} value={name} onChange={e=>setName(e.target.value)} placeholder="Ali Smith"/>
          <InputField label="Work email" type="email" Icon={Mail} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
          <InputField label="Password" type="password" Icon={Lock} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Min. 8 characters"/>
          <InputField label="Confirm password" type="password" Icon={Lock} value={cpw} onChange={e=>setCpw(e.target.value)} placeholder="Repeat password"/>
          <p style={{fontSize:11,color:C.t3,marginBottom:16,lineHeight:1.6}}>By creating an account you agree to our <span style={{color:C.blue}}>Terms of Service</span> and <span style={{color:C.blue}}>Privacy Policy</span>.</p>
          <button className="btn-blue" onClick={onSignup} style={{width:'100%',padding:'13px',borderRadius:8,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#5B8AFF,#4A6FE8)',color:'white',fontSize:14,fontWeight:600,fontFamily:'"DM Sans",sans-serif',marginBottom:16}}>
            Create account
          </button>
          <div style={{textAlign:'center',borderTop:`1px solid ${C.border}`,paddingTop:16}}>
            <span style={{fontSize:13,color:C.t2}}>Already have an account? </span>
            <span onClick={onLogin} style={{fontSize:13,color:C.blue,cursor:'pointer',fontWeight:500}}>Sign in</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────
function Sidebar({page,setPage,onLogout}){
  const nav=[{id:'overview',label:'Overview',Icon:LayoutDashboard},{id:'revenue',label:'Revenue',Icon:TrendingUp},{id:'transactions',label:'Transactions',Icon:Receipt},{id:'settings',label:'Settings',Icon:Settings}];
  return(
    <div style={{width:195,flexShrink:0,background:C.sidebar,borderRight:'1px solid rgba(255,255,255,0.05)',display:'flex',flexDirection:'column',padding:'20px 0',position:'sticky',top:0,height:'100vh',alignSelf:'flex-start'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 18px',marginBottom:28}}>
        <div style={{width:28,height:28,borderRadius:8,background:'linear-gradient(135deg,#5B8AFF,#00D98F)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><Zap size={13} color="white" strokeWidth={2.5}/></div>
        <span style={{fontFamily:'Syne',fontWeight:700,fontSize:17,color:C.t1,letterSpacing:'-0.3px'}}>FinFlow</span>
      </div>
      <div style={{flex:1,padding:'0 10px'}}>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:'0.12em',color:C.t3,padding:'0 10px',marginBottom:8,textTransform:'uppercase'}}>Main</div>
        {nav.map(({id,label,Icon})=>{
          const a=page===id;
          return(
            <button key={id} className="nh" onClick={()=>setPage(id)} style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8,border:a?'1px solid rgba(91,138,255,0.22)':'1px solid transparent',background:a?'rgba(91,138,255,0.11)':'transparent',color:a?C.t1:C.t2,fontSize:13,fontWeight:500,cursor:'pointer',textAlign:'left',marginBottom:2,position:'relative',transition:'background 0.15s,border-color 0.15s'}}>
              {a&&<div style={{position:'absolute',left:0,top:'50%',transform:'translateY(-50%)',width:3,height:20,background:C.blue,borderRadius:'0 2px 2px 0'}}/>}
              <Icon size={15} color={a?C.blue:C.t2} strokeWidth={2}/>
              {label}
            </button>
          );
        })}
      </div>
      <div style={{padding:'0 10px',borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:12}}>
        <button onClick={onLogout} className="nh" style={{width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:8,border:'none',background:'transparent',color:C.t2,fontSize:13,fontWeight:500,cursor:'pointer',transition:'background 0.15s',marginBottom:8}}>
          <LogOut size={15} color={C.t2} strokeWidth={2}/>Sign out
        </button>
        <div style={{display:'flex',alignItems:'center',gap:10,padding:12,background:'rgba(255,255,255,0.03)',borderRadius:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,rgba(91,138,255,0.2),rgba(0,217,143,0.2))',border:'1px solid rgba(91,138,255,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:C.blue,fontFamily:'JetBrains Mono',flexShrink:0}}>AS</div>
          <div style={{minWidth:0,flex:1}}>
            <div style={{fontSize:12,fontWeight:600,color:C.t1}}>Ali S.</div>
            <div style={{fontSize:10,color:C.t3,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>admin@finflow.io</div>
          </div>
          <div style={{width:7,height:7,borderRadius:'50%',background:C.green,boxShadow:`0 0 6px ${C.green}`,flexShrink:0}}/>
        </div>
      </div>
    </div>
  );
}

// ── TopBar ────────────────────────────────────────────────
function TopBar(){
  const [showNotifs,setShowNotifs]=useState(false);
  return(
    <div style={{position:'sticky',top:0,zIndex:50,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 32px',background:'rgba(7,7,14,0.85)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
      <div>
        <span style={{fontFamily:'Syne',fontSize:13,fontWeight:600,color:C.t2}}>{getGreeting()}, <span style={{color:C.t1}}>Ali</span></span>
        <span style={{fontSize:12,color:C.t3,marginLeft:16}}>{getDate()}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,position:'relative'}}>
        <button className="btn" onClick={()=>setShowNotifs(!showNotifs)} style={{position:'relative',width:34,height:34,borderRadius:8,border:`1px solid ${C.border}`,background:'rgba(255,255,255,0.04)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'background 0.15s'}}>
          <Bell size={15} color={C.t2}/>
          <div style={{position:'absolute',top:6,right:6,width:7,height:7,borderRadius:'50%',background:C.coral,border:'1.5px solid #07070E'}}/>
        </button>
        {showNotifs&&(
          <div style={{position:'absolute',top:42,right:0,width:290,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:'14px 16px',boxShadow:'0 20px 60px rgba(0,0,0,0.5)',zIndex:100}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span style={{fontFamily:'Syne',fontSize:13,fontWeight:600,color:C.t1}}>Notifications</span>
              <button onClick={()=>setShowNotifs(false)} style={{background:'none',border:'none',cursor:'pointer',color:C.t3,display:'flex'}}><X size={14}/></button>
            </div>
            {NOTIFS.map((n,i)=>(
              <div key={i} style={{display:'flex',gap:10,padding:'10px 0',borderTop:`1px solid ${C.border}`}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:n.color,marginTop:4,flexShrink:0}}/>
                <div>
                  <div style={{fontSize:12,color:C.t1,lineHeight:1.4}}>{n.title}</div>
                  <div style={{fontSize:11,color:C.t3,marginTop:3}}>{n.time}</div>
                </div>
              </div>
            ))}
            <button style={{width:'100%',marginTop:10,padding:'8px',borderRadius:8,border:'none',background:'rgba(255,255,255,0.04)',color:C.t2,fontSize:12,cursor:'pointer',fontFamily:'"DM Sans",sans-serif'}}>View all notifications</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mini Sparkline ────────────────────────────────────────
function MiniSparkline({data,color}){
  return(
    <div style={{position:'absolute',bottom:4,right:4,width:72,height:36,opacity:0.45,pointerEvents:'none'}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} animationDuration={1200}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Metric Card ───────────────────────────────────────────
function MetricCard({title,target,prefix='',suffix='',dec=0,change,invertChange=false,color,highlight=false,delay=0,spark}){
  const raw=useCountUp(target,1800,delay);
  const displayed=prefix+new Intl.NumberFormat('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec}).format(raw)+suffix;
  const isGood=invertChange?change<0:change>0;
  const p=PALETTE[color];
  return(
    <div className="up card" style={{animationDelay:`${delay}ms`,position:'relative',borderRadius:12,padding:20,overflow:'hidden',background:C.surface,border:highlight?`1px solid ${p.border}`:`1px solid ${C.border}`,boxShadow:highlight?`0 0 30px ${p.glow}`:'none'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:p.accent}}/>
      {highlight&&<div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 0% 0%, ${p.glow}, transparent 60%)`,pointerEvents:'none'}}/>}
      {spark&&<MiniSparkline data={spark} color={p.accent}/>}
      <div style={{position:'relative'}}>
        <div style={{fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:C.t2,marginBottom:12}}>{title}</div>
        <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:8}}>
          <div style={{fontFamily:'JetBrains Mono',fontSize:23,fontWeight:500,color:C.t1}}>{displayed}</div>
          <div style={{display:'flex',alignItems:'center',gap:4,fontSize:11,fontWeight:700,padding:'4px 8px',borderRadius:20,flexShrink:0,background:isGood?'rgba(0,217,143,0.12)':'rgba(255,90,110,0.12)',color:isGood?C.green:C.coral}}>
            {isGood?<TrendingUp size={10} strokeWidth={2.5}/>:<TrendingDown size={10} strokeWidth={2.5}/>}
            {Math.abs(change)}%
          </div>
        </div>
        <div style={{fontSize:11,color:C.t3,marginTop:8}}>vs. last month</div>
      </div>
    </div>
  );
}

// ── Goals Widget ──────────────────────────────────────────
function GoalsWidget(){
  const [mounted,setMounted]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>setMounted(true),500);return()=>clearTimeout(t);},[]);
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:18}}>
        <Target size={15} color={C.blue}/>
        <span style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1}}>Monthly Goals</span>
      </div>
      {GOALS.map((g,i)=>{
        const pct=g.inverse?Math.min((g.target/g.current)*100,100):Math.min((g.current/g.target)*100,100);
        const onTrack=g.inverse?g.current<=g.target*1.2:pct>=70;
        return(
          <div key={i} style={{marginBottom:i<GOALS.length-1?16:0}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
              <span style={{fontSize:12,color:C.t2}}>{g.label}</span>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontFamily:'JetBrains Mono',fontSize:12,color:C.t1}}>{g.unit}{typeof g.current==='number'&&g.current>100?g.current.toLocaleString():g.current}{g.unit==='%'?'':''}</span>
                <span style={{fontSize:11,color:C.t3}}>/ {g.unit}{typeof g.target==='number'&&g.target>100?g.target.toLocaleString():g.target}{g.unit==='%'?'':''}</span>
                <div style={{width:6,height:6,borderRadius:'50%',background:onTrack?C.green:C.amber}}/>
              </div>
            </div>
            <div style={{height:5,background:'rgba(255,255,255,0.05)',borderRadius:4,overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:4,background:onTrack?C.green:C.amber,width:mounted?`${pct}%`:'0%',transition:'width 1.2s cubic-bezier(0.16,1,0.3,1)'}}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Revenue Chart ─────────────────────────────────────────
function RevTip({active,payload,label}){if(!active||!payload?.length)return null;return(<div style={{background:'#0F0F22',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'12px 16px'}}><div style={{fontSize:12,color:C.t2,marginBottom:6}}>{label} 2024</div><div style={{fontFamily:'JetBrains Mono',fontSize:18,fontWeight:500,color:C.t1}}>${payload[0].value.toLocaleString()}</div></div>);}
function RevenueChart({data}){
  const [period,setPeriod]=useState('12M');
  const d=period==='6M'?data.slice(-6):data;
  return(
    <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:24}}>
        <div><div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1}}>Revenue Trend</div><div style={{fontSize:13,color:C.t2,marginTop:2}}>Monthly Recurring Revenue</div></div>
        <div style={{display:'flex',gap:4,padding:4,background:'rgba(255,255,255,0.04)',borderRadius:8}}>
          {['6M','12M'].map(p=><button key={p} onClick={()=>setPeriod(p)} style={{padding:'6px 12px',borderRadius:6,border:'none',cursor:'pointer',fontSize:12,fontWeight:600,background:period===p?'rgba(255,255,255,0.09)':'transparent',color:period===p?C.t1:C.t2,transition:'background 0.15s',fontFamily:'"DM Sans",sans-serif'}}>{p}</button>)}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={d} margin={{top:6,right:8,left:0,bottom:0}}>
          <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5B8AFF" stopOpacity={0.35}/><stop offset="100%" stopColor="#5B8AFF" stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
          <XAxis dataKey="month" tick={{fill:'#7070A0',fontSize:12}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:'#7070A0',fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} width={40}/>
          <Tooltip content={<RevTip/>} cursor={{stroke:'rgba(255,255,255,0.07)',strokeWidth:1}}/>
          <Area type="monotone" dataKey="revenue" stroke="#5B8AFF" strokeWidth={2.5} fill="url(#rg)" dot={false} activeDot={{r:5,fill:'#5B8AFF',stroke:'#0C0C1C',strokeWidth:2.5}} animationDuration={1100}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Recent Transactions ───────────────────────────────────
function TxRow({tx,i}){const s=STATUS_S[tx.status];const ac=AVATAR_C[i%AVATAR_C.length];return(<div className="rh" style={{display:'flex',alignItems:'center',gap:12,padding:'10px 12px',borderRadius:10,cursor:'pointer',transition:'background 0.1s'}}><div style={{width:32,height:32,borderRadius:8,flexShrink:0,background:`${ac}1A`,color:ac,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,fontFamily:'JetBrains Mono'}}>{tx.avatar}</div><div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,color:C.t1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{tx.customer}</div><div style={{fontSize:11,color:C.t3,fontFamily:'JetBrains Mono'}}>{tx.id}</div></div><div style={{fontSize:12,color:C.t3,flexShrink:0}}>{tx.date}</div><div style={{display:'flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:20,fontSize:11,fontWeight:600,flexShrink:0,background:s.bg,color:s.text}}><div style={{width:5,height:5,borderRadius:'50%',background:s.text}}/>{tx.status}</div><div style={{fontFamily:'JetBrains Mono',fontSize:13,fontWeight:500,color:C.t1,width:60,textAlign:'right',flexShrink:0}}>${tx.amount.toLocaleString()}</div></div>);}
function RecentTransactions({data,onViewAll}){return(<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}><div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1}}>Recent Transactions</div><button onClick={onViewAll} style={{display:'flex',alignItems:'center',gap:4,fontSize:12,fontWeight:500,color:C.blue,background:'none',border:'none',cursor:'pointer'}}>View all<ArrowRight size={11}/></button></div>{data.map((tx,i)=><div key={tx.id} className="in" style={{animationDelay:`${0.3+i*0.055}s`}}><TxRow tx={tx} i={i}/></div>)}</div>);}

// ── Top Channels ──────────────────────────────────────────
function TopChannels({data}){return(<div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}><div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:18}}>Acquisition</div><div style={{display:'flex',height:9,borderRadius:20,overflow:'hidden',gap:1,marginBottom:18}}>{data.map((c,i)=><div key={i} style={{width:`${c.value}%`,background:c.color,height:'100%',...(i===0?{borderRadius:'20px 0 0 20px'}:i===data.length-1?{borderRadius:'0 20px 20px 0'}:{})}}/>)}</div><div style={{display:'flex',flexDirection:'column',gap:11}}>{data.map((c,i)=><div key={i} className="in" style={{display:'flex',alignItems:'center',gap:10,animationDelay:`${0.4+i*0.07}s`}}><div style={{width:10,height:10,borderRadius:2,background:c.color,flexShrink:0}}/><span style={{fontSize:13,color:C.t2,flex:1}}>{c.name}</span><span style={{fontFamily:'JetBrains Mono',fontSize:13,fontWeight:500,color:C.t1}}>{c.value}%</span></div>)}</div><div style={{borderTop:`1px solid ${C.border}`,marginTop:14,paddingTop:12,display:'flex',justifyContent:'space-between'}}><span style={{fontSize:12,color:C.t3}}>Total attributed</span><span style={{fontFamily:'JetBrains Mono',fontSize:12,fontWeight:500,color:C.t2}}>1,247</span></div></div>);}

// ── Pages ─────────────────────────────────────────────────
function OverviewPage({setPage}){
  return(
    <div style={{padding:32}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:28}}>
        <div><div style={{display:'flex',alignItems:'center',gap:10,marginBottom:5}}><h1 style={{fontFamily:'Syne',fontWeight:700,fontSize:22,color:C.t1}}>Overview</h1><div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(0,217,143,0.1)',border:'1px solid rgba(0,217,143,0.2)',borderRadius:20,padding:'3px 10px'}}><div style={{width:6,height:6,borderRadius:'50%',background:C.green,animation:'pulse 2s ease-in-out infinite'}}/><span style={{fontSize:10,fontWeight:700,color:C.green,letterSpacing:'0.1em',textTransform:'uppercase'}}>Live</span></div></div><div style={{fontSize:13,color:C.t2}}>May 2024 · All plans · Global</div></div>
        <button className="btn" style={{display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:8,background:'rgba(255,255,255,0.05)',border:`1px solid ${C.border}`,color:C.t1,fontSize:13,fontWeight:500,cursor:'pointer',transition:'background 0.15s',fontFamily:'"DM Sans",sans-serif'}}><Download size={13}/>Export</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
        <MetricCard title="Monthly Recurring Revenue" target={84320} prefix="$" change={12.5} color="blue" highlight delay={0} spark={sparklines.mrr}/>
        <MetricCard title="Annual Recurring Revenue" target={1011840} prefix="$" change={12.5} color="green" delay={90} spark={sparklines.arr}/>
        <MetricCard title="Active Customers" target={1247} change={8.3} color="amber" delay={180} spark={sparklines.customers}/>
        <MetricCard title="Churn Rate" target={2.4} suffix="%" dec={1} change={-0.3} invertChange color="coral" delay={270} spark={sparklines.churn}/>
      </div>
      <div className="up" style={{animationDelay:'0.42s',marginBottom:20}}><RevenueChart data={revenueData}/></div>
      <div className="up" style={{animationDelay:'0.52s',display:'grid',gridTemplateColumns:'1fr',gap:14,marginBottom:14}}><GoalsWidget/></div>
      <div className="up" style={{animationDelay:'0.58s',display:'grid',gridTemplateColumns:'1fr 170px',gap:14}}>
        <RecentTransactions data={transactions.slice(0,5)} onViewAll={()=>setPage('transactions')}/>
        <TopChannels data={channels}/>
      </div>
    </div>
  );
}

function SummaryCard({label,target,color,delay}){const val=useCountUp(target,1800,delay);return(<div className="up card" style={{animationDelay:`${delay}ms`,background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:20}}><div style={{width:8,height:8,borderRadius:'50%',background:color,marginBottom:12}}/><div style={{fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:C.t2,marginBottom:8}}>{label}</div><div style={{fontFamily:'JetBrains Mono',fontSize:22,fontWeight:500,color:C.t1}}>${Math.round(val).toLocaleString()}</div></div>);}
function PlanCard({plan,index}){const val=useCountUp(plan.mrr,1800,600+index*100);const pct=Math.round((plan.mrr/115200)*100);return(<div className="up card" style={{animationDelay:`${0.6+index*0.1}s`,background:C.bg,border:`1px solid ${plan.color}30`,borderRadius:12,padding:18}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}><span style={{fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:6,background:`${plan.color}18`,color:plan.color,letterSpacing:'0.04em'}}>{plan.plan}</span><span style={{fontSize:11,color:C.t3}}>{plan.customers} customers</span></div><div style={{fontFamily:'JetBrains Mono',fontSize:20,fontWeight:500,color:C.t1,marginBottom:3}}>${Math.round(val).toLocaleString()}</div><div style={{fontSize:11,color:C.t3,marginBottom:10}}>Monthly revenue</div><div style={{height:3,background:'rgba(255,255,255,0.05)',borderRadius:3,overflow:'hidden'}}><div style={{height:'100%',background:plan.color,borderRadius:3,width:`${pct}%`,transition:'width 1s cubic-bezier(0.16,1,0.3,1)'}}/></div></div>);}
function BarTip({active,payload,label}){if(!active||!payload?.length)return null;return(<div style={{background:'#0F0F22',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'12px 16px'}}><div style={{fontSize:12,color:C.t2,marginBottom:6}}>{label}</div>{payload.map(p=><div key={p.dataKey} style={{fontFamily:'JetBrains Mono',fontSize:12,color:p.fill,marginBottom:2}}>{p.dataKey}: <span style={{color:C.t1}}>${p.value.toLocaleString()}</span></div>)}</div>);}

function RevenuePage(){
  const stackedData=revenueData.map(d=>({month:d.month,'New MRR':d.newMrr,Expansion:d.expansion,Churn:d.churn}));
  return(
    <div style={{padding:32}}>
      <div style={{marginBottom:28}}><h1 style={{fontFamily:'Syne',fontWeight:700,fontSize:22,color:C.t1,marginBottom:5}}>Revenue</h1><div style={{fontSize:13,color:C.t2}}>Detailed revenue analytics and breakdown</div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>{SUMMARY.map((s,i)=><SummaryCard key={s.label} {...s} delay={i*80}/>)}</div>
      <div className="up" style={{animationDelay:'0.38s',background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24,marginBottom:20}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:3}}>MRR Breakdown</div>
        <div style={{fontSize:13,color:C.t2,marginBottom:14}}>New, Expansion, and Churn by month</div>
        <div style={{display:'flex',gap:16,marginBottom:14}}>{[{l:'New MRR',c:C.blue},{l:'Expansion',c:C.green},{l:'Churn',c:C.coral}].map(x=><div key={x.l} style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:10,height:10,borderRadius:2,background:x.c}}/><span style={{fontSize:12,color:C.t2}}>{x.l}</span></div>)}</div>
        <ResponsiveContainer width="100%" height={190}>
          <BarChart data={stackedData} barGap={3} margin={{top:4,right:8,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="month" tick={{fill:'#7070A0',fontSize:12}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'#7070A0',fontSize:12}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} width={40}/>
            <Tooltip content={<BarTip/>} cursor={{fill:'rgba(255,255,255,0.025)'}}/>
            <Bar dataKey="New MRR" fill={C.blue} radius={[3,3,0,0]} maxBarSize={14}/>
            <Bar dataKey="Expansion" fill={C.green} radius={[3,3,0,0]} maxBarSize={14}/>
            <Bar dataKey="Churn" fill={C.coral} radius={[3,3,0,0]} maxBarSize={14}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="up" style={{animationDelay:'0.52s',background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:16}}>Revenue by Plan</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>{planBreakdown.map((p,i)=><PlanCard key={p.plan} plan={p} index={i}/>)}</div>
      </div>
    </div>
  );
}

function TransactionsPage(){
  const [filter,setFilter]=useState('all');
  const [search,setSearch]=useState('');
  const counts={all:transactions.length,paid:transactions.filter(t=>t.status==='paid').length,pending:transactions.filter(t=>t.status==='pending').length,failed:transactions.filter(t=>t.status==='failed').length};
  const filtered=transactions.filter(t=>{if(filter!=='all'&&t.status!==filter)return false;if(search&&!t.customer.toLowerCase().includes(search.toLowerCase()))return false;return true;});
  return(
    <div style={{padding:32}}>
      <div style={{marginBottom:28}}><h1 style={{fontFamily:'Syne',fontWeight:700,fontSize:22,color:C.t1,marginBottom:5}}>Transactions</h1><div style={{fontSize:13,color:C.t2}}>{transactions.length} total transactions</div></div>
      <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{position:'relative'}}><Search size={13} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:C.t3,pointerEvents:'none'}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers…" style={{paddingLeft:30,paddingRight:14,height:34,borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,color:C.t1,fontSize:13,outline:'none',width:200}}/></div>
        <div style={{display:'flex',gap:3,padding:4,background:'rgba(255,255,255,0.04)',borderRadius:8}}>{['all','paid','pending','failed'].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:'5px 11px',borderRadius:6,border:'none',cursor:'pointer',fontSize:12,fontWeight:600,background:filter===f?'rgba(255,255,255,0.09)':'transparent',color:filter===f?C.t1:C.t2,textTransform:'capitalize',transition:'background 0.15s',fontFamily:'"DM Sans",sans-serif'}}>{f} <span style={{opacity:0.5}}>({counts[f]})</span></button>)}</div>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:'32px 1fr 86px 76px 78px 68px',gap:12,padding:'10px 16px',borderBottom:`1px solid ${C.border}`,fontSize:10,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.1em',color:C.t3}}>
          <div/><div>Customer</div><div>ID</div><div>Plan</div><div>Status</div><div style={{textAlign:'right'}}>Amount</div>
        </div>
        {filtered.length===0?<div style={{textAlign:'center',padding:40,color:C.t3,fontSize:14}}>No transactions found.</div>:filtered.map((tx,i)=>{const s=STATUS_S[tx.status];const ac=AVATAR_C[i%AVATAR_C.length];return(<div key={tx.id} className="rh" style={{display:'grid',gridTemplateColumns:'32px 1fr 86px 76px 78px 68px',gap:12,padding:'12px 16px',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.03)',cursor:'pointer',transition:'background 0.1s'}}><div style={{width:32,height:32,borderRadius:8,background:`${ac}1A`,color:ac,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,fontFamily:'JetBrains Mono'}}>{tx.avatar}</div><div><div style={{fontSize:13,fontWeight:500,color:C.t1}}>{tx.customer}</div><div style={{fontSize:11,color:C.t3}}>{tx.date}</div></div><div style={{fontFamily:'JetBrains Mono',fontSize:11,color:C.t3}}>{tx.id}</div><div style={{fontSize:12,padding:'4px 8px',borderRadius:6,background:'rgba(255,255,255,0.05)',color:C.t2,width:'fit-content'}}>{tx.plan}</div><div style={{display:'flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:20,background:s.bg,color:s.text,fontSize:11,fontWeight:600,width:'fit-content'}}><div style={{width:5,height:5,borderRadius:'50%',background:s.text}}/>{tx.status}</div><div style={{fontFamily:'JetBrains Mono',fontSize:13,fontWeight:500,color:C.t1,textAlign:'right'}}>${tx.amount.toLocaleString()}</div></div>);})}
      </div>
    </div>
  );
}

function Toggle({on,onChange}){return(<button onClick={()=>onChange(!on)} style={{width:44,height:24,borderRadius:12,border:'none',cursor:'pointer',background:on?C.blue:'rgba(255,255,255,0.1)',position:'relative',transition:'background 0.2s',flexShrink:0}}><div style={{position:'absolute',top:3,left:on?23:3,width:18,height:18,borderRadius:'50%',background:'white',transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.3)'}}/></button>);}

function SettingsPage(){
  const [notifs,setNotifs]=useState({email:true,push:false,weekly:true,alerts:true});
  const [name,setName]=useState('Ali S.');
  const [email,setEmail]=useState('admin@finflow.io');
  const [company,setCompany]=useState('FinFlow Inc');
  const [role,setRole]=useState('Admin');
  return(
    <div style={{padding:32,maxWidth:680}}>
      <div style={{marginBottom:28}}><h1 style={{fontFamily:'Syne',fontWeight:700,fontSize:22,color:C.t1,marginBottom:5}}>Settings</h1><div style={{fontSize:13,color:C.t2}}>Manage your account and preferences</div></div>

      {/* Profile */}
      <div className="up" style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24,marginBottom:16}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:20,display:'flex',alignItems:'center',gap:8}}><User size={15} color={C.blue}/>Profile</div>
        <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:24,padding:16,background:'rgba(255,255,255,0.03)',borderRadius:10}}>
          <div style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,rgba(91,138,255,0.3),rgba(0,217,143,0.3))',border:'2px solid rgba(91,138,255,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:700,color:C.blue,fontFamily:'JetBrains Mono',flexShrink:0}}>AS</div>
          <div><div style={{fontSize:15,fontWeight:600,color:C.t1,marginBottom:2}}>{name}</div><div style={{fontSize:12,color:C.t2}}>{email}</div><div style={{fontSize:11,color:C.t3,marginTop:4}}>Admin · FinFlow Inc</div></div>
          <button className="btn" style={{marginLeft:'auto',padding:'7px 14px',borderRadius:8,border:`1px solid ${C.border}`,background:'rgba(255,255,255,0.04)',color:C.t2,fontSize:12,cursor:'pointer',transition:'background 0.15s',fontFamily:'"DM Sans",sans-serif'}}>Change photo</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <InputField label="Full name" type="text" Icon={User} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
          <InputField label="Email address" type="email" Icon={Mail} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
          <InputField label="Company" type="text" Icon={Shield} value={company} onChange={e=>setCompany(e.target.value)} placeholder="Company name"/>
          <InputField label="Role" type="text" Icon={User} value={role} onChange={e=>setRole(e.target.value)} placeholder="Your role"/>
        </div>
        <button className="btn-blue" style={{marginTop:16,padding:'10px 20px',borderRadius:8,border:'none',cursor:'pointer',background:'linear-gradient(135deg,#5B8AFF,#4A6FE8)',color:'white',fontSize:13,fontWeight:600,fontFamily:'"DM Sans",sans-serif'}}>Save changes</button>
      </div>

      {/* Notifications */}
      <div className="up" style={{animationDelay:'0.1s',background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24,marginBottom:16}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:20,display:'flex',alignItems:'center',gap:8}}><Bell size={15} color={C.amber}/>Notifications</div>
        {[{key:'email',label:'Email notifications',desc:'Receive updates and reports via email'},{key:'push',label:'Push notifications',desc:'Browser push alerts for critical events'},{key:'weekly',label:'Weekly digest',desc:'Summary of your revenue metrics every Monday'},{key:'alerts',label:'Churn alerts',desc:'Immediate alerts when customers cancel'}].map(n=>(
          <div key={n.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:`1px solid ${C.border}`}}>
            <div><div style={{fontSize:13,fontWeight:500,color:C.t1,marginBottom:2}}>{n.label}</div><div style={{fontSize:12,color:C.t3}}>{n.desc}</div></div>
            <Toggle on={notifs[n.key]} onChange={v=>setNotifs({...notifs,[n.key]:v})}/>
          </div>
        ))}
      </div>

      {/* Security */}
      <div className="up" style={{animationDelay:'0.2s',background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:24,marginBottom:16}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.t1,marginBottom:20,display:'flex',alignItems:'center',gap:8}}><Shield size={15} color={C.green}/>Security</div>
        {[{label:'Change password',desc:'Update your account password'},{ label:'Two-factor authentication',desc:'Add an extra layer of security'},{label:'Active sessions',desc:'Manage devices signed into your account'}].map((item,i)=>(
          <button key={i} className="rh" style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 0',borderBottom:`1px solid ${C.border}`,background:'none',border:'none',borderBottom:`1px solid ${C.border}`,cursor:'pointer',textAlign:'left'}}>
            <div><div style={{fontSize:13,fontWeight:500,color:C.t1,marginBottom:2}}>{item.label}</div><div style={{fontSize:12,color:C.t3}}>{item.desc}</div></div>
            <ChevronRight size={15} color={C.t3}/>
          </button>
        ))}
      </div>

      {/* Danger zone */}
      <div className="up" style={{animationDelay:'0.3s',background:'rgba(255,90,110,0.05)',border:'1px solid rgba(255,90,110,0.2)',borderRadius:12,padding:24}}>
        <div style={{fontFamily:'Syne',fontWeight:600,fontSize:15,color:C.coral,marginBottom:16,display:'flex',alignItems:'center',gap:8}}><Trash2 size={15}/>Danger Zone</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div><div style={{fontSize:13,fontWeight:500,color:C.t1,marginBottom:2}}>Delete account</div><div style={{fontSize:12,color:C.t3}}>Permanently delete your account and all data</div></div>
          <button className="btn" style={{padding:'8px 16px',borderRadius:8,border:'1px solid rgba(255,90,110,0.4)',background:'rgba(255,90,110,0.1)',color:C.coral,fontSize:13,fontWeight:500,cursor:'pointer',transition:'background 0.15s',fontFamily:'"DM Sans",sans-serif'}}>Delete account</button>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────
export default function App(){
  const [view,setView]=useState('login');
  const [page,setPage]=useState('overview');
  if(view==='login') return(<><style>{STYLES}</style><LoginPage onLogin={()=>setView('dashboard')} onSignup={()=>setView('signup')}/></>);
  if(view==='signup') return(<><style>{STYLES}</style><SignupPage onSignup={()=>setView('dashboard')} onLogin={()=>setView('login')}/></>);
  return(
    <>
      <style>{STYLES}</style>
      <div style={{display:'flex',minHeight:'100vh',background:C.bg,fontFamily:'"DM Sans",system-ui,sans-serif',backgroundImage:'radial-gradient(rgba(255,255,255,0.022) 1px,transparent 1px)',backgroundSize:'28px 28px'}}>
        <Sidebar page={page} setPage={setPage} onLogout={()=>{setView('login');setPage('overview');}}/>
        <div style={{flex:1,overflowX:'hidden',display:'flex',flexDirection:'column'}}>
          <TopBar/>
          <div key={page} style={{flex:1}}>
            {page==='overview'&&<OverviewPage setPage={setPage}/>}
            {page==='revenue'&&<RevenuePage/>}
            {page==='transactions'&&<TransactionsPage/>}
            {page==='settings'&&<SettingsPage/>}
          </div>
        </div>
      </div>
    </>
  );
}