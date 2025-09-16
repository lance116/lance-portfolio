"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronRight, Linkedin, Github, Twitter } from 'lucide-react';

const navLinks = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      // Check which section is currently in view
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    setIsMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    // Open resume in new tab
    window.open('/LYResume.pdf', '_blank');
  };

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      linkedin: 'https://www.linkedin.com/in/lance-yan/',
      github: 'https://github.com/lance116', 
      twitter: 'https://x.com/cnnguan'
    };
    
    const url = socialLinks[platform as keyof typeof socialLinks];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/90 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <h1 className="font-heading font-bold text-xl text-foreground">
              Lance Yan
            </h1>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-sm font-medium transition-all duration-200 hover:text-primary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm ${
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.substring(1) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Social Media and Resume */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Social Media Buttons */}
            <Button
              onClick={() => handleSocialClick('linkedin')}
              variant="outline"
              size="sm"
              className="px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
            
            <Button
              onClick={() => handleSocialClick('github')}
              variant="outline"
              size="sm"
              className="px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              title="GitHub"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
            
            <Button
              onClick={() => handleSocialClick('twitter')}
              variant="outline"
              size="sm"
              className="px-3 py-2 rounded-full transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              title="Twitter"
            >
              <Twitter className="h-4 w-4 mr-2" />
              Twitter
            </Button>
            
            {/* Resume Button */}
            <Button
              onClick={handleResumeClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              title="Open resume in new tab"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-auto">
                <div className="py-4 space-y-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`flex items-center justify-between w-full text-left p-3 rounded-lg transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeSection === link.href.substring(1)
                          ? 'text-primary bg-accent/50'
                          : 'text-foreground'
                      }`}
                    >
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                  
                  <div className="pt-4 border-t border-border space-y-3">
                    {/* Social Media Buttons */}
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleSocialClick('linkedin')}
                        variant="outline"
                        className="w-full py-3 rounded-full justify-start"
                        title="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 mr-3" />
                        LinkedIn
                      </Button>
                      
                      <Button
                        onClick={() => handleSocialClick('github')}
                        variant="outline"
                        className="w-full py-3 rounded-full justify-start"
                        title="GitHub"
                      >
                        <Github className="h-5 w-5 mr-3" />
                        GitHub
                      </Button>
                      
                      <Button
                        onClick={() => handleSocialClick('twitter')}
                        variant="outline"
                        className="w-full py-3 rounded-full justify-start"
                        title="Twitter"
                      >
                        <Twitter className="h-5 w-5 mr-3" />
                        Twitter
                      </Button>
                    </div>
                    
                    <Button
                      onClick={handleResumeClick}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-full"
                    >
                      Resume
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}