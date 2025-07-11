"use client";
import { cn } from "@/lib/utils";
import { IconCheck, IconX } from "@tabler/icons-react";
import React from "react";
import { Button } from "./button";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export enum planType {
  basic = "basic",
  lifetime = "lifetime",
  yearly = "yearly",
}

export type Plan = {
  id: string;
  name: string;
  shortDescription: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: {
    text: string;
    included: boolean;
  }[];
  buttonText: string;
  subText?: string | React.ReactNode;
  onClick: () => void;
};

export function PricingComponent() {
  const router = useRouter();

  const plans: Array<Plan> = [
    {
      id: planType.basic,
      name: "Un seul paiement pas d'abonnement",
      shortDescription: "Try For Free",
      badge: "Tout inclus",
      price: 850,
      period: "A Partir",
      features: [
        { text: "Etude de vos besoins", included: true },
        { text: "Devis gratuit", included: true },
        { text: "Création de votre logiciel", included: true },
        { text: "Support et maintenance", included: true },
        { text: "Mise en production", included: true },
      ],
      buttonText: "Demandez votre devis",
      subText: "",
      onClick: () => {
        router.push("/contact");
      },
    },
  ];

  // Mobile Card Component
  const MobileCard = ({ plan }: { plan: Plan }) => {
    return (
      <motion.div
        className="mb-4 last:mb-0"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gray-900/50 border border-gray-800 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-gray-800/50">
          {plan.badge && (
            <div className="text-center -mt-8 mb-4">
              <span className="text-white text-xs px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700">
                {plan.badge}
              </span>
            </div>
          )}

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">{plan.name}</h3>
              <p className="text-xs text-gray-400 mt-1">
                {plan.shortDescription}
              </p>
            </div>
            <div className="text-right">
              {plan.originalPrice && (
                <div className="text-xs text-gray-500 line-through">
                  €{plan.originalPrice}
                </div>
              )}
              <div className="text-xl font-bold text-white">€{plan.price}</div>
              <div className="text-xs text-gray-400">{plan.period}</div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {feature.included ? (
                  <IconCheck className="h-4 w-4 text-green-400" />
                ) : (
                  <IconX className="h-4 w-4 text-gray-600" />
                )}
                <span
                  className={cn(
                    "text-xs",
                    feature.included ? "text-gray-300" : "text-gray-500"
                  )}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={plan.onClick}
            className="w-full py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
          >
            {plan.buttonText}
          </Button>

          {plan.subText && (
            <p className="text-xs text-gray-500 text-center mt-2">
              {plan.subText}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  // Desktop Card Component
  const DesktopCard = ({ plan }: { plan: Plan }) => {
    return (
      <motion.div
        className={cn(
          "rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-gray-800/50 hover:border-gray-700",
          plan.badge && "ring-1 ring-blue-500/20"
        )}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {plan.badge && (
          <div className="text-center -mt-12 mb-6">
            <span className="text-white text-sm px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
              {plan.badge}
            </span>
          </div>
        )}

        <div className="flex flex-col h-full">
          <div className="mb-8">
            <div className="inline-flex items-center font-bold justify-center p-3 rounded-lg border border-gray-700 bg-gray-800/30 backdrop-blur-sm">
              <h3 className="text-sm text-white">{plan.name}</h3>
            </div>

            <div className="mt-4">
              <p className="text-md text-gray-400">{plan.shortDescription}</p>
            </div>

            <div className="mt-6">
              {plan.originalPrice && (
                <span className="text-gray-500 line-through mr-2 text-lg">
                  €{plan.originalPrice}
                </span>
              )}
              <span className="text-5xl font-bold text-white">
                €{plan.price}
              </span>
              <span className="text-gray-400 ml-2 text-lg">{plan.period}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {plan.features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {feature.included ? (
                  <IconCheck className="h-5 w-5 text-green-400" />
                ) : (
                  <IconX className="h-5 w-5 text-gray-600" />
                )}
                <span
                  className={cn(
                    "text-sm",
                    feature.included ? "text-gray-300" : "text-gray-500"
                  )}
                >
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto">
            <Button
              onClick={plan.onClick}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              {plan.buttonText}
            </Button>
            {plan.subText && (
              <div className="text-sm text-gray-500 text-center mt-4">
                {plan.subText}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <div className="w-full px-4 py-4">
        <div className="max-w-md mx-auto">
          {plans.map((tier) => (
            <MobileCard plan={tier} key={tier.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div
        className={cn(
          "max-w-7xl mx-auto gap-8",
          plans.length === 1
            ? "flex justify-center"
            : "grid grid-cols-1 md:grid-cols-3"
        )}
      >
        {plans.map((tier) => (
          <div key={tier.id} className={plans.length === 1 ? "max-w-sm" : ""}>
            <DesktopCard plan={tier} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <div
      id="pricing"
      className="relative w-full overflow-hidden bg-black/[0.96] antialiased"
    >
      {/* Background avec grille de points */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Gradient radial central */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.03) 40%, transparent 70%)`,
          }}
        />
      </div>

      {/* Gradients d'accent sur les côtés */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-1/3 h-full opacity-20"
          style={{
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-20"
          style={{
            background: `linear-gradient(225deg, rgba(59, 130, 246, 0.08) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-20 px-4 py-16 md:py-40 pt-10 md:pt-60 lg:px-4">
        <motion.div
          className="relative z-50 mx-auto mb-4 max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className={cn(
              "inline-block text-3xl md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] ",
              "bg-clip-text text-transparent"
            )}
          >
            Un seul paiement ...
          </h2>
        </motion.div>

        <motion.p
          className="text-xl text-gray-400 mt-4 px-4 max-w-lg text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Pas d&apos;abonnement pas de frais caché !
        </motion.p>

        <motion.div
          className="mx-auto mt-12 md:mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <PricingComponent />
        </motion.div>
      </div>
    </div>
  );
}
