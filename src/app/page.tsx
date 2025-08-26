"use client";

import { useState, useEffect } from 'react';
import LoadingOverlay from '@/components/LoadingOverlay';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsSection from '@/components/ProjectsSection';
import ContactCTA from '@/components/ContactCTA';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoadingComplete = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && (
        <LoadingOverlay 
          onReady={handleLoadingComplete}
          className={isTransitioning ? 'opacity-0 pointer-events-none' : ''}
        />
      )}
      
      {!isLoading && (
        <>
          <Navbar />
          
          <main className="relative">
            <HeroSection />
            
            <div id="skills" className="scroll-mt-16">
              <ProfileSection />
            </div>
            
            <div id="experience" className="scroll-mt-16 py-20">
              <ExperienceTimeline />
            </div>
            
            <div id="projects" className="scroll-mt-16">
              <ProjectsSection />
            </div>
            
            <div id="contact" className="scroll-mt-16">
              <ContactCTA />
            </div>
          </main>
        </>
      )}
    </div>
  );
}