"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader } from "lucide-react";

interface LoadingOverlayProps {
  onReady?: () => void;
  className?: string;
}

export default function LoadingOverlay({ onReady, className }: LoadingOverlayProps) {
  const [isReady, setIsReady] = useState(false);
  const [showIdleState, setShowIdleState] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Set up idle state timer
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      if (!isReady) {
        setShowIdleState(true);
      }
    }, 3000);

    return () => clearTimeout(idleTimer);
  }, [isReady]);

  // Simulate loading completion
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(loadTimer);
  }, []);

  const handleExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onReady?.();
    }, 400);
  }, [onReady]);

  const handleCancel = useCallback(() => {
    handleExit();
  }, [handleExit]);

  // Auto-exit when ready
  useEffect(() => {
    if (isReady && !isExiting) {
      handleExit();
    }
  }, [isReady, isExiting, handleExit]);

  if (isExiting) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm transition-all duration-700 ${
        isExiting 
          ? prefersReducedMotion 
            ? "opacity-0" 
            : "opacity-0 translate-y-2"
          : "opacity-100 translate-y-0"
      } ${className || ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Lance Yan portfolio"
    >
      <div className="text-center space-y-8">
        {/* Main loading card */}
        <div className="bg-card rounded-2xl shadow-lg px-12 py-10 border border-border/50 max-w-md mx-auto">
          <div className="space-y-6">
            {/* Name with breathing animation */}
            <h1 
              className={`font-heading text-4xl md:text-5xl font-bold text-primary transition-all duration-1000 ${
                prefersReducedMotion 
                  ? "" 
                  : "animate-pulse"
              }`}
              style={{
                animation: prefersReducedMotion 
                  ? "none" 
                  : "breathe 3s ease-in-out infinite"
              }}
            >
              Lance Yan
            </h1>

            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-3">
              <Loader 
                className={`w-5 h-5 text-muted-foreground ${
                  prefersReducedMotion ? "" : "animate-spin"
                }`} 
              />
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full bg-muted-foreground/40 ${
                      prefersReducedMotion 
                        ? "" 
                        : "animate-pulse"
                    }`}
                    style={{
                      animationDelay: prefersReducedMotion ? "0s" : `${i * 0.3}s`,
                      animationDuration: "1.5s"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Idle state messaging */}
        {showIdleState && (
          <div 
            className={`space-y-4 transition-all duration-500 ${
              showIdleState ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className="text-muted-foreground text-sm">
              Optimizing your experience...
            </p>
            <button
              onClick={handleCancel}
              className="text-primary hover:text-primary/80 text-sm underline underline-offset-4 transition-colors duration-200"
            >
              Continue anyway
            </button>
          </div>
        )}
      </div>

      {/* Custom breathing animation styles */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}