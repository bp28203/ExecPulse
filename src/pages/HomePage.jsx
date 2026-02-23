import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { HERO_IMAGES, REVIEWS, USER_PROVIDED_IMAGE } from '../constants/appData';
import TypingInsight from '../components/ui/TypingInsight';

export default function HomePage({ currentHeroIndex }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-12 text-center relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/10 blur-[120px] rounded-full" />
      
      <div className="z-10 max-w-5xl w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.85]">
                COMMAND THE <span className="text-blue-600">ROOM</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                Transform casual observations into strategic leadership assets. Using state-of-the-art AI to refine your voice for the C-Suite and beyond.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/app')}
                className="group flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group h-[400px] w-full">
            <div className="absolute -inset-4 bg-blue-600/20 rounded-3xl blur-2xl group-hover:bg-blue-600/30 transition-all duration-500" />
            <div className="relative h-full w-full rounded-3xl border-4 border-white dark:border-slate-800 overflow-hidden shadow-2xl rotate-2 group-hover:rotate-0 transition-transform duration-500 bg-slate-200 dark:bg-slate-900">
              {HERO_IMAGES.map((img, idx) => (
                <img 
                  key={img.id}
                  src={img.url} 
                  alt={`Executive Leadership ${idx}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    idx === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                  }`}
                  style={{ objectPosition: 'center 30%' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = USER_PROVIDED_IMAGE; }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 min-h-[80px] flex items-center z-10">
                <TypingInsight />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-24 space-y-12">
          <div className="text-center">
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4">Executive Testimonials</h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <div key={i} className="relative group p-8 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-[2rem] hover:border-blue-500 transition-all duration-500 shadow-sm flex flex-col">
                <Quote className="absolute top-6 right-8 text-blue-600/10 group-hover:text-blue-600/20 transition-colors" size={48} />
                <p className="text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed mb-8 relative z-10 text-left">
                  "{review.text}"
                </p>
                <div className="mt-auto flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-md">
                    <img 
                      src={review.image} 
                      alt={review.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-sm uppercase tracking-wider text-slate-900 dark:text-white leading-none mb-1">{review.name}</h4>
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-tighter">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
