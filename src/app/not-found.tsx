"use client";
import Link from 'next/link';

import { Home, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <h1 className="text-9xl font-display text-primary/20 mb-4 tracking-tighter">404</h1>
          <h2 className="text-3xl font-display uppercase tracking-wide mb-6">Lost in the <span className="text-primary">Studio</span>?</h2>
          <p className="text-muted-foreground font-sans mb-8">
            The track you're looking for doesn't exist, has been moved, or is currently unreleased.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-mono rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back Home
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-4 border border-border text-foreground font-mono rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
