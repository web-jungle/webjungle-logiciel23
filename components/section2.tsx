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
import { Spotlight } from "./ui/lihth";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Forcer le refresh de ScrollTrigger après le chargement
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}

const Card = ({
  children,
  isLargeOnMobile = false,
  customScale = null,
  mobileHeight = null,
}: {
  children: React.ReactNode;
  isLargeOnMobile?: boolean;
  customScale?: number | null;
  mobileHeight?: string | null;
}) => {
  return (
    <div
      className={`max-w-xl relative group mx-auto isolate ${
        mobileHeight
          ? `${mobileHeight} sm:h-[45rem]`
          : isLargeOnMobile
          ? "h-[40rem] sm:h-[45rem]"
          : "h-[28rem] sm:h-[32rem]"
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

      <div className="absolute h-16 sm:h-24 md:h-32 w-full bottom-0 inset-x-0 z-10 pointer-events-none bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />

      <div className="h-full w-full overflow-hidden rounded-2xl bg-transparent relative z-20 p-2 sm:p-3">
        {/* Conteneur simulant un écran avec scale optimisé pour mobile */}
        <div
          className="w-full h-full origin-top-left overflow-hidden md:scale-90"
          style={{
            // Sur mobile, pas de scale pour éviter les problèmes
            transform:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "scale(1)"
                : customScale
                ? `scale(${customScale})`
                : isLargeOnMobile
                ? "scale(0.9)"
                : "scale(0.8)",
            transformOrigin: "top left",
            width:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "100%"
                : customScale
                ? `${(1 / customScale) * 100}%`
                : isLargeOnMobile
                ? "111%"
                : "125%",
            height:
              typeof window !== "undefined" && window.innerWidth < 768
                ? "100%"
                : customScale
                ? `${(1 / customScale) * 100}%`
                : isLargeOnMobile
                ? "111%"
                : "125%",
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
  customScale = null,
  mobileHeight = null,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  reverse?: boolean;
  isLargeOnMobile?: boolean;
  icon: React.ReactNode;
  accent?: "cyan" | "green" | "purple" | "orange";
  customScale?: number | null;
  mobileHeight?: string | null;
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

    // Sur mobile, on peut avoir des problèmes avec ScrollTrigger
    // On s'assure que les éléments sont visibles par défaut
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Initialiser les éléments avec opacity 0 dès le départ pour éviter le "flash"
      gsap.set([cardRef.current, textRef.current], {
        opacity: 0,
        y: 60,
        rotationX: reverse ? -25 : 25,
        scale: 0.8,
      });

      // Initialiser les éléments de bénéfices
      const benefitElements =
        textRef.current?.querySelectorAll(".benefit-item");
      if (benefitElements && benefitElements.length > 0) {
        gsap.set(benefitElements, {
          opacity: 0,
          x: reverse ? -20 : 20,
        });
      }

      // Animation mobile sophistiquée avec Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              // Animation d'entrée séquencée pour mobile
              const tl = gsap.timeline();

              // Animation de la card avec rotation et scale
              tl.fromTo(
                cardRef.current,
                {
                  opacity: 0,
                  y: 60,
                  rotationX: reverse ? -25 : 25,
                  scale: 0.8,
                },
                {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  scale: 1,
                  duration: 1,
                  ease: "power3.out",
                }
              );

              // Animation du texte avec slide et fade
              tl.fromTo(
                textRef.current,
                {
                  opacity: 0,
                  x: reverse ? -50 : 50,
                  y: 30,
                  scale: 0.9,
                },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                },
                "-=0.5"
              );

              // Animation des éléments intérieurs avec stagger
              const benefitElements =
                textRef.current?.querySelectorAll(".benefit-item");
              if (benefitElements && benefitElements.length > 0) {
                tl.fromTo(
                  benefitElements,
                  {
                    opacity: 0,
                    x: reverse ? -20 : 20,
                  },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    stagger: 0.1,
                  },
                  "-=0.3"
                );
              }

              // Déconnexion après animation
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: [0.1, 0.3, 0.5],
          rootMargin: "-10% 0px -10% 0px",
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      // Cleanup
      return () => observer.disconnect();
    } else {
      // Sur desktop, on garde les animations avec ScrollTrigger
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
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
              markers: false, // Pour debug
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
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse",
              markers: false, // Pour debug
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [reverse]);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-24 px-3 sm:px-4 relative overflow-hidden"
      style={{ willChange: "scroll-position" }}
    >
      {/* Background gradient subtil */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentColors[accent].bg} opacity-30`}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Card */}
          <div
            className={`${
              reverse ? "lg:col-start-2" : ""
            } order-1 lg:order-none`}
          >
            <div ref={cardRef} className="relative opacity-100">
              <Card
                isLargeOnMobile={isLargeOnMobile}
                customScale={customScale}
                mobileHeight={mobileHeight}
              >
                {children}
              </Card>
            </div>
          </div>

          {/* Texte amélioré */}
          <div
            className={`${
              reverse ? "lg:col-start-1" : ""
            } relative order-2 lg:order-none`}
          >
            <div
              ref={textRef}
              className={`p-4 sm:p-6 md:p-8 rounded-2xl border ${accentColors[accent].border} bg-gradient-to-br ${accentColors[accent].bg} backdrop-blur-sm shadow-2xl ${accentColors[accent].glow} opacity-100`}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Icon et badge */}
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <FeatureIconContainer className="flex justify-center items-center">
                    {icon}
                  </FeatureIconContainer>
                </div>

                {/* Titre avec gradient */}
                <Heading
                  as="h2"
                  size="md"
                  className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight text-xl sm:text-2xl md:text-3xl"
                >
                  <Balancer>{title}</Balancer>
                </Heading>

                {/* Description */}
                <Subheading className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  <Balancer>{description}</Balancer>
                </Subheading>

                {/* Liste des bénéfices */}
                <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
                  <div className="benefit-item flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                    <ArrowRight
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${accentColors[accent].text} flex-shrink-0`}
                    />
                    <span>Interface intuitive et moderne</span>
                  </div>
                  <div className="benefit-item flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                    <ArrowRight
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${accentColors[accent].text} flex-shrink-0`}
                    />
                    <span>Automatisation intelligente</span>
                  </div>
                  <div className="benefit-item flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                    <ArrowRight
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${accentColors[accent].text} flex-shrink-0`}
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
  // Vérifier si on est sur mobile au chargement
  useEffect(() => {
    // Forcer un refresh de ScrollTrigger après montage du composant
    if (typeof window !== "undefined" && ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, []);

  return (
    <div
      className="relative bg-black overflow-hidden"
      style={{ minHeight: "300vh" }}
    >
      <Spotlight contained={true} />
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
        customScale={0.6}
        mobileHeight="h-[50rem]"
      >
        <DemandeCongeComplete />
      </Section>
    </div>
  );
};

export default Section2;
