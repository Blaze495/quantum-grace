'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function GlobalHeader() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'motivation'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // If at top of page, clear active section
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-purple-500/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo - Small and visible */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-purple-600 dark:bg-purple-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold font-heading text-foreground">
            Quantum Grace
          </span>
        </Link>

        {/* Navigation - Only show on /home page */}
        {pathname === '/home' && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home#features">
              <motion.span
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium transition-all cursor-pointer inline-block relative ${
                  activeSection === 'features' 
                    ? 'text-purple-500' 
                    : 'text-foreground hover:text-purple-500'
                }`}
              >
                Features
                {activeSection === 'features' && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.span>
            </Link>
            <Link href="/home#how-it-works">
              <motion.span
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-medium transition-all cursor-pointer inline-block relative ${
                  activeSection === 'how-it-works' 
                    ? 'text-purple-500' 
                    : 'text-foreground hover:text-purple-500'
                }`}
              >
                How It Works
                {activeSection === 'how-it-works' && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-500"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.span>
            </Link>
          </nav>
        )}

        {/* Auth Buttons - Always visible */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-sm font-medium hover:text-purple-500 transition-colors">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-purple-600 hover:bg-purple-700 shadow-sm text-white font-medium transition-colors">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-foreground hover:text-purple-500 hover:bg-purple-500/10 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-purple-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-purple-500/20 bg-background/95 backdrop-blur"
          >
            <nav className="container flex flex-col gap-4 py-4">
              {/* Only show navigation links on /home page */}
              {pathname === '/home' && (
                <>
                  <Link href="/home#features" onClick={() => setMobileMenuOpen(false)}>
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                      className={`block py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        activeSection === 'features' 
                          ? 'bg-purple-500/10 text-purple-500' 
                          : 'hover:bg-purple-500/5 hover:text-purple-500'
                      }`}
                    >
                      Features
                    </motion.span>
                  </Link>
                  <Link href="/home#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                    <motion.span
                      whileTap={{ scale: 0.95 }}
                      className={`block py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        activeSection === 'how-it-works' 
                          ? 'bg-purple-500/10 text-purple-500' 
                          : 'hover:bg-purple-500/5 hover:text-purple-500'
                      }`}
                    >
                      How It Works
                    </motion.span>
                  </Link>
                </>
              )}
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <motion.span
                  whileTap={{ scale: 0.95 }}
                  className="block py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-500/5 hover:text-purple-500 transition-all"
                >
                  Login
                </motion.span>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                  Get Started
                </Button>
              </Link>
              
              {/* Theme Toggle in Mobile Menu */}
              {mounted && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium bg-purple-500/5 hover:bg-purple-500/10 text-foreground hover:text-purple-500 transition-all"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </motion.button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
