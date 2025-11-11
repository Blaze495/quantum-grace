'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Loader2, Sparkles, Check, ArrowRight, Sun, Moon, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { authApi } from '@/lib/api';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('auth_token', response.data.token || response.data.access_token);
      toast({ title: 'Success!', description: 'You have been logged in successfully.' });
      setSuccess(true);
      setTimeout(() => {
        router.push('/home');
      }, 1400);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Invalid email or password',
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
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
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-purple-950/20 via-background to-violet-950/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <div className="relative w-full max-w-md">
            {/* Neumorphism Login Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-zinc-900/80 p-8 backdrop-blur-xl"
              style={{
                boxShadow: `
                  inset -2px -2px 8px rgba(255,255,255,0.05),
                  inset 2px 2px 8px rgba(0,0,0,0.3),
                  0 20px 40px rgba(0,0,0,0.4),
                  0 0 0 1px rgba(139,92,246,0.1)
                `,
              }}
              animate={{
                boxShadow: success
                  ? [
                      'inset -2px -2px 8px rgba(255,255,255,0.05), inset 2px 2px 8px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)',
                      'inset -2px -2px 8px rgba(255,255,255,0.05), inset 2px 2px 8px rgba(0,0,0,0.3), 0 20px 40px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.2)',
                    ]
                  : 'inset -2px -2px 8px rgba(255,255,255,0.05), inset 2px 2px 8px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(139,92,246,0.1)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Success Overlay */}
              <motion.div
                className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-zinc-900/95 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: success ? 1 : 0,
                  scale: success ? 1 : 0.95,
                  pointerEvents: success ? 'auto' : 'none',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Large Glowing Purple Square with Checkmark */}
                <motion.div
                  className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: success ? 1 : 0, rotate: success ? 0 : -180 }}
                  transition={{ delay: 0.15, duration: 0.5, type: 'spring', stiffness: 200 }}
                  style={{
                    boxShadow: '0 0 50px rgba(139,92,246,0.7), 0 0 100px rgba(139,92,246,0.5), inset 0 0 20px rgba(255,255,255,0.1)',
                  }}
                >
                  <Check className="h-12 w-12 text-white" strokeWidth={3} />
                  {/* Sparkle particles */}
                  {success && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-1.5 w-1.5 rounded-full bg-white"
                          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i * Math.PI * 2) / 8) * 40,
                            y: Math.sin((i * Math.PI * 2) / 8) * 40,
                          }}
                          transition={{
                            delay: 0.3 + i * 0.05,
                            duration: 0.8,
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
                <motion.h2
                  className="mb-2 text-3xl font-bold text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: success ? 1 : 0, y: success ? 0 : 10 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  Login Successful!
                </motion.h2>
                <motion.p
                  className="text-base text-zinc-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: success ? 1 : 0, y: success ? 0 : 10 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                >
                  Welcome back!
                </motion.p>
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  variants={fadeUp(0.05)}
                  initial="hidden"
                  animate={success ? 'hidden' : 'visible'}
                  className="mb-6 flex items-center justify-center"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(124,58,237,0.2))',
                      boxShadow: 'inset -2px -2px 4px rgba(255,255,255,0.1), inset 2px 2px 4px rgba(0,0,0,0.2), 0 4px 12px rgba(139,92,246,0.3)',
                    }}
                  >
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                </motion.div>
                <motion.div variants={fadeUp(0.1)} initial="hidden" animate={success ? 'hidden' : 'visible'}>
                  <h2 className="mb-2 text-center text-2xl font-semibold text-white">Welcome back</h2>
                  <p className="text-center text-sm text-zinc-400">Enter your credentials to access your account</p>
                </motion.div>
                <form onSubmit={handleSubmit}>
                  <div className="mt-6 space-y-4">
                    <motion.div variants={fadeUp(0.15)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={loading || success}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </motion.div>
                    <motion.div variants={fadeUp(0.2)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="space-y-2">
                      <Label htmlFor="password" className="text-zinc-300">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        disabled={loading || success}
                        onFocus={() => setIsPasswordActive(true)}
                        onBlur={() => setIsPasswordActive(false)}
                        onMouseEnter={() => setIsPasswordActive(true)}
                        onMouseLeave={() => !document.activeElement?.matches('#password') && setIsPasswordActive(false)}
                        className="bg-zinc-800/50 border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20"
                      />
                    </motion.div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-500 hover:to-violet-500 disabled:opacity-50"
                      disabled={loading || success}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                        </>
                      ) : (
                        <>
                          Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {/* Divider */}
                    <motion.div variants={fadeUp(0.25)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-zinc-900 px-2 text-zinc-400">Or continue with</span>
                      </div>
                    </motion.div>

                    {/* OAuth Buttons */}
                    <motion.div variants={fadeUp(0.3)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="grid grid-cols-3 gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={loading || success}
                        className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
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
                        disabled={loading || success}
                        className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAppleLogin}
                        disabled={loading || success}
                        className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-zinc-600"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      </Button>
                    </motion.div>

                    <motion.div variants={fadeUp(0.35)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="text-center text-sm text-zinc-400">
                      Don't have an account?{' '}
                      <Link href="/auth/register" className="font-medium text-purple-400 hover:text-purple-300">
                        Sign up
                      </Link>
                    </motion.div>
                    <motion.div variants={fadeUp(0.3)} initial="hidden" animate={success ? 'hidden' : 'visible'} className="text-center text-sm">
                      <Link href="/" className="text-zinc-500 transition hover:text-zinc-300">
                        ← Back to home
                      </Link>
                    </motion.div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}


