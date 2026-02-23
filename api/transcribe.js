import { OpenAI, toFile } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function readBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured' });
  }

  try {
    const buffer = await readBuffer(req);

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    const contentType = req.headers['content-type'] || 'audio/webm';
    const file = await toFile(buffer, 'recording.webm', { type: contentType });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1'
    });

    return res.status(200).json({
      success: true,
      text: transcription.text,
      model: 'whisper-1'
    });
  } catch (error) {
    console.error('Transcription API error:', error);
    return res.status(500).json({
      error: 'Failed to transcribe audio',
      message: error.message
    });
  }
}
