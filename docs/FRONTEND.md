"""Frontend documentation"""

# PCBMind AI - Frontend Documentation

## Overview

The frontend is built with Next.js 15, React, TypeScript, and Tailwind CSS. It provides a modern, glassmorphic UI for the PCBMind AI platform.

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── auth/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   └── dashboard/
│       ├── layout.tsx        # Dashboard layout with sidebar
│       ├── page.tsx          # Main dashboard
│       ├── inspections/
│       ├── defects/
│       ├── predictions/
│       ├── digital-twin/
│       ├── copilot/
│       └── reports/
├── components/               # Reusable components
├── lib/
│   ├── api.ts               # API client
│   └── hooks.ts             # Custom React hooks
├── styles/
│   └── globals.css          # Global styles
└── public/                  # Static assets
```

## Key Features

### 1. Landing Page
- Hero section with animated background
- Problem/Solution sections
- Feature showcase
- Call-to-action buttons

### 2. Authentication
- Login with email/password
- Registration flow
- Protected routes
- Token-based auth

### 3. Dashboard
- Real-time KPI metrics
- Interactive charts and graphs
- Recent inspections list
- Production line status

### 4. PCB Inspection Module
- Image upload interface
- Defect detection results
- Component analysis
- Annotated image display

### 5. Defect Analysis
- Root cause analysis display
- Severity indicators
- Recommended actions
- Historical data

### 6. Predictive Analytics
- Failure probability display
- Risk scoring
- Quality forecasting
- Trend analysis

### 7. Digital Twin
- Interactive PCB visualization
- Component health status
- Historical inspection data
- Real-time monitoring

### 8. Manufacturing Copilot
- AI chat interface
- Quick action buttons
- Context-aware responses

### 9. Reporting
- Multiple report types
- PDF generation
- Report history
- Download functionality

## Design System

### Color Palette
- **Primary**: `#0066FF` (Electric Blue)
- **Accent**: `#00D9FF` (Cyan)
- **Dark**: `#0F0F1E` (Dark Background)
- **Slate**: `#1A1A2E` (Secondary Background)

### Typography
- **Font**: Inter
- **Sizes**: 6xl (hero), 4xl (section), 2xl (card), 1xl (body)

### Components
- **Glass**: Glassmorphism effect with backdrop blur
- **Cards**: Rounded borders with hover effects
- **Buttons**: Gradient backgrounds with scale animation on hover
- **Forms**: Custom styled inputs with cyan focus border

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Running the Frontend

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run type-check
```

## API Integration

API client is located in `lib/api.ts` and uses axios for HTTP requests.

### Example Usage

```typescript
import { inspectionAPI } from "@/lib/api";

// Upload image
const response = await inspectionAPI.uploadImage(file);

// Run inspection
const results = await inspectionAPI.runInspection(data);

// Get metrics
const metrics = await dashboardAPI.getMetrics();
```

## Custom Hooks

Available hooks in `lib/hooks.ts`:

- `useAuth()` - Authentication logic
- `useDashboard()` - Dashboard data fetching
- `useInspections()` - Inspection management

## Performance

- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- CSS module for scoped styling
- Memoization for expensive components

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

Or to any Node.js hosting:

```bash
npm run build
npm start
```

## Troubleshooting

### API Connection Issues
- Check NEXT_PUBLIC_API_URL environment variable
- Ensure backend is running on specified port
- Check CORS configuration in backend

### Build Errors
- Clear `.next` directory
- Run `npm install` again
- Check Node.js version (18+)

## Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Advanced filtering and search
- [ ] Custom dashboard widgets
- [ ] Export to multiple formats
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
