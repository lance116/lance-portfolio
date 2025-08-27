"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid3x2, BadgeX, Component, Frame, ChartColumnBig, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  problem: string;
  keyMetric: string;
  metricValue: string;
  stack: string[];
  category: string | string[];
  thumbnail: string;
  demoUrl?: string;
  codeUrl?: string;
  fullDescription: string;
  approach: string;
  results: string[];
  architecture?: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Period Tracker',
    problem: 'I created a custom period tracker app for my girlfriend which features an AI chat buddy',
    keyMetric: 'Query Performance',
    metricValue: '75% faster',
    stack: ['React', 'Next.js', 'TypeScript', 'Python', 'PostgreSQL'],
    category: ['Full Stack', 'AI/ML'],
    thumbnail: '/aiperiodtracker.png',
    demoUrl: '#demo',
    codeUrl: '#code',
    fullDescription: 'Built a comprehensive analytics platform that processes millions of data points in real-time, providing actionable insights through intuitive visualizations.',
    approach: 'Implemented a microservices architecture with Redis caching, optimized SQL queries, and created a responsive dashboard using modern React patterns.',
    results: [
      '75% improvement in query performance',
      '40% increase in user engagement',
      '60% reduction in support tickets',
      'Successfully deployed to 500+ enterprise clients'
    ]
  },
  {
    id: '2',
    title: 'Chess Neural Network',
    problem: 'I created a chess neural network from scratch using Tensorflow and Python',
    keyMetric: 'Deployment Time',
    metricValue: '90% reduction',
    stack: ['Python', 'TensorFlow', 'NumPy'],
    category: 'AI/ML',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    demoUrl: '#demo',
    codeUrl: '#code',
    fullDescription: 'Created an end-to-end ML operations platform that automates model deployment, monitoring, and scaling across cloud infrastructure.',
    approach: 'Built containerized microservices with auto-scaling capabilities, integrated monitoring dashboards, and implemented CI/CD pipelines for ML workflows.',
    results: [
      '90% reduction in deployment time',
      '99.9% uptime achieved',
      '50+ models deployed successfully',
      '$200K annual infrastructure cost savings'
    ]
  },
  {
    id: '3',
    title: 'This website!',
    problem: 'Featuring handmade elements, transitions and designs, built with lots of coffee',
    keyMetric: 'Page Load Speed',
    metricValue: '60% faster',
    stack: ['Next.js', 'Vercel', 'Shopify', 'GraphQL', 'Tailwind'],
    category: 'Full Stack',
    thumbnail: '/portfolioss.png',
    demoUrl: '#demo',
    codeUrl: '#code',
    fullDescription: 'Rebuilt an e-commerce platform from the ground up, focusing on performance optimization and user experience improvements.',
    approach: 'Implemented server-side rendering, image optimization, lazy loading, and modern caching strategies to deliver lightning-fast page loads.',
    results: [
      '60% improvement in page load speed',
      '35% increase in conversion rate',
      '45% reduction in bounce rate',
      '$1.2M additional revenue generated'
    ]
  }
];

const categories = ['All', 'Full Stack', 'AI/ML'];

export default function ProjectsSection() {
  const [projects] = useState<Project[]>(mockProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const handleViewCase = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
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
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
                        <ChartColumnBig className="w-3 h-3 mr-1" />
                        {project.keyMetric}: {project.metricValue}
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
                          onClick={() => handleViewCase(project)}
                          className="flex-1"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          View Repository
                        </Button>
                        {project.id !== '2' && project.id !== '3' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => project.demoUrl && window.open(project.demoUrl, '_blank')}
                            className="flex-1"
                          >
                            <Component className="w-4 h-4 mr-1" />
                            Demo
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

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.problem}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8">
                {/* Project Overview */}
                <div>
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Key Metric</h4>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-base px-3 py-1">
                        <ChartColumnBig className="w-4 h-4 mr-2" />
                        {selectedProject.keyMetric}: {selectedProject.metricValue}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Problem → Approach → Results */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Problem</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Approach</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedProject.approach}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-primary">Results</h4>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <ChartColumnBig className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Architecture Placeholder */}
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Grid3x2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Architecture Diagram
                  </p>
                  <small className="text-muted-foreground/70">
                    System design and data flow visualization
                  </small>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  {selectedProject.id !== '2' && selectedProject.id !== '3' && (
                    <Button
                      asChild
                      className="flex-1"
                    >
                      <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Component className="w-4 h-4 mr-2" />
                        View Demo
                      </a>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    asChild
                    className={selectedProject.id === '2' || selectedProject.id === '3' ? "w-full" : "flex-1"}
                  >
                    <a href={selectedProject.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Repository
                    </a>
                  </Button>
                </div>

                {/* CTA for Recruiters */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <h5 className="text-lg font-semibold text-foreground mb-2">
                    Interested in collaborating?
                  </h5>
                  <p className="text-muted-foreground mb-4">
                    I'd love to discuss how I can bring this level of impact to your team and projects.
                  </p>
                  <Button asChild>
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}