# Quantum Grace

**Track. Build. Evolve.**

A production-ready, scalable self-growth platform for tracking habits, setting goals, and becoming your best self.

## 🌟 Features

- **Habit Tracking**: Create and track daily, weekly, or custom habits
- **Session Logging**: Log work/study sessions with categories and tags
- **Pomodoro Timer**: Built-in timer with automatic session logging
- **Goal Management**: Set and track progress toward your goals
- **Analytics Dashboard**: Visualize your progress with charts and heatmaps
- **Gamification**: Earn XP, badges, and maintain streaks
- **AI Coach**: Get personalized insights and weekly reports
- **Social Features**: Public profiles and shareable progress cards
- **PWA Support**: Install as an app with offline capabilities

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+
- **PostgreSQL** (installed)
- **Redis** (optional, for caching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd "QUANTUM TRACKER"
   ```

2. **Install pnpm (if not installed)**
   ```bash
   npm install -g pnpm
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up your PostgreSQL database**
   ```bash
   # Open PostgreSQL command line
   psql -U postgres
   
   # Create database
   CREATE DATABASE quantum_grace;
   
   # Exit psql
   \q
   ```

5. **Configure environment variables**
   ```bash
   # Copy example env file for API
   cp apps/api/.env.example apps/api/.env
   
   # Edit apps/api/.env with your database credentials
   # Update DATABASE_URL with your PostgreSQL connection string
   ```

6. **Generate Prisma Client and run migrations**
   ```bash
   cd apps/api
   pnpm prisma generate
   pnpm prisma migrate dev --name init
   cd ../..
   ```

7. **Start the development servers**
   ```bash
   # In the root directory
   pnpm dev
   ```

   This will start:
   - **API**: http://localhost:3001
   - **Web**: http://localhost:3000
   - **API Docs**: http://localhost:3001/api/docs

## 📁 Project Structure

```
quantum-grace/
├── apps/
│   ├── api/              # NestJS REST API
│   │   ├── prisma/       # Database schema & migrations
│   │   └── src/
│   │       ├── auth/     # Authentication module
│   │       ├── users/    # User management
│   │       ├── habits/   # Habit tracking
│   │       ├── logs/     # Session logs
│   │       ├── goals/    # Goal management
│   │       ├── pomodoro/ # Pomodoro timer
│   │       ├── analytics/# Analytics & insights
│   │       ├── gamification/ # Streaks, badges, XP
│   │       └── ai/       # AI coaching features
│   │
│   └── web/              # Next.js frontend
│       ├── app/          # Next.js 14 App Router
│       ├── components/   # React components
│       └── lib/          # Utilities & hooks
│
└── packages/             # Shared packages
    ├── tsconfig/         # TypeScript configs
    └── eslint-config/    # ESLint configs
```

## 🛠 Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Swagger** - API documentation

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **TanStack Query** - Server state
- **Zustand** - Client state
- **Recharts** - Data visualization

## 📝 Available Scripts

### Root
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all apps
- `pnpm test` - Run tests

### API (apps/api)
- `pnpm dev` - Start API in dev mode
- `pnpm build` - Build API
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio
- `pnpm prisma:seed` - Seed database with demo data

### Web (apps/web)
- `pnpm dev` - Start web app in dev mode
- `pnpm build` - Build web app
- `pnpm start` - Start production server

## 🔐 Environment Variables

### API (.env)
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/quantum_grace"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Web (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 📚 API Documentation

Once the API is running, visit:
- **Swagger UI**: http://localhost:3001/api/docs

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/session` - Get current session

#### Habits
- `GET /api/v1/habits` - List habits
- `POST /api/v1/habits` - Create habit
- `PATCH /api/v1/habits/:id` - Update habit
- `DELETE /api/v1/habits/:id` - Delete habit

#### Goals
- `GET /api/v1/goals` - List goals
- `POST /api/v1/goals` - Create goal

#### Analytics
- `GET /api/v1/analytics/weekly` - Weekly stats
- `GET /api/v1/analytics/monthly` - Monthly stats
- `GET /api/v1/analytics/heatmap` - Activity heatmap

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Run with coverage
pnpm test:cov
```

## 🚢 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push to main

### Backend (Railway)
1. Connect your repository to Railway
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy automatically on push to main

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines first.

## 📧 Support

For support, email support@quantumgrace.com or open an issue.

---

Built with ❤️ for personal growth
