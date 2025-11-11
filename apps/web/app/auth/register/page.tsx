'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, Sparkles, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { authApi } from '@/lib/api';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    if (formData.password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }

    setLoading(true);

    try {
      await authApi.register({ name: formData.name, email: formData.email, password: formData.password });
      toast({ title: 'Success!', description: 'Your account has been created. Please sign in.' });
      router.push('/auth/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to your backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    // Redirect to your backend GitHub OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  };

  const handleAppleLogin = () => {
    // Redirect to your backend Apple OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/apple`;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background to-muted p-4">
      {/* Theme Toggle - Fixed top right */}
      {mounted && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-6 right-6 z-50 p-3 rounded-lg text-foreground hover:text-purple-500 hover:bg-purple-500/10 transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.button>
      )}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(600px 300px at var(--x,50%) var(--y,50%), rgba(99,102,241,0.10), transparent 60%)',
            'radial-gradient(600px 300px at var(--x,50%) var(--y,50%), rgba(168,85,247,0.10), transparent 60%)',
            'radial-gradient(600px 300px at var(--x,50%) var(--y,50%), rgba(59,130,246,0.10), transparent 60%)',
          ],
        }}
        style={{
          // @ts-ignore custom CSS var for glow origin
          ['--x' as any]: `${mouse.x}px`,
          ['--y' as any]: `${mouse.y}px`,
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ type: 'spring', stiffness: 220, damping: 18 }}>
          <Card className="relative w-full max-w-md overflow-hidden border-white/10">
            <motion.div
              className="pointer-events-none absolute -inset-x-1 -top-1 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <CardHeader className="space-y-1">
              <motion.div
                variants={fadeUp(0.05)}
                initial="hidden"
                animate="visible"
                className="mb-4 flex items-center justify-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
              </motion.div>
              <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible">
                <CardTitle className="text-center text-2xl">Create an account</CardTitle>
                <CardDescription className="text-center">Start your journey to personal growth</CardDescription>
              </motion.div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <motion.div variants={fadeUp(0.15)} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeUp(0.2)} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeUp(0.25)} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeUp(0.3)} initial="hidden" animate="visible" className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={loading}
                    />
                  </motion.div>
                </motion.div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="group relative w-full overflow-hidden" disabled={loading}>
                    <motion.span
                      className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-purple-500 to-blue-500"
                      initial={{ opacity: 0.9 }}
                      animate={{ opacity: 1 }}
                    />
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Create Account
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={fadeUp(0.35)} initial="hidden" animate="visible" className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </motion.div>

                {/* OAuth Buttons */}
                <motion.div variants={fadeUp(0.4)} initial="hidden" animate="visible" className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGithubLogin}
                    disabled={loading}
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAppleLogin}
                    disabled={loading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  </Button>
                </motion.div>

                <motion.div variants={fadeUp(0.45)} initial="hidden" animate="visible" className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp(0.4)} initial="hidden" animate="visible" className="text-center text-sm">
                  <Link href="/" className="text-muted-foreground transition hover:text-primary">
                    ← Back to home
                  </Link>
                </motion.div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
