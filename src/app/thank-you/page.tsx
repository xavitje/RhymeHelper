import Link from 'next/link';

import { motion } from 'framer-motion';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';

export default function ThankYou() {
  return (
    <>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl bg-muted/5 border border-border p-12 rounded-2xl shadow-2xl"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-4xl font-display uppercase tracking-wide mb-4">Welcome to <span className="text-primary">Pro</span></h1>
          <p className="text-lg text-muted-foreground font-sans mb-8">
            Your purchase was successful. We've sent your license key and setup instructions to your email address.
          </p>

          <div className="bg-background border border-border p-6 rounded-xl mb-10 text-left">
            <h3 className="font-display uppercase tracking-wider mb-4 text-sm text-muted-foreground border-b border-border/50 pb-2">Next Steps</h3>
            <ol className="space-y-4 font-sans text-sm">
              <li className="flex gap-3">
                <span className="font-mono text-primary font-bold">01.</span>
                <span>Check your email for your unique License Key from Lemon Squeezy.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-primary font-bold">02.</span>
                <span>Create an account or login to the web portal to link your license.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-primary font-bold">03.</span>
                <span>Download the desktop app and activate your license inside the app.</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-mono rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Download className="w-4 h-4" />
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 border border-border text-foreground font-mono rounded-md hover:bg-muted transition-colors flex items-center justify-center gap-2"
            >
              Return Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
