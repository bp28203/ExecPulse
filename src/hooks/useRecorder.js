import { useState, useRef } from 'react';

const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY || "";

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

export default function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setIsTranscribing(true);
        try {
          const text = await transcribeAudio(audioBlob);
          setTranscript(text);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsTranscribing(false);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("Enable microphone access.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  return {
    isRecording,
    transcript,
    isTranscribing,
    error,
    setTranscript,
    setError,
    startRecording,
    stopRecording
  };
}
