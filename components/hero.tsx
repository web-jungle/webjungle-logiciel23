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

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useLayoutEffect(() => {
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
      !cardSectionRef.current ||
      isMobile === undefined
    )
      return;

    // Configuration de la perspective 3D optimisée pour un rendu Framer Motion
    gsap.set(cardRef.current, {
      transformPerspective: 1000,
      transformOrigin: "center center",
      force3D: true,
      willChange: "transform",
    });

    // État initial des éléments avec des valeurs optimisées
    gsap.set(
      [
        titleRef.current,
        descriptionRef.current,
        buttonRef.current,
        cardSectionRef.current,
      ],
      {
        opacity: 0,
        force3D: true,
      }
    );

    gsap.set(titleRef.current, { y: 0 });
    gsap.set([descriptionRef.current, buttonRef.current], { y: 10 });
    gsap.set(cardSectionRef.current, { y: 20 });

    // Configuration initiale de la carte avec perspective
    gsap.set(cardRef.current, {
      rotationX: isMobile ? 12 : 20,
      scale: isMobile ? 0.8 : 1.0,
      z: 0,
    });

    // Timeline pour les animations d'entrée avec courbes d'easing type Framer Motion
    const tl = gsap.timeline();

    // Animation du titre (courbe d'easing Framer Motion)
    tl.to(
      titleRef.current,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      0.2
    );

    // Animation de la description
    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.4
    );

    // Animation du bouton
    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.6
    );

    // Animation de la carte avec effet de perspective fluide
    tl.to(
      cardSectionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0.8
    );

    // ScrollTrigger pour les animations de perspective au scroll
    const scrollAnimation = () => {
      // Paramètres optimisés pour un effet de relèvement naturel
      const rotateRange = isMobile ? [12, 0] : [20, 0];
      const scaleRange = isMobile ? [0.8, 0.95] : [1.0, 1.15];
      const titleTranslateRange = isMobile ? [0, -25] : [0, -60];
      const cardTranslateRange = isMobile ? [0, 30] : [0, 80];

      // Paramètres pour la profondeur (Z) seulement
      const zRange = [0, isMobile ? 30 : 50];

      // Animation principale de la carte - effet de relèvement simple
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Scrub plus direct pour un effet naturel
        onUpdate: (self) => {
          const progress = self.progress;

          // Rotation X (effet de relèvement principal)
          const rotateXProgress = Math.min(progress / 0.5, 1);
          const currentRotateX = gsap.utils.interpolate(
            rotateRange[0],
            rotateRange[1],
            gsap.parseEase("power2.out")(rotateXProgress)
          );

          // Scale avec courbe douce
          const scaleProgress = Math.min(progress / 0.8, 1);
          const currentScale = gsap.utils.interpolate(
            scaleRange[0],
            scaleRange[1],
            gsap.parseEase("power1.inOut")(scaleProgress)
          );

          // Translation Z pour profondeur subtile
          const zProgress = Math.min(progress / 0.6, 1);
          const currentZ = gsap.utils.interpolate(
            zRange[0],
            zRange[1],
            gsap.parseEase("power2.out")(zProgress)
          );

          // Application des transformations 3D - seulement rotation X
          gsap.set(cardRef.current, {
            rotationX: currentRotateX,
            scale: currentScale,
            z: currentZ,
            force3D: true,
          });
        },
      });

      // Animation du titre avec courbe fluide
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = Math.min(self.progress / 0.6, 1);
          const currentY = gsap.utils.interpolate(
            titleTranslateRange[0],
            titleTranslateRange[1],
            gsap.parseEase("power1.out")(progress)
          );

          gsap.set(titleRef.current, {
            y: currentY,
            force3D: true,
          });
        },
      });

      // Animation de la section carte avec effet de parallax
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = Math.min(self.progress / 0.6, 1);
          const currentY = gsap.utils.interpolate(
            cardTranslateRange[0],
            cardTranslateRange[1],
            gsap.parseEase("power1.out")(progress)
          );

          gsap.set(cardSectionRef.current, {
            y: currentY,
            force3D: true,
          });
        },
      });
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
          perspective: "1200px",
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
        transformStyle: "preserve-3d",
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
