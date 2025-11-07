'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  CheckCircle2, 
  TrendingUp, 
  Zap,
  LogOut,
  Flame
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Quantum Grace</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Welcome back! 👋</h1>
            <p className="text-muted-foreground mt-2">
              Here's your personal growth dashboard
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Streak
                </CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 days</div>
                <p className="text-xs text-muted-foreground">
                  Start tracking to build streaks
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Habits
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Create your first habit
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Goals
                </CardTitle>
                <Target className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Set your first goal
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sessions
                </CardTitle>
                <Zap className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Log your first session
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <Card>
            <CardHeader>
              <CardTitle>🚀 Your Dashboard is Being Built</CardTitle>
              <CardDescription>
                We're building out all the features step by step. Here's what's coming:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Phase 1: Authentication ✅
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Login and registration pages are complete and functional!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    Phase 2: Dashboard (You are here)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Building navigation and layout structure
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">
                    Phase 3: Habit Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create, track, and manage your daily habits
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">
                    Phase 4: Goals & Analytics
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Set goals and visualize your progress with charts
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">
                    Phase 5: AI Coach
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized insights and coaching
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-muted-foreground">
                    Phase 6: Gamification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Badges, streaks, and leaderboards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
