"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { Button } from "@/components/ui/button";
import { Code, Github, Component, Database, Layers, Globe } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-4 py-12 lg:py-20">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight text-foreground"
                variants={itemVariants}
              >
                Building <span className="text-primary">Scalable</span>, <span className="text-primary">Reliable</span>, and <span className="text-primary">Impactful</span> Software
              </motion.h1>
              
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed"
                variants={itemVariants}
              >
                Full‑stack web development and AI engineering — CS @ UWaterloo
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                onClick={() => handleScrollToSection("projects")}
              >
                View Projects
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                onClick={() => handleScrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Visual Card */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            {/* Main Card */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border max-w-md w-full">
              {/* Code Preview Placeholder - moved up */}
              <div className="bg-muted rounded-lg p-4 mb-6 border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="space-y-1 text-sm font-mono">
                  <div className="text-primary font-semibold">const</div>
                  <div className="text-primary font-semibold ml-4">developer = &#123;</div>
                  <div className="text-foreground ml-8">name: "Lance Yan",</div>
                  <div className="text-foreground ml-8">skills: ["Fullstack", "AI"],</div>
                  <div className="text-foreground ml-8">passion: "Building"</div>
                  <div className="text-primary font-semibold ml-4">&#125;;</div>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground border border-border">
                  <Layers className="w-4 h-4 text-primary" />
                  React
                </div>
                <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground border border-border">
                  <Globe className="w-4 h-4 text-primary" />
                  Next.js
                </div>
                <div className="flex items-center gap-1 bg-secondary px-3 py-1.5 rounded-full text-sm font-medium text-secondary-foreground border border-border">
                  <Database className="w-4 h-4 text-primary" />
                  PostgreSQL
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}