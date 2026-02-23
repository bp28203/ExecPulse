import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Copy, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  History,
  Search,
  Moon,
  Sun,
  Zap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  MessageSquare,
  Quote,
  Menu,
  X,
  Layers,
  Settings,
  Target,
  FileText,
  Gem,
  Building2,
  CheckCircle2,
  Lock,
  Mail,
  Chrome,
  User,
  Briefcase
} from 'lucide-react';

/**
 * EXECUTIVE VOICE TRANSFORMER
 * - Navigation: Home, Price, How It Works, App, Login/Signup
 */

const CATEGORIES = ["All", "Strategic", "Direct", "People", "Formal"];

const HERO_IMAGES = [
  { id: 'img1', url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" },
  { id: 'img2', url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" },
  { id: 'img3', url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" }
];

const REVIEWS = [
  {
    name: "Marcus Chen",
    role: "VP of Operations",
    text: "Executive Edge has completely streamlined how I prepare for board meetings. It captures the nuance of leadership speech perfectly.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sarah Jenkins",
    role: "Director of Product",
    text: "The 'Radical Candor' tone is a game changer for my 1-on-1s. It helps me be direct while staying supportive of my team.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "David Miller",
    role: "Chief Strategy Officer",
    text: "I use the 'Board-Ready' filter for every major announcement. It saves me hours of manual editing and polishing.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  }
];

const USER_PROVIDED_IMAGE = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200";

const CATEGORY_THEMES = {
  Strategic: {
    card: "bg-indigo-50 dark:bg-indigo-900 border-indigo-200 dark:border-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all",
    tag: "text-indigo-900 dark:text-indigo-100 bg-indigo-200 dark:bg-indigo-600 border-indigo-300 dark:border-indigo-400",
    text: "text-indigo-950 dark:text-white",
    subtext: "text-indigo-800/80 dark:text-indigo-200/80"
  },
  Direct: {
    card: "bg-rose-50 dark:bg-rose-900 border-rose-200 dark:border-rose-500 hover:bg-rose-100 dark:hover:bg-rose-800 transition-all",
    tag: "text-rose-900 dark:text-rose-100 bg-rose-200 dark:bg-rose-600 border-rose-300 dark:border-rose-400",
    text: "text-rose-950 dark:text-white",
    subtext: "text-rose-800/80 dark:text-rose-200/80"
  },
  People: {
    card: "bg-teal-50 dark:bg-teal-900 border-teal-200 dark:border-teal-500 hover:bg-teal-100 dark:hover:bg-teal-800 transition-all",
    tag: "text-teal-900 dark:text-teal-100 bg-teal-200 dark:bg-teal-600 border-teal-300 dark:border-teal-400",
    text: "text-teal-950 dark:text-white",
    subtext: "text-teal-800/80 dark:text-teal-200/80"
  },
  Formal: {
    card: "bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-500 hover:bg-amber-100 dark:hover:bg-amber-800 transition-all",
    tag: "text-amber-950 dark:text-amber-100 bg-amber-200 dark:bg-amber-600 border-amber-300 dark:border-amber-400",
    text: "text-amber-950 dark:text-white",
    subtext: "text-amber-800/80 dark:text-indigo-200/80"
  },
  All: {
    card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 hover:border-blue-500 transition-all",
    tag: "text-slate-700 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-500",
    text: "text-slate-900 dark:text-white",
    subtext: "text-slate-600 dark:text-slate-300"
  }
};

const TONE_CONFIG = {
  Executive: { category: "Strategic", description: "Authoritative & outcome-oriented.", prompt: "Rewrite this to sound like a seasoned executive: authoritative, high-level, and focused on outcomes." },
  Metaphor: { category: "Strategic", description: "Clear, professional analogies.", prompt: "Rewrite the following text using a clear, professional metaphor or analogy that strengthens the message. Keep it concise and leadership-appropriate. Do not be overly dramatic or poetic." },
  Storytelling: { category: "People", description: "Short, narrative-led leading.", prompt: "Rewrite the following text in a short storytelling style suitable for leadership communication." },
  Assertive: { category: "Direct", description: "Direct, firm, and confident.", prompt: "Rewrite this to be direct and firm. Eliminate hedging language like 'I think' or 'maybe'." },
  Concise: { category: "Direct", description: "Brief and efficient.", prompt: "Rewrite this to be as brief as possible while retaining all key information." },
  Diplomatic: { category: "People", description: "Tactful and nuanced.", prompt: "Rewrite this to be tactful and inclusive, maintaining accountability while softening critiques." },
  Strategic: { category: "Strategic", description: "Visionary & long-term focused.", prompt: "Rewrite this to emphasize long-term goals and 'big picture' implications." },
  "Board-Ready": { category: "Formal", description: "Formal and risk-aware.", prompt: "Rewrite this for a Board of Directors. Focus on ROI, governance, and risk mitigation." },
  "C-Suite Brief": { category: "Formal", description: "High-speed briefing.", prompt: "Rewrite this as a rapid brief for a CEO (Bottom Line Up Front)." },
  Influential: { category: "People", description: "Persuasive and inspirational.", prompt: "Rewrite this using persuasive techniques to build buy-in and inspire action." },
  Empathetic: { category: "People", description: "Supportive and high EQ.", prompt: "Rewrite this to sound empathetic and supportive while remaining professional." },
  "Radical Candor": { category: "Direct", description: "Direct but caring.", prompt: "Rewrite using Radical Candor: be extremely direct but show you care about the person." }
};

const INSIGHT_EXAMPLES = [
  { label: "Strategic", text: "Leveraging cross-functional synergies to optimize ROI." },
  { label: "Assertive", text: "We are moving forward with the Q3 roadmap immediately." },
  { label: "Diplomatic", text: "I appreciate the perspective; let's refine the approach together." },
  { label: "Board-Ready", text: "Projected growth aligns with our long-term fiscal governance." }
];

const openaiApiKey = "";

async function callOpenAI(systemPrompt, userText) {
  if (!openaiApiKey) throw new Error("OpenAI API Key is missing.");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${openaiApiKey}` },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userText }],
      temperature: 0.7
    })
  });
  if (!response.ok) throw new Error("OpenAI request failed");
  const data = await response.json();
  return data.choices[0].message.content;
}

async function transcribeAudio(audioBlob) {
  if (!openaiApiKey) throw new Error("OpenAI API Key is missing.");
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");
  formData.append("model", "whisper-1");
  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${openaiApiKey}` },
    body: formData
  });
  if (!response.ok) throw new Error("Transcription failed");
  const data = await response.json();
  return data.text;
}

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-[#0C121E] rounded-2xl border-2 border-slate-200 dark:border-white/[0.12] overflow-hidden ${className}`}>
    {children}
  </div>
);

const Soundwave = () => (
  <div className="flex items-center gap-1 h-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="w-1 bg-rose-500 rounded-full animate-bounce" style={{ animationDuration: `${0.4 + (i * 0.1)}s`, height: `${40 + (Math.random() * 60)}%` }} />
    ))}
  </div>
);

