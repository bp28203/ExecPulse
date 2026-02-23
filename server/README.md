# Executive Edge Backend API

Secure backend server for the Executive Edge voice transformation application. Handles OpenAI API calls server-side to protect your API key.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
PORT=3001
```

Replace `sk-your-actual-openai-api-key-here` with your real OpenAI API key.

### 3. Start the Server

**Development mode** (with auto-restart on file changes):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns: `{ status: "ok", message: "Executive Edge API is running" }`

### Transform Text with Tone
- **POST** `/api/transform`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "text": "Your message here",
    "tonePrompt": "The tone transformation prompt"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "originalText": "Your message here",
    "transformedText": "Refined boardroom-ready message",
    "model": "gpt-4o",
    "usage": { "prompt_tokens": 50, "completion_tokens": 80 }
  }
  ```

### Transcribe Audio
- **POST** `/api/transcribe`
- **Headers**: `Content-Type: application/octet-stream`
- **Body**: Raw audio file (wav, m4a, webm, mp3, etc.)
- **Response**:
  ```json
  {
    "success": true,
    "text": "Transcribed text from audio",
    "model": "whisper-1"
  }
  ```

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad request (missing or invalid parameters)
- `500` - Server error

Error responses include a `message` field explaining what went wrong.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | ✓ | (none) | Your OpenAI API key (starts with `sk-`) |
| `PORT` | | 3001 | Port for the server to listen on |

## Security

- ✓ API key is kept server-side only
- ✓ CORS enabled for cross-origin requests from frontend
- ✓ Environment variables kept in `.env` (not committed to git)
- ✓ No sensitive data exposed in responses

## Frontend Integration

The frontend calls these endpoints at:
- Environment variable: `VITE_API_BASE_URL` (defaults to `http://localhost:3001`)

Update frontend `.env` to point to your backend URL:
```env
VITE_API_BASE_URL=http://localhost:3001
```

For production, use your deployed backend URL:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Deployment

### Option 1: Railway.app (Recommended)
1. Push this directory to GitHub
2. Connect to Railway and select this repo
3. Set `OPENAI_API_KEY` as an environment variable
4. Railway auto-deploys on every push

### Option 2: Heroku
```bash
# Install Heroku CLI, then:
heroku create your-app-name
heroku config:set OPENAI_API_KEY=sk-your-key-here
git push heroku main
```

### Option 3: AWS Lambda + API Gateway
- Use serverless framework or AWS SAM
- Deploy as a containerized function

## Troubleshooting

### "OPENAI_API_KEY is not configured"
- Check `.env` file exists in `server/` directory
- Verify `OPENAI_API_KEY` is set correctly
- Make sure you're in the right directory when running the server

### CORS errors from frontend
- Verify `VITE_API_BASE_URL` in frontend `.env` matches your backend URL
- Check that backend is running and accessible

### Transcription/Transform failures
- Verify OpenAI API key is valid
- Check your OpenAI account has usage quota
- Review OpenAI API status: https://status.openai.com

## Development Notes

- Uses ES modules (`"type": "module"` in package.json)
- Middleware stack: CORS → JSON parsing → Raw body parsing
- Error handling middleware for better debugging
- 404 handler for undefined routes

## License

MIT
