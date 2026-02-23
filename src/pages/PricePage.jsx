import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Gem, CheckCircle2 } from 'lucide-react';
import Card from '../components/ui/Card';

export default function PricePage({ setAuthMode }) {
  const navigate = useNavigate();

  const PlanCard = ({ title, price, description, icon: Icon, features, highlighted = false }) => (
    <Card className={`relative flex flex-col p-8 transition-all duration-500 ${highlighted ? 'border-blue-600 dark:border-blue-500 shadow-2xl md:scale-105 z-10' : 'border-slate-200 dark:border-white/5 shadow-lg opacity-90'}`}>
      {highlighted && (
        <div className="absolute top-0 right-0 left-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-2 text-center rounded-t-sm">
          Most Popular Selection
        </div>
      )}
      <div className="mb-8 pt-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${highlighted ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">{description}</p>
      </div>
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900 dark:text-white">{price}</span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">/mo</span>
        </div>
      </div>
      <div className="space-y-4 mb-10 flex-grow">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 size={16} className={highlighted ? "text-blue-600" : "text-slate-400"} />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{feature}</span>
          </div>
        ))}
      </div>
      <button 
        onClick={() => {
          setAuthMode('signup');
          navigate('/login');
        }}
        className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${
          highlighted 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700' 
            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
        }`}
      >
        Select Blueprint
      </button>
    </Card>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">THE INVESTMENT</h1>
        <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.4em] text-xs">Tiered leadership communication packages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-4xl mx-auto">
        <PlanCard 
          title="Essential"
          price="$0"
          description="For rising leadership"
          icon={Zap}
          features={[
            "5 Transcriptions per month",
            "Access to 3 Core Tones",
            "Standard AI Analysis",
            "Encrypted Web Storage",
            "Community Support"
          ]}
        />
        <PlanCard 
          title="Executive"
          price="$49"
          description="For active management"
          icon={Gem}
          highlighted={true}
          features={[
            "Unlimited Transcriptions",
            "Full Library (12+ Tones)",
            "Powered by GPT-4o",
            "Custom Style Creation",
            "Priority Processing",
            "1-Click Clipboard Export"
          ]}
        />
      </div>

      <div className="mt-24 p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] text-center max-w-3xl mx-auto">
        <h4 className="text-sm font-black uppercase tracking-widest mb-4">Core Benefits</h4>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Privacy</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Secure Processing</p>
            <p className="text-[10px] text-slate-500">We utilize zero-retention protocols to ensure your executive communication remains yours alone.</p>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Speed</span>
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Boardroom Response</p>
            <p className="text-[10px] text-slate-500">Transform your voice into refined text in under 10 seconds, regardless of transcription length.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