const TypingInsight = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = INSIGHT_EXAMPLES[index].text;
      
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setSpeed(60);
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          setSpeed(500);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setSpeed(30);
        if (displayText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % INSIGHT_EXAMPLES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, speed]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
        <Sparkles size={18} />
      </div>
      <div className="overflow-hidden">
        <div className="text-[10px] font-black uppercase text-blue-200 tracking-widest transition-all duration-300">
          {INSIGHT_EXAMPLES[index].label} Tone
        </div>
        <div className="text-xs font-bold text-white min-h-[1.25rem]">
          "{displayText}"<span className="animate-pulse">|</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [rewrittenText, setRewrittenText] = useState("");
  const [isRewriting, setIsRewriting] = useState(false);
  const [selectedTone, setSelectedTone] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth state
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Sign-up fields
  const [signupName, setSignupName] = useState("");
  const [signupTitle, setSignupTitle] = useState("");
  const [signupIndustry, setSignupIndustry] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setTranscript(text);
        } catch (err) { setError(err.message); }
        finally { setIsTranscribing(false); }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) { setError("Enable microphone access."); }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const handleTransform = async () => {
    if (!transcript.trim()) return setError("Please record or type something first.");
    if (!selectedTone) return setError("Please select a tone style first.");
    setIsRewriting(true);
    setRewrittenText(""); 
    setError(null);
    try {
      const systemPrompt = `Executive Coach Transformation: ${TONE_CONFIG[selectedTone].prompt}`;
      const result = await callOpenAI(systemPrompt, transcript);
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

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setCurrentPage('app');
    }, 1500);
  };

  const filteredTones = Object.entries(TONE_CONFIG).filter(([name, config]) => {
    const matchesCategory = activeCategory === "All" || config.category === activeCategory;
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const NavItem = ({ label, onClick, active = false }) => (
    <button 
      onClick={onClick}
      className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors ${
        active 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {label}
    </button>
  );

  const Navigation = () => (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => {setCurrentPage('home'); setMobileMenuOpen(false);}}>
          <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="font-black text-xl uppercase tracking-tighter text-slate-900 dark:text-white">EXECUTIVE EDGE</span>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavItem label="Home" onClick={() => setCurrentPage('home')} active={currentPage === 'home'} />
          <NavItem label="Price" onClick={() => setCurrentPage('price')} active={currentPage === 'price'} />
          <NavItem label="How It Works" onClick={() => setCurrentPage('how-it-works')} active={currentPage === 'how-it-works'} />
          
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-100 transition-all hover:scale-105 active:scale-95 mr-2"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={() => {setAuthMode('login'); setCurrentPage('login');}}
            className={`text-xs font-black uppercase tracking-widest px-4 py-2 transition-colors ${currentPage === 'login' && authMode === 'login' ? 'text-blue-600' : 'text-slate-900 dark:text-white hover:text-blue-600'}`}
          >
            Log In
          </button>

          <button 
            onClick={() => setCurrentPage('app')}
            className="ml-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95"
          >
            Start for Free
          </button>
        </div>

        <button 
          className="md:hidden p-2 text-slate-900 dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <button onClick={() => {setCurrentPage('home'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Home</button>
          <button onClick={() => {setCurrentPage('price'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Price</button>
          <button onClick={() => {setCurrentPage('how-it-works'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">How It Works</button>
          <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
            <button onClick={() => {setAuthMode('login'); setCurrentPage('login'); setMobileMenuOpen(false);}} className="block w-full text-left font-black uppercase tracking-widest py-2 text-slate-900 dark:text-white">Log In</button>
            <button 
              onClick={() => {setCurrentPage('app'); setMobileMenuOpen(false);}}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest text-center block"
            >
              Start for Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const renderHome = () => (
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
                onClick={() => setCurrentPage('app')}
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

  const renderPrice = () => {
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
          onClick={() => {setAuthMode('signup'); setCurrentPage('login');}}
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
  };

  const renderLogin = () => (
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
              <>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-blue-600 font-black hover:underline">Sign Up Now</button></>
            ) : (
              <>Already have a profile? <button onClick={() => setAuthMode('login')} className="text-blue-600 font-black hover:underline">Log In</button></>
            )}
          </p>
        </Card>
      </div>
    </div>
  );

  const renderApp = () => (
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

  const renderHowItWorks = () => (
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
            onClick={() => setCurrentPage('app')}
            className="flex-shrink-0 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Start Refining Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'home': return renderHome();
      case 'price': return renderPrice();
      case 'app': return renderApp();
      case 'how-it-works': return renderHowItWorks();
      case 'login': return renderLogin();
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020408] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500">
      <Navigation />
      <main>
        {renderContent()}
      </main>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>
    </div>
  );
}