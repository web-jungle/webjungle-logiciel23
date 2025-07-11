"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import DashboardPage from "./dashboard";
import { GlowingEffect } from "./ui/glowing-effect";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
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

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1.2];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.3],
    isMobile ? [10, 0] : [20, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.8], scaleDimensions());
  const titleTranslate = useTransform(
    scrollYProgress,
    [0, 0.6],
    isMobile ? [0, -20] : [0, -50]
  );
  const cardTranslate = useTransform(
    scrollYProgress,
    [0, 0.6],
    isMobile ? [0, 20] : [0, 50]
  );
  const titleSection = (
    <div className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl text-center text-4xl font-semibold tracking-tight text-neutral-300 md:text-7xl">
      <Balancer>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            y: titleTranslate,
            scale: scale,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
            "bg-clip-text text-transparent text-4xl md:text-7xl pt-12"
          )}
        >
          Votre Entreprise est Unique Votre Logiciel aussi !
        </motion.h2>
      </Balancer>
    </div>
  );

  const descriptionSection = (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.5 }}
      className="relative z-20 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-500  sm:text-base"
    >
      Nous Créons des logiciel sur mesure pour les entreprises. <br />
      Nos solutions en mode saas s&apos;adapte parfaitement à vos besoins.{" "}
      <br />
      Tout cela moins cher que des logiciels génériques concurrents.
    </motion.p>
  );

  const buttonSection = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.7 }}
      className="mb-8 mt-6 sm:mb-10 sm:mt-8 flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-8 sm:flex-row md:mb-20"
    >
      <Button
        as={Link}
        href="/contact"
        variant="primary"
        className="w-full sm:w-60 h-12 rounded-full flex items-center justify-center"
      >
        Prenez rendez-vous
      </Button>
    </motion.div>
  );

  const cardSection = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
      ref={cardRef}
      className="relative mx-auto w-full max-w-7xl p-2 backdrop-blur-lg md:p-4"
    >
      <div
        style={{
          perspective: "1000px",
        }}
        className="rounded-[50px] relative"
      >
        <Card rotate={rotate} translate={cardTranslate} scale={scale}>
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
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 md:px-8 md:pt-40 "
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
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        translateY: translate,
        scale,
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
    </motion.div>
  );
};
