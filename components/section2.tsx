"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, UserCheck, Users } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Balancer from "react-wrap-balancer";
import { DemandeCongeComplete } from "./conge";
import CRMDemo from "./crm-demo";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { Heading } from "./heading";
import PlanningDemo from "./planing-demo";
import { Subheading } from "./subheading";
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
      className={`max-w-2xl relative group mx-auto isolate ${
        isLargeOnMobile ? "h-[35rem]" : "h-[20rem]"
      } md:h-[30rem] w-full border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden`}
      style={{ willChange: "transform" }}
    >
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        borderWidth={2}
        blur={8}
        autoRotate={false}
      />

      <div className="absolute h-32 w-full bottom-0 inset-x-0 z-10 pointer-events-none bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

      <div className="h-full w-full overflow-hidden rounded-2xl bg-transparent relative z-20 p-3">
        {/* Conteneur simulant un écran avec scale optimisé */}
        <div
          className="w-full h-full origin-top-left overflow-hidden"
          style={{
            transform: isLargeOnMobile ? "scale(0.75)" : "scale(0.6)",
            transformOrigin: "top left",
            width: isLargeOnMobile ? "133%" : "167%",
            height: isLargeOnMobile ? "133%" : "167%",
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
  icon,
  accent = "cyan",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  reverse?: boolean;
  isLargeOnMobile?: boolean;
  icon: React.ReactNode;
  accent?: "cyan" | "green" | "purple" | "orange";
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const accentColors = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "from-cyan-950/20 to-blue-950/20",
      glow: "shadow-cyan-500/20",
    },
    green: {
      text: "text-green-400",
      border: "border-green-500/20",
      bg: "from-green-950/20 to-emerald-950/20",
      glow: "shadow-green-500/20",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-500/20",
      bg: "from-purple-950/20 to-violet-950/20",
      glow: "shadow-purple-500/20",
    },
    orange: {
      text: "text-orange-400",
      border: "border-orange-500/20",
      bg: "from-orange-950/20 to-red-950/20",
      glow: "shadow-orange-500/20",
    },
  };

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Animation optimisée pour la card
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: reverse ? 60 : -60,
          rotationY: reverse ? 15 : -15,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation améliorée pour le texte
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          x: reverse ? -40 : 40,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "bottom 15%",
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
      className="w-full min-h-screen flex items-center justify-center py-16 md:py-24 px-4 relative overflow-hidden"
      style={{ willChange: "scroll-position" }}
    >
      {/* Background gradient subtil */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent].bg} opacity-30`}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Card */}
          <div className={`${reverse ? "lg:col-start-2" : ""}`}>
            <div ref={cardRef} className="relative">
              <Card isLargeOnMobile={isLargeOnMobile}>{children}</Card>
            </div>
          </div>

          {/* Texte amélioré */}
          <div className={`${reverse ? "lg:col-start-1" : ""} relative`}>
            <div
              ref={textRef}
              className={`p-8 rounded-2xl border ${accentColors[accent].border} bg-gradient-to-br ${accentColors[accent].bg} backdrop-blur-sm shadow-2xl ${accentColors[accent].glow}`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="space-y-6">
                {/* Icon et badge */}
                <div className="flex items-center gap-3 mb-4">
                  <FeatureIconContainer className="flex justify-center items-center">
                    {icon}
                  </FeatureIconContainer>
                  <span
                    className={`text-sm font-semibold ${accentColors[accent].text} uppercase tracking-wide`}
                  >
                    Solution Pro
                  </span>
                </div>

                {/* Titre avec gradient */}
                <Heading
                  as="h2"
                  size="md"
                  className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight"
                >
                  <Balancer>{title}</Balancer>
                </Heading>

                {/* Description */}
                <Subheading className="text-gray-300 leading-relaxed">
                  <Balancer>{description}</Balancer>
                </Subheading>

                {/* Liste des bénéfices */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <ArrowRight
                      className={`h-4 w-4 ${accentColors[accent].text} flex-shrink-0`}
                    />
                    <span>Interface intuitive et moderne</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <ArrowRight
                      className={`h-4 w-4 ${accentColors[accent].text} flex-shrink-0`}
                    />
                    <span>Automatisation intelligente</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <ArrowRight
                      className={`h-4 w-4 ${accentColors[accent].text} flex-shrink-0`}
                    />
                    <span>Reporting en temps réel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Section2 = () => {
  return (
    <div className="relative bg-black">
      {/* Section Planning */}
      <Section
        title="Planning & Ressources Intelligents"
        description="Optimisez la gestion de vos équipes avec notre système de planning intelligent. Planifiez les interventions, gérez les ressources humaines et matérielles, suivez les heures de travail en temps réel et coordonnez efficacement tous vos collaborateurs."
        reverse={true}
        isLargeOnMobile={true}
        icon={<Calendar className="h-6 w-6 text-cyan-500" />}
        accent="cyan"
      >
        <PlanningDemo />
      </Section>

      {/* Section CRM */}
      <Section
        title="CRM & Relation Client"
        description="Centralisez toutes les informations de vos clients dans une interface unique. Suivez chaque interaction, gérez les relances automatiquement, automatisez vos tâches commerciales et transformez vos prospects en clients fidèles grâce à notre système CRM intuitif."
        isLargeOnMobile={true}
        icon={<Users className="h-6 w-6 text-green-500" />}
        accent="green"
      >
        <CRMDemo />
      </Section>

      {/* Section Congés */}
      <Section
        title="Gestion RH & Congés"
        description="Simplifiez radicalement la gestion des congés et absences de vos employés. Interface intuitive pour les demandes, workflow de validation automatisée, suivi en temps réel des soldes et export comptable intégré. La solution complète pour une gestion RH moderne et efficace."
        reverse={true}
        isLargeOnMobile={true}
        icon={<UserCheck className="h-6 w-6 text-purple-500" />}
        accent="purple"
      >
        <DemandeCongeComplete />
      </Section>
    </div>
  );
};

export default Section2;
