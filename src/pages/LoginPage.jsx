import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Briefcase, Building2, Loader2, Chrome } from 'lucide-react';
import Card from '../components/ui/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupTitle, setSignupTitle] = useState("");
  const [signupIndustry, setSignupIndustry] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      navigate('/app');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full">
        <Card className="p-8 md:p-10 shadow-2xl relative overflow-visible">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 bg-blue-600 rounded-2xl text-white shadow-lg mb-6">
              {authMode === 'login' ? <Lock size={24} /> : <User size={24} />}
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
              {authMode === 'login' ? "Welcome Back" : "Create Profile"}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {authMode === 'login' 
                ? "Secure access to your executive dashboard" 
                : "Join the elite leadership communication network"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {authMode === 'signup' && (
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Job Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text"
                        required
                        value={signupTitle}
                        onChange={(e) => setSignupTitle(e.target.value)}
                        placeholder="VP Ops"
                        className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Industry</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text"
                        required
                        value={signupIndustry}
                        onChange={(e) => setSignupIndustry(e.target.value)}
                        placeholder="SaaS"
                        className="w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Password</label>
                {authMode === 'login' && <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password"
                  required
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl font-bold outline-none focus:border-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLoggingIn ? <Loader2 className="animate-spin" size={18} /> : null}
              {isLoggingIn 
                ? "Authenticating..." 
                : authMode === 'login' ? "Sign In to Vault" : "Initialize Account"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
            </div>

            <div className="mt-6">
              <button className="w-full flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-black text-xs uppercase tracking-[0.2em]">
                <Chrome size={20} className="text-blue-500" /> Google SSO
              </button>
            </div>
          </div>

          <p className="text-center mt-10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {authMode === 'login' ? (
              <>Don't have an account? <button onClick={() => setAuthMode('signup')} type="button" className="text-blue-600 font-black hover:underline">Sign Up Now</button></>
            ) : (
              <>Already have a profile? <button onClick={() => setAuthMode('login')} type="button" className="text-blue-600 font-black hover:underline">Log In</button></>
            )}
          </p>
        </Card>
      </div>
    </div>
  );
}
