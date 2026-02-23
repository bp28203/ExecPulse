# Executive Edge

Transform casual observations into strategic leadership assets. Using state-of-the-art AI to refine your voice for the C-Suite and beyond.

## Project Architecture

**Executive Edge** is a full-stack application built with a React frontend and Express backend, securely integrating OpenAI's GPT-4 and Whisper APIs.

```
Executive Edge
├── Frontend (React 19 + Vite + Tailwind)
│   ├── Pages (routing with react-router-dom)
│   ├── Components (UI components)
│   ├── Hooks (business logic)
│   └── Constants (app data)
│
└── Backend (Node.js + Express)
    ├── API endpoints for OpenAI integration
    ├── Security: API key stays server-side
    └── CORS configured for frontend
```

## Features

✨ **Voice Recording & Transcription**
- Real-time audio capture with Whisper API
- Automatic speech-to-text conversion

🎯 **Executive Tone Transformation**
- 12+ curated tone styles (Executive, Storytelling, Board-Ready, etc.)
- GPT-4o powered text refinement
- Instant boardroom-ready output

🔒 **Enterprise Security**
- OpenAI API key protected server-side
- No sensitive credentials exposed in frontend
- CORS-secured API endpoints

📱 **Responsive Design**
- Mobile-first UI with Tailwind CSS
- Dark mode support
- Smooth animations and transitions

🚀 **Modern Architecture**
- React Router for clean page navigation
- Custom hooks for reusable logic
- Modular component structure
- Production-optimized build (85.6 KB gzipped)

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API key ([get one here](https://platform.openai.com))

### Setup

#### 1. Clone and Install Frontend
```bash
cd my-executive-app
npm install
```

#### 2. Setup Backend
```bash
cd server
npm install
```

#### 3. Configure Environment Variables

**Backend** (`server/.env`):
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key
PORT=3001
```

**Frontend** (`.env` - optional, already configured):
```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Executive Edge
```

### Running Locally

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:3001`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

Visit `http://localhost:5173` in your browser.

## Usage

1. **Navigate** to the app using the menu
2. **Record** your message or paste text directly
3. **Select** a tone style (Executive, Storytelling, etc.)
4. **Transform** with AI refinement
5. **Copy** your boardroom-ready message

## Project Structure

```
my-executive-app/
├── src/
│   ├── pages/              # Route pages (HomePage, AppPage, etc.)
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── constants/          # App configuration data
│   ├── layouts/            # Layout components
│   ├── App.jsx             # Router setup
│   └── main.jsx            # Entry point
│
├── server/
│   ├── server.js           # Express API server
│   ├── package.json        # Backend dependencies
│   ├── .env                # Backend environment variables
│   └── README.md           # Backend documentation
│
├── .env                    # Frontend environment variables
├── .gitignore              # Git ignore rules
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── package.json            # Frontend dependencies
```

## Development Phases

### Phase 1: Constants & UI Components ✓
- Extracted all static data to modular constants
- Created reusable Card, Soundwave, TypingInsight components

### Phase 2: Custom Hooks ✓
- `useRecorder` - Audio recording and transcription
- `useHeroCarousel` - Auto-rotating hero images
- `useToneFilter` - Memoized tone filtering

### Phase 3: React Router ✓
- Clean route-based page navigation
- Shared layout with persistent navigation
- SEO-friendly structure

### Phase 4: Backend API ✓
- Secure server-side API key handling
- Endpoints: `/api/transform` and `/api/transcribe`
- CORS secured for cross-origin requests

## API Endpoints

### Backend Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Health check |
| `/api/transform` | POST | Transform text with tone |
| `/api/transcribe` | POST | Transcribe audio file |

See [Backend README](server/README.md) for detailed API documentation.

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with auto-restart (from `server/` directory)
- `npm start` - Start production server

## Technology Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.3.1 - Build tool
- **Tailwind CSS** 4.2.1 - Styling
- **React Router** 7.x - Routing
- **Lucide React** 0.575.0 - Icons

### Backend
- **Express** 4.18.2 - Web framework
- **OpenAI** SDK - GPT-4 & Whisper APIs
- **CORS** - Cross-origin handling
- **dotenv** - Environment variables

## Environment Variables

### Frontend Env Vars
| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:3001` |
| `VITE_APP_NAME` | App display name | `Executive Edge` |

### Backend Env Vars
| Variable | Purpose | Required |
|----------|---------|----------|
| `OPENAI_API_KEY` | OpenAI API key | ✓ |
| `PORT` | Server port | 3001 |

## Deployment

### Frontend
1. Build: `npm run build`
2. Deploy `dist/` to Vercel, Netlify, or similar
3. Set environment variable: `VITE_API_BASE_URL=https://api.yourdomain.com`

### Backend
1. Deploy to Railway, Heroku, or AWS
2. Set environment variable: `OPENAI_API_KEY=sk-xxx...`
3. Get deployed URL and configure in frontend

See [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

## Security Considerations

✅ **What's Secure:**
- OpenAI API key stored server-side only
- No sensitive data in frontend build
- CORS configured for authorized origins
- Environment variables properly separated

⚠️ **Before Production:**
- [ ] Enable HTTP-only cookies for auth
- [ ] Add rate limiting to API endpoints
- [ ] Implement user authentication
- [ ] Set up logging and monitoring
- [ ] Use HTTPS for all connections
- [ ] Configure CORS for production domain only

## Troubleshooting

### Frontend won't connect to backend
- Verify backend is running: `curl http://localhost:3001/api/health`
- Check `VITE_API_BASE_URL` environment variable
- Check browser console for CORS errors

### Transcription/Transform fails
- Verify OpenAI API key is correct
- Check OpenAI account has usage quota
- Review backend logs for error details

### Build fails
- Delete `node_modules/` and `dist/`, run `npm install && npm run build`
- Ensure Node.js version ≥ 18

## Performance

- **Frontend Build:** 273 KB JS (85.6 KB gzipped)
- **Optimized with:** Vite code splitting, Tailwind PurgeCSS, React Router lazy loading
- **API Response:** < 2s for transcription, < 5s for transformation

## License

MIT

## Support

For issues report to the [GitHub repository](https://github.com/bp28203/ExecPulse).
