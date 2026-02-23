import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { INSIGHT_EXAMPLES } from '../../constants/appData';

export default function TypingInsight() {
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
}
