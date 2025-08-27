"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { MapPin, Calendar, ArrowUp } from "lucide-react";

interface Skill {
  name: string;
  proficiency: number;
}

const skills: Skill[] = [
  { name: "Python", proficiency: 95 },
  { name: "Java", proficiency: 90 },
  { name: "JavaScript", proficiency: 88 },
  { name: "TypeScript", proficiency: 85 },
  { name: "React", proficiency: 92 },
  { name: "Next.js", proficiency: 87 },
  { name: "Tailwind CSS", proficiency: 90 },
  { name: "HTML", proficiency: 95 },
      { name: "CSS", proficiency: 88 },
    { name: "PostgreSQL", proficiency: 85 },
    { name: "PyTorch", proficiency: 75 },
  { name: "TensorFlow", proficiency: 80 },
  { name: "NumPy", proficiency: 85 },
  { name: "Matplotlib", proficiency: 82 }
];

export default function ProfileSection() {
  const [animatedSkills, setAnimatedSkills] = useState<number[]>(new Array(skills.length).fill(0));
  const [percentageCounters, setPercentageCounters] = useState<number[]>(new Array(skills.length).fill(0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>(new Array(skills.length).fill(null));
  const animationStarted = useRef(false);
  const individualSkillAnimations = useRef<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animationStarted.current) {
          setIsVisible(true);
          animationStarted.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Individual skill intersection observers
  useEffect(() => {
    const skillObservers: IntersectionObserver[] = [];
    
    skillRefs.current.forEach((skillRef, index) => {
      if (skillRef) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !individualSkillAnimations.current.has(index)) {
              // Trigger animation for this specific skill
              individualSkillAnimations.current.add(index);
              
              // Animate the skill bar
              setAnimatedSkills(prev => {
                const newValues = [...prev];
                newValues[index] = skills[index].proficiency;
                return newValues;
              });
              
              // Animate the percentage counter
              const skill = skills[index];
              const counterDuration = 800;
              const startTime = performance.now();
              
              const animateCounter = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / counterDuration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.round(skill.proficiency * easeOutQuart);
                
                setPercentageCounters(prev => {
                  const newValues = [...prev];
                  newValues[index] = currentValue;
                  return newValues;
                });
                
                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                }
              };
              
              requestAnimationFrame(animateCounter);
            }
          },
          { 
            threshold: 0.1, // Trigger when 10% of the skill is visible
            rootMargin: '0px 0px -50px 0px' // Trigger when bottom of screen reaches top of skill
          }
        );
        
        observer.observe(skillRef);
        skillObservers.push(observer);
      }
    });
    
    return () => {
      skillObservers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Reset to 0 first
      setAnimatedSkills(new Array(skills.length).fill(0));
      setPercentageCounters(new Array(skills.length).fill(0));
      
      // Use a simple, smooth approach with CSS transitions
      skills.forEach((skill, index) => {
        const delay = index * 150; // Reduced delay for 25% faster loading
        
        setTimeout(() => {
          setAnimatedSkills(prev => {
            const newValues = [...prev];
            newValues[index] = skill.proficiency;
            return newValues;
          });
          
          // Animate percentage counter from 0 to final value
          const counterDuration = 800; // Fast counter animation
          const startTime = performance.now();
          
          const animateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / counterDuration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(skill.proficiency * easeOutQuart);
            
            setPercentageCounters(prev => {
              const newValues = [...prev];
              newValues[index] = currentValue;
              return newValues;
            });
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          };
          
          requestAnimationFrame(animateCounter);
        }, delay);
      });
    }
  }, [isVisible]);



  return (
    <section ref={sectionRef} className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-0">
            {/* About Me Card */}
            <Card className="bg-card shadow-lg border-0 h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 p-1">
                      <img
                        src="/pfp4.png"
                        alt="Lance Yan"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <p className="text-foreground leading-relaxed">
                      I'm passionate about creating elegant solutions to complex problems through clean, 
                      efficient code and thoughtful user experiences.
                    </p>
                    
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Systematic approach to problem-solving with focus on scalability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Computer Science student at University of Waterloo</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-muted-foreground">
                      Currently exploring the intersection of AI/ML and web development, 
                      building projects that make technology more accessible and impactful.
                    </p>
                  </div>
                </div>
                
                {/* Quick Facts */}
                <div className="border-t border-border pt-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Waterloo, ON</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Available for opportunities</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Waterloo Campus Image - positioned directly below About Me card */}
            <div className="flex justify-center" style={{ marginTop: '10px' }}>
              <img
                src="/uwcampus.jpg"
                alt="University of Waterloo Campus"
                className="w-[48rem] h-auto object-contain rounded-lg"
              />
            </div>

            {/* Arrow pointing to campus with text */}
            <div className="flex justify-center items-center gap-2 mt-2">
              <ArrowUp className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium text-foreground">My school!</span>
            </div>
          </div>

          {/* Skills Card */}
          <Card className="bg-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-heading text-foreground">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    ref={(el) => { skillRefs.current[index] = el; }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {percentageCounters[index]}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-750 ease-out"
                        style={{ 
                          width: `${animatedSkills[index]}%`,
                          transitionDelay: `${index * 37}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}