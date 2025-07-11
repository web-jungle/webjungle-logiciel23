"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  animate,
  AnimatePresence,
  motion,
  stagger,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";
import { BsStarFill } from "react-icons/bs";
import { Button } from "./button";

export function SimpleCTAWithImages() {
  return (
    <div className="mx-auto relative  flex w-full max-w-7xl flex-col items-center justify-between px-4 py-20 md:flex-row md:px-8">
      <div className="flex flex-col">
        <motion.h2 className="mx-auto max-w-xl text-center text-xl font-bold text-neutral-300  md:mx-0 md:text-left md:text-5xl dark:text-white">
          Prêt à optimiser votre entreprise ?
        </motion.h2>
        <p className="mx-auto mt-8 max-w-md text-center text-sm text-neutral-400 md:mx-0 md:text-left md:text-base dark:text-neutral-400">
          emander un rendez-vous de 30 minutes avec un expert pour discuter de
          votre projet. C&apos;est gratuit et sans engagement.
        </p>
        <FeaturedImages
          textClassName="lg:text-left text-center"
          className="items-center justify-start lg:justify-start"
          containerClassName="md:items-start"
          showStars
        />
      </div>

      <Button
        href="/contact"
        className="h-10 md:h-12 lg:h-16 w-32 md:w-40 lg:w-48 rounded-full text-xs sm:text-sm md:text-base font-medium"
      >
        Demander un rendez-vous
      </Button>
    </div>
  );
}

export const FeaturedImages = ({
  textClassName,
  className,
  showStars = false,
  containerClassName,
}: {
  textClassName?: string;
  className?: string;
  showStars?: boolean;
  containerClassName?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    animate(
      ".animation-container",
      { scale: [1.1, 1, 0.9, 1], opacity: [0, 1] },
      { duration: 0.4, delay: stagger(0.1) }
    );
  }, []);
  return (
    <div
      className={cn(
        "mb-10 mt-10 flex flex-col items-center",
        containerClassName
      )}
    >
      <div
        className={cn(
          "mb-2 flex flex-col items-center justify-center sm:flex-row",
          className
        )}
      >
        <div className="mb-4 flex flex-row items-center sm:mb-0">
          {testimonials.map((testimonial, idx) => (
            <div
              className="group relative -mr-4"
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 160,
                        damping: 20,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,

                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-xs shadow-xl"
                  >
                    <div className="absolute inset-x-0 -bottom-px z-30 mx-auto h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                    <div className="absolute inset-x-0 -bottom-px z-30 mx-auto h-px w-[70%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                    <div className="flex items-center gap-2">
                      <div className="relative z-30 text-sm font-bold text-white">
                        {testimonial.name}
                      </div>
                      <div className="rounded-sm bg-neutral-950 px-1 py-0.5 text-xs text-neutral-300">
                        {testimonial.designation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="animation-container">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    rotate: `${Math.random() * 15 - 5}deg`,
                    scale: 1,
                    opacity: 1,
                  }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  transition={{ duration: 0.2 }}
                  className="relative overflow-hidden rounded-2xl border-2 border-neutral-200"
                >
                  <Image
                    onMouseMove={handleMouseMove}
                    height={100}
                    width={100}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 object-cover object-top"
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        <div className="ml-6 flex justify-center">
          {[...Array(5)].map((_, index) => (
            <BsStarFill
              key={index}
              className={showStars ? "mx-1 h-4 w-4 text-yellow-400" : "hidden"}
            />
          ))}
        </div>
      </div>
      <p
        className={cn(
          "relative z-40 text-left text-sm text-neutral-400",
          textClassName
        )}
      ></p>
    </div>
  );
};

const testimonials = [
  {
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
