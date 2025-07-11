"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect } from "react";
import { Button } from "./button";

const BackgroundGrid = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(circle at center, rgba(40,40,40,0.8) 0%, rgba(20,20,20,0.6) 30%, rgba(0,0,0,0.4) 70%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        />
      </motion.div>
    </div>
  );
};

const LineGradient = ({ position }: { position: "left" | "right" }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        pathLength: 1,
        opacity: 1,
        transition: { duration: 1.5, ease: "easeInOut" },
      });
    }
  }, [controls, inView]);

  const path =
    position === "left"
      ? "M1 0.23938V207.654L88 285.695C88 285.695 87.5 493.945 88 567.813"
      : "M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813";

  return (
    <svg
      ref={ref}
      className={`absolute hidden lg:block ${position}-0 h-full`}
      xmlns="http://www.w3.org/2000/svg"
      width="89"
      height="568"
      viewBox="0 0 89 568"
      fill="none"
    >
      <motion.path
        d={path}
        stroke={`url(#animation_gradient)`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
      />
      <motion.path d={path} stroke={`url(#paint0_linear_${position})`} />
      <defs>
        <motion.linearGradient
          id="animation_gradient"
          initial={{
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
          }}
          animate={{
            x1: 0,
            y1: "120%",
            x2: 0,
            y2: "100%",
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#2EB9DF" />
          <stop offset="1" stopColor="#9E00FF" stopOpacity="0" />
        </motion.linearGradient>
        <linearGradient
          id={`paint0_linear_${position}`}
          x1={position === "left" ? "1" : "88"}
          y1="4.50012"
          x2={position === "left" ? "1" : "88"}
          y2="568"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6F6F6F" stopOpacity="0.3" />
          <stop offset="0.797799" stopColor="#6F6F6F" />
          <stop offset="1" stopColor="#6F6F6F" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function CTA() {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });
    }
  }, [controls, inView]);

  return (
    <div className="bg-black w-full max-w-7xl mx-auto min-h-[80vh] md:min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      <LineGradient position="left" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="w-full max-w-4xl mx-auto text-center py-8 md:py-12 lg:py-20 pb-16 md:pb-32 lg:pb-48 relative z-10"
      >
        <div className="relative z-20">
          <h2
            className={cn(
              "inline-block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold",
              "bg-gradient-to-b from-[#3B3B3B] via-[#FFFFFF] to-[#3B3B3B]",
              "bg-clip-text text-transparent",
              "px-4 md:px-8"
            )}
          >
            Prêt à optimiser votre entreprise ?
          </h2>
          <p className="max-w-lg text-xs sm:text-sm md:text-base text-neutral-400 text-center mx-auto my-4 md:my-6 lg:my-8 px-4">
            Demander un rendez-vous de 30 minutes avec un expert pour discuter
            de votre projet. C&apos;est gratuit et sans engagement.
          </p>
        </div>
        <BackgroundGrid className="mt-8 md:mt-16 lg:mt-36 z-0" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-20"
        >
          <Button
            href="/contact"
            className="h-10 md:h-12 lg:h-16 w-32 md:w-40 lg:w-48 rounded-full text-xs sm:text-sm md:text-base font-medium"
          >
            Demander un rendez-vous
          </Button>
        </motion.div>
      </motion.div>
      <LineGradient position="right" />
    </div>
  );
}
