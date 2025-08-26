"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Milestone, ChevronDown, ChevronUp, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  logo?: string;
  impacts: string[];
  details?: string[];
  type: 'full-time' | 'internship' | 'contract' | 'freelance';
}

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
}

const mockExperiences: ExperienceEntry[] = [
  {
    id: '1',
    title: 'Founding Software Engineer',
    company: 'Stealth Startup',
    startDate: '2025-05',
    endDate: 'Present',
    logo: '/stealth.png',
    impacts: [
      'Led development of microservices architecture, reducing response time by 40%',
      'Mentored 3 junior developers and established code review standards'
    ],
    details: [
      'Implemented CI/CD pipelines using Docker and Kubernetes',
      'Collaborated with product team to define technical requirements',
      'Optimized database queries resulting in 25% performance improvement'
    ],
    type: 'full-time'
  },
  {
    id: '2',
    title: 'Software Engineering Intern',
    company: 'RCL Consulting',
    startDate: '2025-01',
    endDate: '2025-04',
    logo: '/ConsultingPFP.webp',
    impacts: [
      'Built responsive web applications serving 10k+ daily users',
      'Improved accessibility compliance to WCAG 2.1 AA standards'
    ],
    details: [
      'Developed reusable React component library',
      'Integrated third-party APIs and payment systems',
      'Reduced bundle size by 30% through code optimization'
    ],
    type: 'internship'
  },
  {
    id: '3',
    title: 'Research Fellow',
    company: 'StartupXYZ',
    startDate: '2021-05',
    endDate: '2021-08',
    impacts: [
      'Developed MVP features used by 500+ beta users',
      'Automated testing processes, increasing coverage by 60%'
    ],
    details: [
      'Built user authentication and authorization system',
      'Created admin dashboard for content management',
      'Participated in agile development ceremonies'
    ],
    type: 'internship'
  }
];

function TimelineItem({ entry, index }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  const formatDateRange = (start: string, end: string) => {
    // Handle future dates properly
    const formatMonth = (dateStr: string) => {
      const [year, month] = dateStr.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = parseInt(month) - 1;
      return `${monthNames[monthIndex]} ${year}`;
    };
    
    const startFormatted = formatMonth(start);
    const endFormatted = end === 'Present' ? 'Present' : formatMonth(end);
    
    return `${startFormatted} - ${endFormatted}`;
  };

  const getCompanyInitials = (company: string) => {
    return company
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-green-100 text-green-800';
      case 'freelance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="relative pl-8 pb-8 last:pb-0"
    >
      {/* Timeline line and marker */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      <div className="absolute left-[-8px] top-6 w-4 h-4 bg-card border-2 border-primary rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>

      <Card 
        className="ml-6 transition-all duration-200 hover:shadow-md hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        tabIndex={0}
        role="article"
        aria-label={`${entry.title} at ${entry.company}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            {/* Logo or initials */}
            <div className="flex-shrink-0">
              {entry.logo ? (
                <img
                  src={entry.logo}
                  alt={`${entry.company} logo`}
                  className="w-12 h-12 rounded-lg object-cover border border-border"
                />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border border-border">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {getCompanyInitials(entry.company)}
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {entry.title}
                  </h3>
                  <p className="text-base text-muted-foreground font-medium">
                    {entry.company}
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <time className="text-sm text-muted-foreground font-medium">
                    {formatDateRange(entry.startDate, entry.endDate)}
                  </time>
                  {entry.type !== 'full-time' && (
                    <Badge 
                      variant="secondary" 
                      className={`text-xs capitalize ${getTypeColor(entry.type)}`}
                    >
                      {entry.type}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Impact bullets */}
          <ul className="space-y-2 mb-4">
            {entry.impacts.map((impact, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                <span className="text-sm text-foreground leading-relaxed">
                  {impact}
                </span>
              </li>
            ))}
          </ul>

          {/* Expandable details */}
          {entry.details && entry.details.length > 0 && (
            <>
              <motion.div
                initial={false}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="pt-2 border-t border-border">
                  <ul className="space-y-2">
                    {entry.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 flex-shrink-0 mt-2" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-3 h-8 text-xs font-medium text-muted-foreground hover:text-foreground"
                aria-expanded={isExpanded}
                aria-controls={`details-${entry.id}`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Show less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    More details
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ExperienceTimelineProps {
  className?: string;
  maxInitialEntries?: number;
}

export default function ExperienceTimeline({ 
  className = "",
  maxInitialEntries = 6
}: ExperienceTimelineProps) {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [displayedCount, setDisplayedCount] = useState(maxInitialEntries);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Simulate data loading
  useEffect(() => {
    const loadInitialData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setExperiences(mockExperiences);
      setIsLoading(false);
    };

    loadInitialData();
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulate loading more entries
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDisplayedCount(prev => prev + 3);
    setIsLoadingMore(false);
  };

  const displayedExperiences = experiences.slice(0, displayedCount);
  const hasMoreEntries = displayedCount < experiences.length;

  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-48 h-8 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-4 bg-muted rounded mx-auto animate-pulse" />
          </div>
          
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
                <div className="absolute left-[-8px] top-6 w-4 h-4 bg-muted rounded-full animate-pulse" />
                
                <Card className="ml-6">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="w-48 h-5 bg-muted rounded animate-pulse" />
                        <div className="w-32 h-4 bg-muted rounded animate-pulse" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="w-full h-4 bg-muted rounded animate-pulse" />
                      <div className="w-3/4 h-4 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No Experience Added Yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Experience entries will appear here once they're added. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section 
      className={`w-full ${className}`}
      aria-labelledby="experience-timeline-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 
            id="experience-timeline-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey through roles, achievements, and the impact I've made along the way.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {displayedExperiences.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
            />
          ))}

          {/* Load more button */}
          {hasMoreEntries && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center pt-8"
            >
              <Button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                variant="outline"
                className="min-w-32"
              >
                {isLoadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Milestone className="w-4 h-4 mr-2" />
                    Load More
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}