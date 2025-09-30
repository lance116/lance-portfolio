"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MapPin, Calendar } from "lucide-react";

export default function ProfileSection() {
  
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col h-full">
            {/* About Me Card */}
            <Card className="bg-card shadow-lg border-0 h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-foreground">About Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-center">
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
                    I’ve built projects ranging from a chess neural network to an AI-powered period tracker; focusing on turning complex ideas into usable, polished products.
                    </p>
                    
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>I like designing systems that are simple to use but robust under the hood.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Computer Science student at the University of Waterloo</span>
                      </li>
                    </ul>
                    
                    <p className="text-sm text-muted-foreground">
                    Right now I’m building projects at the overlap of AI and web development. 
                    Aiming to make advanced tools more accessible, practical, and impactful in everyday workflows.
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
                      <span>Available for immediate opportunities</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
					{/* Right Column - Waterloo Campus Image */}
					<div className="flex items-center justify-center">
						<img
							src="/uwcampus.jpg"
							alt="University of Waterloo Campus"
							className="w-full h-auto max-w-[48rem] object-contain rounded-lg"
						/>
					</div>
        </div>
      </div>
    </section>
  );
}