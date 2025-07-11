"use client";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import DashboardPage from "./dashboard";
import { GlowingEffect } from "./ui/glowing-effect";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (
      !containerRef.current ||
      !cardRef.current ||
      !titleRef.current ||
      !descriptionRef.current ||
      !buttonRef.current ||
      !cardSectionRef.current
    )
      return;

    // État initial des éléments
    gsap.set(
      [
        titleRef.current,
        descriptionRef.current,
        buttonRef.current,
        cardSectionRef.current,
      ],
      {
        opacity: 0,
      }
    );

    gsap.set(titleRef.current, { y: 0 });
    gsap.set([descriptionRef.current, buttonRef.current], { y: 10 });
    gsap.set(cardSectionRef.current, { y: 20 });

    // Timeline pour les animations d'entrée
    const tl = gsap.timeline();

    // Animation du titre (équivalent à delay: 0.2, duration: 0.5)
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      0.2
    );

    // Animation de la description (équivalent à delay: 0.5, duration: 0.2)
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      0.5
    );

    // Animation du bouton (équivalent à delay: 0.7, duration: 0.2)
    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      0.7
    );

    // Animation de la carte (équivalent à delay: 0.9, duration: 0.4)
    tl.to(
      cardSectionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.9
    );

    // ScrollTrigger pour les animations liées au scroll
    const scrollAnimation = () => {
      const rotateRange = isMobile ? [10, 0] : [20, 0];
      const scaleRange = isMobile ? [0.7, 0.9] : [1.05, 1.2];
      const titleTranslateRange = isMobile ? [0, -20] : [0, -50];
      const cardTranslateRange = isMobile ? [0, 20] : [0, 50];

      // Animation de rotation et translation de la carte
      gsap.fromTo(
        cardRef.current,
        {
          rotationX: rotateRange[0],
          scale: scaleRange[0],
        },
        {
          rotationX: rotateRange[1],
          scale: scaleRange[1],
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              // Animation personnalisée basée sur le progress du scroll
              const progress = self.progress;

              // Rotation (0 à 30% du scroll)
              const rotateProgress = Math.min(progress / 0.3, 1);
              const currentRotate = gsap.utils.interpolate(
                rotateRange[0],
                rotateRange[1],
                rotateProgress
              );

              // Scale (0 à 80% du scroll)
              const scaleProgress = Math.min(progress / 0.8, 1);
              const currentScale = gsap.utils.interpolate(
                scaleRange[0],
                scaleRange[1],
                scaleProgress
              );

              gsap.set(cardRef.current, {
                rotationX: currentRotate,
                scale: currentScale,
              });
            },
          },
        }
      );

      // Animation du titre avec le scroll
      gsap.fromTo(
        titleRef.current,
        {
          y: titleTranslateRange[0],
        },
        {
          y: titleTranslateRange[1],
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              // Translation du titre (0 à 60% du scroll)
              const progress = Math.min(self.progress / 0.6, 1);
              const currentY = gsap.utils.interpolate(
                titleTranslateRange[0],
                titleTranslateRange[1],
                progress
              );

              gsap.set(titleRef.current, {
                y: currentY,
              });
            },
          },
        }
      );

      // Animation de translation de la carte avec le scroll
      gsap.fromTo(
        cardSectionRef.current,
        {
          y: cardTranslateRange[0],
        },
        {
          y: cardTranslateRange[1],
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              // Translation de la carte (0 à 60% du scroll)
              const progress = Math.min(self.progress / 0.6, 1);
              const currentY = gsap.utils.interpolate(
                cardTranslateRange[0],
                cardTranslateRange[1],
                progress
              );

              gsap.set(cardSectionRef.current, {
                y: currentY,
              });
            },
          },
        }
      );
    };

    scrollAnimation();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, [isMobile]);

  const titleSection = (
    <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-4xl font-semibold tracking-tight text-neutral-300 md:text-7xl">
      <Balancer>
        <h2
          ref={titleRef}
          style={{
            willChange: "transform, opacity",
          }}
          className={cn(
            "inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
            "bg-clip-text text-transparent text-4xl md:text-7xl pt-12"
          )}
        >
          Votre Entreprise est Unique Votre Logiciel aussi !
        </h2>
      </Balancer>
    </div>
  );

  const descriptionSection = (
    <p
      ref={descriptionRef}
      style={{ willChange: "transform, opacity" }}
      className="relative z-20 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-500  sm:text-base"
    >
      Nous Créons des logiciel sur mesure pour les entreprises. <br />
      Nos solutions en mode saas s&apos;adapte parfaitement à vos besoins.{" "}
      <br />
      Tout cela moins cher que des logiciels génériques concurrents.
    </p>
  );

  const buttonSection = (
    <div
      ref={buttonRef}
      style={{ willChange: "transform, opacity" }}
      className="mb-8 mt-6 sm:mb-10 sm:mt-8 flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-8 sm:flex-row md:mb-20"
    >
      <Button
        as={Link}
        href="#formulaire-creation"
        variant="primary"
        className="w-full sm:w-60 h-12 rounded-full flex items-center justify-center"
      >
        Créer mon logiciel
      </Button>
      <Button
        as={Link}
        href="/contact"
        variant="secondary"
        className="w-full sm:w-60 h-12 rounded-full flex items-center justify-center"
      >
        Prenez rendez-vous
      </Button>
    </div>
  );

  const cardSection = (
    <div
      ref={cardSectionRef}
      style={{ willChange: "transform, opacity" }}
      className="relative mx-auto w-full max-w-7xl p-2 backdrop-blur-lg md:p-4"
    >
      <div
        style={{
          perspective: "1000px",
          willChange: "transform",
        }}
        className="rounded-[50px] relative"
      >
        <Card cardRef={cardRef}>
          <GlowingEffect
            spread={999}
            glow={true}
            disabled={false}
            borderWidth={16}
            blur={10}
          />

          <DashboardPage />
        </Card>
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{
            background:
              "linear-gradient(179.87deg, rgba(0, 0, 0, 0) 0.11%, rgba(0, 0, 0, 0.8) 69.48%, #000000 92.79%)",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 md:px-8 md:pt-40 mb-16 md:mb-20"
      style={{
        willChange: "scroll-position",
      }}
    >
      {titleSection}

      {/* Affichage conditionnel selon mobile/desktop */}
      {isMobile ? (
        <>
          {cardSection}
          {descriptionSection}
          {buttonSection}
        </>
      ) : (
        <>
          {descriptionSection}
          {buttonSection}
          {cardSection}
        </>
      )}
    </div>
  );
}

export const Card = ({
  cardRef,
  children,
}: {
  cardRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) => {
  return (
    <div
      ref={cardRef}
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-6xl z-40 group -mt-12 mx-auto isolate group h-[35rem] md:h-[50rem] w-full border-4 border-neutral-900 p-2 md:p-2 bg-charcoal rounded-[30px] shadow-2xl relative"
    >
      <div className="absolute h-40 w-full bottom-0 md:-bottom-10 inset-x-0 scale-[1.2] z-20 pointer-events-none bg-charcoal [mask-image:linear-gradient(to_top,white_30%,transparent)]" />
      <div className="absolute inset-0 z-20  bg-transparent group-hover:bg-black/0 transition-all duration-200 flex items-center justify-center"></div>
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-transparent md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </div>
  );
};
