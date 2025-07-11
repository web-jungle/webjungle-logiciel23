"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { DemandeCongeComplete } from "./conge";
import CRMDemo from "./crm-demo";
import PlanningDemo from "./planing-demo";
import { GlowingEffect } from "./ui/glowing-effect";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Card = ({
  children,
  isLargeOnMobile = false,
}: {
  children: React.ReactNode;
  isLargeOnMobile?: boolean;
}) => {
  return (
    <div
      className={`max-w-2xl z-40 group mx-auto isolate group ${
        isLargeOnMobile ? "h-[35rem]" : "h-[20rem]"
      } md:h-[30rem] w-full border-4 border-neutral-900 p-2 md:p-2 bg-charcoal rounded-[30px] shadow-2xl relative`}
    >
      <div className="absolute h-40 w-full bottom-0 md:-bottom-10 inset-x-0 scale-[1.2] z-10 pointer-events-none bg-charcoal [mask-image:linear-gradient(to_top,white_30%,transparent)]" />
      <div className="h-full w-full overflow-hidden rounded-2xl bg-transparent md:rounded-2xl md:p-4 relative z-20">
        {/* Conteneur simulant un écran 100vh avec scale réduit */}
        <div
          className="w-full h-full origin-top-left overflow-hidden"
          style={{
            transform: isLargeOnMobile ? "scale(0.7)" : "scale(0.5)",
            transformOrigin: "top left",
            width: isLargeOnMobile ? "143%" : "200%", // 100% / scale pour compenser
            height: isLargeOnMobile ? "143%" : "200%", // 100% / scale pour compenser
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const Section = ({
  title,
  description,
  children,
  reverse = false,
  isLargeOnMobile = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  reverse?: boolean;
  isLargeOnMobile?: boolean;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Animation pour la card
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: reverse ? 50 : -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation pour le texte
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          x: reverse ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center py-20 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Card */}
          <div className={`${reverse ? "lg:col-start-2" : ""}`}>
            <div ref={cardRef} className="relative">
              <Card isLargeOnMobile={isLargeOnMobile}>
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  borderWidth={3}
                  blur={8}
                  autoRotate={false}
                />
                {children}
              </Card>
            </div>
          </div>

          {/* Texte */}
          <div className={`${reverse ? "lg:col-start-1" : ""}`}>
            <div ref={textRef} className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Section2 = () => {
  return (
    <div className="bg-black">
      {/* Section Planning */}
      <Section
        title="Planning & Ressources"
        description="Optimisez la gestion de vos équipes avec notre système de planning intelligent. Planifiez les interventions, gérez les ressources, suivez les heures de travail et coordonnez vos collaborateurs pour une efficacité maximale sur tous vos chantiers."
        reverse={true}
        isLargeOnMobile={true}
      >
        <PlanningDemo />
      </Section>

      {/* Section CRM */}
      <Section
        title="Gestion CRM"
        description="Centralisez toutes les informations de vos clients, suivez les interactions, gérez les relances, automatisez les tâches commerciales et améliorez votre relation client au quotidien. Notre système CRM intuitif vous permet de transformer vos prospects en clients fidèles."
      >
        <CRMDemo />
      </Section>

      {/* Section Congés */}
      <Section
        title="Gestion des Congés"
        description="Simplifiez la gestion des congés et absences de vos employés. Interface intuitive pour les demandes, validation automatisée, suivi des soldes et export comptable. Tout ce dont vous avez besoin pour une gestion RH efficace et transparente."
        reverse={true}
        isLargeOnMobile={true}
      >
        <DemandeCongeComplete />
      </Section>
    </div>
  );
};

export default Section2;
