import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not configured' });
  }

  try {
    const body = await readJsonBody(req);
    const { text, tonePrompt } = body || {};

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!tonePrompt) {
      return res.status(400).json({ error: 'Tone prompt is required' });
    }

    const systemPrompt = `Executive Coach Transformation: ${tonePrompt}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: 0.7
    });

    const transformedText = response.choices[0].message.content;

    return res.status(200).json({
      success: true,
      originalText: text,
      transformedText,
      model: 'gpt-4o',
      usage: response.usage
    });
  } catch (error) {
    console.error('Transform API error:', error);
    return res.status(500).json({
      error: 'Failed to transform text',
      message: error.message
    });
  }
}
