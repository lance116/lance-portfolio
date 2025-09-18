"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BadgeX, Component, Github, Grid3x2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  problem: string;
  keyMetric: string;
  stack: string[];
  category: string | string[];
  thumbnail: string;
  demoUrl?: string;
  codeUrl?: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Period Tracker',
    problem: 'A privacy-friendly period tracker with an AI assistant for insights and reminders.',
    keyMetric: 'AI assistant for cycle insights and reminders',
    stack: ['React', 'Supabase', 'Gemini API', 'TypeScript', 'Tailwind', 'Framer Motion'],
    category: ['Full Stack', 'AI/ML'],
    thumbnail: '/aiperiodtracker.png',
    demoUrl: 'https://perica-ten.vercel.app',
    codeUrl: 'https://github.com/lance116/period-tracker',
  },
  {
    id: '2',
    title: 'Neural Network — Chess',
    problem: 'A from-scratch chess position evaluator trained on board states.',
    keyMetric: 'Trained on 80M+ board positions',
    stack: ['Python', 'TensorFlow', 'NumPy'],
    category: 'AI/ML',
    thumbnail: '/chessscreens.png',
    
    codeUrl: 'https://github.com/lance116/Chess-Neural-Network',
  },
  {
    id: '3',
    title: 'This website!',
    problem: 'A performant personal portfolio showcasing projects, experience, and contact.',
    keyMetric: 'Fast, responsive, accessible portfolio',
    stack: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Vercel'],
    category: 'Full Stack',
    thumbnail: '/portSS.png',
    demoUrl: '/',
    codeUrl: 'https://github.com/lance116/lance-portfolio',
  }
];

const categories = ['All', 'Full Stack', 'AI/ML'];

export default function ProjectsSection() {
  const [projects] = useState<Project[]>(projectsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true;
    if (Array.isArray(project.category)) {
      return project.category.includes(selectedCategory);
    }
    return project.category === selectedCategory;
  });

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.id]));
          } else {
            // Remove from visible cards when out of view so it can animate again
            setVisibleCards(prev => {
              const newSet = new Set(prev);
              newSet.delete(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-project-card]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-24" />
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-6 w-24 mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-16" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest work showcasing problem-solving through technology, 
            with measurable outcomes and real-world impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <BadgeX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category to see more projects.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  id={project.id}
                  data-project-card
                  initial={{ opacity: 0, y: 30 }}
                  animate={visibleCards.has(project.id) ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <CardContent className="p-6">
                      {/* Title & Problem */}
                      <h3 className="text-xl font-semibold text-card-foreground mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.problem}
                      </p>

                      {/* Key Metric */}
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/10 text-primary border-primary/20 mb-4"
                      >
                        <Grid3x2 className="w-3 h-3 mr-1" />
                        {project.keyMetric}
                      </Badge>

                      {/* Stack Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.stack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.stack.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-1" />
                            View Repository
                          </a>
                        </Button>
                        {project.id === '1' && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Component className="w-4 h-4 mr-1" />
                              View Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <div className="text-center mt-8 p-8 bg-muted/50 rounded-lg border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Interested in collaborating?
          </h3>
          <p className="text-muted-foreground mb-4">
            Let's discuss how I can help solve your technical challenges and drive measurable outcomes.
          </p>
          <Button asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
}