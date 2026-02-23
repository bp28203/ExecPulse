import React, { useState } from 'react';
import { 
  Mic, Square, Copy, Check, RotateCcw, Sparkles, Loader2, AlertCircle, Search
} from 'lucide-react';
import {
  CATEGORIES,
  CATEGORY_THEMES,
  TONE_CONFIG
} from '../constants/appData';
import Card from '../components/ui/Card';
import Soundwave from '../components/ui/Soundwave';
import useRecorder from '../hooks/useRecorder';
import useToneFilter from '../hooks/useToneFilter';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Call backend API to transform text with specified tone
 */
async function callBackendTransform(text, tonePrompt) {
  const response = await fetch(`${API_BASE_URL}/api/transform`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, tonePrompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to transform text');
  }

  const data = await response.json();
  return data.transformedText;
}

export default function AppPage() {
  const [rewrittenText, setRewrittenText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [selectedTone, setSelectedTone] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Feature hooks
  const { isRecording, transcript, isTranscribing, error, setTranscript, setError, startRecording, stopRecording } = useRecorder();
  const filteredTones = useToneFilter(activeCategory, searchQuery);

  const handleTransform = async () => {
    if (!transcript.trim()) return setError("Please record or type something first.");
    if (!selectedTone) return setError("Please select a tone style first.");
    setIsRewriting(true);
    setRewrittenText(""); 
    setError(null);
    try {
      const tonePrompt = TONE_CONFIG[selectedTone].prompt;
      const result = await callBackendTransform(transcript, tonePrompt);
      setRewrittenText(result);
    } catch (err) { setError(err.message); }
    finally { setIsRewriting(false); }
  };

  const handleCopy = () => {
    if (!rewrittenText) return;
    const textArea = document.createElement("textarea");
    textArea.value = rewrittenText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-32 pb-6">
      <div className="mb-14 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">TRANSFORM</h1>
        <p className="text-blue-600 dark:text-blue-400 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">Voice to Boardroom Ready Content</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-white dark:bg-slate-900 shadow-xl">
          <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0 relative">
              {isRecording && <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-20 scale-150" />}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all relative z-10 ${
                  isTranscribing ? 'bg-slate-400' : isRecording ? 'bg-rose-600 shadow-lg' : 'bg-blue-600 shadow-lg'
                } text-white`}
              >
                {isTranscribing ? <Loader2 className="animate-spin" size={24} /> : isRecording ? <Square fill="white" size={20} /> : <Mic size={28} />}
                {isRecording && <div className="mt-1"><Soundwave /></div>}
              </button>
            </div>
            <div className="flex-grow w-full">
              <textarea
                className="w-full h-24 p-4 bg-slate-50 dark:bg-black/20 rounded-xl border border-slate-200 dark:border-white/10 focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-bold placeholder:text-slate-400 resize-none"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder={isTranscribing ? "Transcribing..." : isRecording ? "Recording..." : "Capture your thoughts..."}
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center px-1">
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] font-black rounded-lg border uppercase tracking-tight transition-all ${
                    activeCategory === cat ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs outline-none focus:border-blue-500"
                placeholder="Find a style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredTones.map(([name, config]) => {
              const theme = CATEGORY_THEMES[config.category];
              const isActive = selectedTone === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedTone(name)}
                  className={`p-3 rounded-xl border-2 text-left transition-all relative h-full min-h-[100px] flex flex-col justify-between ${
                    isActive ? 'bg-blue-600 border-blue-400 scale-[1.02] z-10' : theme.card
                  }`}
                >
                  <div>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tight border ${isActive ? 'bg-white text-blue-700 border-white' : theme.tag}`}>
                      {config.category}
                    </span>
                    <div className={`text-sm font-black mt-1.5 truncate ${isActive ? 'text-white' : theme.text}`}>{name}</div>
                  </div>
                  <div className={`text-[10px] font-bold leading-tight line-clamp-2 ${isActive ? 'text-blue-50' : theme.subtext}`}>{config.description}</div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={handleTransform}
              disabled={!transcript.trim() || !selectedTone || isRewriting}
              className={`group flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all ${
                transcript.trim() && selectedTone ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {isRewriting ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {isRewriting ? "Processing..." : "Refine Message"}
            </button>
          </div>
        </div>

        {(rewrittenText || isRewriting) && (
          <Card className="border-4 border-blue-600 p-6 md:p-8 relative">
            <div className="absolute -top-4 left-6 px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Boardroom Ready</div>
            <div className="flex justify-between items-center mb-4 pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedTone} Style</span>
              <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-black transition-all hover:scale-105">
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "COPIED" : "COPY"}
              </button>
            </div>
            <div className="relative rounded-xl bg-slate-50 dark:bg-black/20 p-4 min-h-[100px]">
              {isRewriting ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-blue-200/50 rounded w-full"></div>
                  <div className="h-4 bg-blue-200/50 rounded w-[80%]"></div>
                </div>
              ) : (
                <textarea 
                  className="w-full bg-transparent border-none outline-none resize-none text-base font-bold leading-relaxed" 
                  value={rewrittenText} 
                  onChange={(e) => setRewrittenText(e.target.value)}
                  rows={4} 
                />
              )}
            </div>
          </Card>
        )}
        {error && <div className="p-3 bg-rose-600 text-white rounded-xl font-black text-center text-[10px] uppercase tracking-widest">{error}</div>}
      </div>
    </div>
  );
}
