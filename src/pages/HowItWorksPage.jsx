import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Layers, Cpu, Check } from 'lucide-react';

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">THE BLUEPRINT</h1>
        <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.4em] text-xs">How we refine your leadership voice</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-24 left-1/3 right-1/4 h-px bg-gradient-to-r from-blue-500/50 via-blue-500/50 to-transparent z-0" />
        <div className="hidden md:block absolute top-24 left-2/3 right-0 h-px bg-gradient-to-r from-blue-500/50 via-blue-500/50 to-transparent z-0" />
        {[
          {
            step: "01",
            title: "Voice Capture",
            icon: <Mic size={32} />,
            desc: "Speak naturally. Our high-fidelity Whisper integration captures your unfiltered thoughts, including industry jargon and complex nuances.",
            feature: "Real-time STT Processing"
          },
          {
            step: "02",
            title: "Style Analysis",
            icon: <Layers size={32} />,
            desc: "Select from our curated library of executive personas. We analyze the context of your speech and align it with strategic leadership goals.",
            feature: "Context-Aware Mapping"
          },
          {
            step: "03",
            title: "Executive Synthesis",
            icon: <Cpu size={32} />,
            desc: "State-of-the-art LLMs reconstruct your message. We strip away hedging, optimize for impact, and polish for the boardroom.",
            feature: "Board-Ready Output"
          }
        ].map((item, idx) => (
          <div key={idx} className="relative z-10 group">
            <div className="mb-8 relative">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/20 group-hover:rotate-12 transition-transform duration-500">
                {item.icon}
              </div>
              <span className="absolute -bottom-4 -right-2 text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
                {item.step}
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">{item.desc}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
              <Check size={12} /> {item.feature}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-32 p-12 bg-blue-600 rounded-[3rem] relative overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/4" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              READY TO ELEVATE YOUR <span className="text-blue-200 underline decoration-4 underline-offset-8">COMMS?</span>
            </h2>
            <p className="text-blue-50 text-lg font-medium opacity-90">
              Stop second-guessing your emails, briefs, and announcements. Use the same cognitive patterns as top-tier executives.
            </p>
          </div>
          <button 
            onClick={() => navigate('/app')}
            className="flex-shrink-0 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Refining Now
          </button>
        </div>
      </div>
    </div>
  );
}
