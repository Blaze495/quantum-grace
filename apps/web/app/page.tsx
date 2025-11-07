import Link from 'next/link';
import { ArrowRight, Target, TrendingUp, Zap, Brain, Trophy, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-heading">Quantum Grace</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-24 text-center md:py-32">
        <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm">
          <Zap className="mr-2 h-4 w-4" />
          <span>Your Personal Operating System</span>
        </div>
        
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Track. Build. Evolve.
        </h1>
        
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Transform your daily habits into long-term success. Quantum Grace combines habit tracking, 
          goal setting, and AI-powered insights to help you become your best self.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register">
            <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Free to start • No credit card required
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Everything You Need to Grow
          </h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Powerful features designed to help you build better habits and achieve your goals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Target className="h-10 w-10" />}
            title="Habit Tracking"
            description="Create and track daily, weekly, or custom habits. Visualize your progress with streaks and consistency metrics."
          />
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10" />}
            title="Analytics Dashboard"
            description="Get insights into your productivity patterns with beautiful charts, heatmaps, and trend analysis."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10" />}
            title="AI Coach"
            description="Receive personalized insights and recommendations from your AI-powered Quantum Coach."
          />
          <FeatureCard
            icon={<Trophy className="h-10 w-10" />}
            title="Gamification"
            description="Earn XP, unlock badges, and maintain streaks. Stay motivated with friendly competition."
          />
          <FeatureCard
            icon={<TrendingUp className="h-10 w-10" />}
            title="Goal Management"
            description="Set meaningful goals, track progress, and celebrate achievements along your journey."
          />
          <FeatureCard
            icon={<Zap className="h-10 w-10" />}
            title="Pomodoro Timer"
            description="Stay focused with built-in Pomodoro sessions that automatically log to your activity tracker."
          />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container px-4 py-24 bg-muted/50">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Simple, Yet Powerful
          </h2>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Get started in minutes and see results that compound over time.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <StepCard
            number="1"
            title="Track Your Habits"
            description="Start by logging your daily habits and activities. What you track, you become."
          />
          <StepCard
            number="2"
            title="Build Consistency"
            description="Build streaks and watch your progress compound. Small actions lead to big results."
          />
          <StepCard
            number="3"
            title="Evolve & Grow"
            description="Use AI-powered insights to optimize your routines and achieve your goals faster."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24">
        <div className="rounded-2xl border bg-card p-8 text-center md:p-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto mb-8">
            Join thousands of people building better habits and achieving their goals with Quantum Grace.
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="gap-2">
              Start Free Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold font-heading">Quantum Grace</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Quantum Grace. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group relative rounded-2xl border p-6 hover:shadow-lg transition-all">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
        {number}
      </div>
      <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
