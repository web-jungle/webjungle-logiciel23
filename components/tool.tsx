"use client";
import {
  IconMailForward,
  IconSocial,
  IconTerminal,
  IconTool,
} from "@tabler/icons-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useRef, useState } from "react";
import Component from "./btp";
import { DemandeCongeComplete } from "./conge";
import CRMDemo from "./crm-demo";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { Heading } from "./heading";
import PlanningDemo from "./planing-demo";
import { Subheading } from "./subheading";
import { StickyScroll } from "./ui/sticky-scroll";

export const Tools = () => {
  const content = [
    {
      icon: <IconSocial className="h-8 w-8 text-secondary" />,
      title: "Gestion RH",
      description:
        "Gérez vos employés, leurs congés, leurs salaires, leurs absences, les planning, et exportez leurs données pour votre comptabilité.",
      content: (
        <ImageContainer>
          <PlanningDemo />
        </ImageContainer>
      ),
    },
    {
      icon: <IconTerminal className="h-8 w-8 text-secondary" />,
      title: "Gestion clients , CRM",
      description:
        "Centralisez toutes les informations de vos clients, suivez les interactions, gérez les relances, automatisez les tâches commerciales et améliorez votre relation client au quotidien.",

      content: (
        <ImageContainer>
          <CRMDemo />
        </ImageContainer>
      ),
    },
    {
      icon: <IconMailForward className="h-8 w-8 text-secondary" />,
      title: "Gestion des congés et absences ",
      description:
        "Gérez vos congés et absences, suivez les demandes, gérez les autorisations, et exportez les données pour votre comptabilité.",
      content: (
        <ImageContainer>
          <DemandeCongeComplete />
        </ImageContainer>
      ),
    },

    {
      icon: <IconTerminal className="h-8 w-8 text-secondary" />,
      title: "Suivi de comptabilité",
      description:
        "Suivez votre comptabilité, gérez vos factures, vos paiements, vos impôts, et exportez vos données pour votre comptabilité.",
      content: (
        <ImageContainer>
          <Component />
        </ImageContainer>
      ),
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const backgrounds = [
    "var(--charcoal)",
    "var(--neutral-900)",
    "var(--gray-900)",
  ];

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / content.length);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });
  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      className="w-full relative h-full pt-20 md:pt-40"
    >
      <div className="px-6">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <IconTool className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="mt-4">Exemple de solutions</Heading>
        <Subheading>
          Proactiv propose des solutions pour les besoins de votre entreprise.
        </Subheading>
      </div>
      <StickyScroll content={content} />
    </motion.div>
  );
};

const ImageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg relative shadow-2xl">
      {children}
      <div className="absolute bottom-0 w-full h-px inset-x-0 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      <div className="absolute bottom-0 w-40 mx-auto h-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
};
