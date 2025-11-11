'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Target,
  TrendingUp,
  Zap,
  Brain,
  Trophy,
  BarChart3,
  Sparkles,
  ShieldCheck,
  TimerReset,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  },
});

const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const features = [
  {
    icon: <Target className="h-10 w-10" />,
    title: 'Habit Tracking',
    description:
      'Create daily or weekly habits with reminders, streaks, and simple check-ins that keep you consistent.',
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: 'Dynamic Analytics',
    description:
      'See trend lines, heatmaps, and summaries that make it obvious where you\'re improving or falling behind.',
  },
  {
    icon: <Brain className="h-10 w-10" />,
    title: 'AI Growth Coach',
    description:
      'Get clear weekly recaps and suggestions tailored to your goals and current routine.',
  },
  {
    icon: <Trophy className="h-10 w-10" />,
    title: 'Gamified Motivation',
    description:
      'Earn points, unlock badges, and keep streaks alive so progress always feels rewarding.',
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: 'Goal Architecture',
    description:
      'Break big goals into milestones with progress tracking and automatic check-ins.',
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: 'Pomodoro Flow',
    description:
      'Run focused work sessions with automatic logging so every timer contributes to your progress.',
  },
];

const highlights = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Quick daily overview',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Private & secure',
  },
  {
    icon: <TimerReset className="h-5 w-5" />,
    title: 'Flexible scheduling',
  },
];

const inspirationQuotes = [
  {
    quote: 'The future depends on what you do today.',
    author: 'Mahatma Gandhi',
  },
  {
    quote: 'You don\'t have to be great to start, but you have to start to be great.',
    author: 'Zig Ziglar',
  },
  {
    quote: 'It always seems impossible until it\'s done.',
    author: 'Nelson Mandela',
  },
  {
    quote: 'Success is liking yourself, liking what you do, and liking how you do it.',
    author: 'Maya Angelou',
  },
];

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

interface QuoteCardProps {
  quote: string;
  author: string;
}

export default function HomePage() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-purple-500/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[90px]"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 container flex flex-col items-center justify-center gap-6 px-4 pt-32 pb-24 text-center md:pt-40 md:pb-32 max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-sm backdrop-blur-sm shadow-lg shadow-purple-500/10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Zap className="h-4 w-4 text-purple-400" />
          </motion.div>
          <span className="font-medium bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            Your personal growth command center
          </span>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl leading-tight"
        >
          <span className="inline-block bg-gradient-to-br from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
            Build better habits. Hit every goal.
          </span>
        </motion.h1>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-2xl text-base text-muted-foreground md:text-lg leading-relaxed"
        >
          Quantum Grace is the productivity hub that keeps your habits, goals, and progress in one place. Plan your week, stay accountable, and see exactly how you're advancing.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-4"
        >
          <Link href="/auth/register">
            <Button size="lg" className="text-base px-10 w-full sm:w-auto h-12 rounded-lg bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/20 text-white font-medium transition-colors">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button size="lg" variant="outline" className="text-base px-10 w-full sm:w-auto h-12 rounded-lg border-2 border-border hover:border-purple-500/50 hover:bg-purple-500/5 font-medium transition-colors">
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Small text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xs text-muted-foreground tracking-wide font-medium mt-2"
        >
          Start in minutes • No credit card required
        </motion.p>

        {/* Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-lg border border-border bg-card text-center"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                {highlight.icon}
              </div>
              <p className="text-sm font-medium text-foreground">{highlight.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container px-4 py-24 md:py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-foreground">
            Everything You Need to Grow
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful features designed to help you build better habits and achieve your goals.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 container px-4 py-24 md:py-32 bg-muted/30 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get started in minutes and see results that compound over time.
          </p>
        </motion.div>

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
      <section id="motivation" className="relative z-10 container px-4 py-24 md:py-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-background to-purple-500/5 p-12 text-center md:p-16"
        >
          
          <h2 className="relative z-10 font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-foreground">
            Ready to Transform Your Life?
          </h2>
          <p className="relative z-10 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of people building better habits and achieving their goals.
          </p>

          {/* Social Proof Stats */}
          <div className="relative z-10 grid gap-6 md:grid-cols-3 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">500K+</div>
              <div className="text-sm text-muted-foreground">Habits Tracked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </motion.div>
          </div>

          <Link href="/auth/register">
            <Button size="lg" className="relative z-10 px-10 h-12 bg-purple-600 hover:bg-purple-700 shadow-lg text-white font-medium transition-colors">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 border-t border-border bg-muted/30 py-12 md:py-16"
      >
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="font-bold font-heading text-foreground">
                Quantum Grace
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Quantum Grace
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, index }: Feature & { index: number }) {
  return (
    <motion.div
      variants={fadeUp(0.1 + index * 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: parseInt(number) * 0.15 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-8 text-center"
    >
      {/* Number badge */}
      <div className="relative z-10 mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-xl">
        {number}
      </div>

      {/* Content */}
      <h3 className="relative z-10 mb-3 font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

