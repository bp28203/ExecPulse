import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: 'application/octet-stream', limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Executive Edge API is running' });
});

/**
 * POST /api/transform
 * Transform text using OpenAI with specified tone
 * Body: { text: string, tonePrompt: string }
 */
app.post('/api/transform', async (req, res) => {
  try {
    const { text, tonePrompt } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!tonePrompt) {
      return res.status(400).json({ error: 'Tone prompt is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    const systemPrompt = `Executive Coach Transformation: ${tonePrompt}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text },
      ],
      temperature: 0.7,
    });

    const transformedText = response.choices[0].message.content;

    res.json({
      success: true,
      originalText: text,
      transformedText,
      model: 'gpt-4o',
      usage: response.usage,
    });
  } catch (error) {
    console.error('Transform API error:', error);
    res.status(500).json({
      error: 'Failed to transform text',
      message: error.message,
    });
  }
});

/**
 * POST /api/transcribe
 * Transcribe audio using OpenAI Whisper
 * Body: FormData with 'file' field containing audio blob
 */
app.post('/api/transcribe', async (req, res) => {
  try {
    if (!req.body || req.body.length === 0) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    // Convert buffer to File-like object for OpenAI SDK
    const audioFile = new File([req.body], 'recording.webm', { type: 'audio/webm' });

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });

    res.json({
      success: true,
      text: transcription.text,
      model: 'whisper-1',
    });
  } catch (error) {
    console.error('Transcription API error:', error);
    res.status(500).json({
      error: 'Failed to transcribe audio',
      message: error.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Executive Edge API running on http://localhost:${PORT}`);
  console.log(`✓ OpenAI API Key: ${process.env.OPENAI_API_KEY ? 'configured' : 'MISSING'}`);
});
