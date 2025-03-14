
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import SpamDetector from '@/components/SpamDetector';
import { Sparkles, ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <AnimatedBackground />
      
      <header className="w-full py-8 px-4 md:py-16 flex flex-col items-center max-w-5xl mx-auto">
        <div className="relative mb-2 animate-slide-down">
          <div className="absolute inset-0 blur-lg bg-primary/20 rounded-full"></div>
          <ShieldCheck className="w-12 h-12 text-primary relative" />
        </div>
        
        <div className="text-center animate-slide-down" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-3">
            Spam Detection
          </h1>
          <div className="inline-flex items-center bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground mb-6">
            <Sparkles className="w-3 h-3 mr-1 text-primary" />
            Powered by intelligent text analysis
          </div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A beautifully designed, intelligent system that helps you identify and filter spam messages with precision and elegance.
          </p>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-4xl px-4 pb-20 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <SpamDetector />
      </main>
      
      <footer className="w-full py-6 border-t border-border mt-auto">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            Spam Detection System — Designed with precision and care
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
