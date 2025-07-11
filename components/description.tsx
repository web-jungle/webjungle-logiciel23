"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Gauge,
  PiggyBank,
  Rocket,
  Shield,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "./button";
import { FeatureIconContainer } from "./features/feature-icon-container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";

// Enregistrer le plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Description() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const elements = sectionRef.current?.querySelectorAll(".fade-element");
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen max-h-screen overflow-hidden bg-black flex flex-col justify-center px-4 py-8"
      style={{ willChange: "scroll-position" }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Hero Compact */}
        <div className="text-center mb-8 fade-element">
          <FeatureIconContainer className="flex justify-center items-center mb-3">
            <CreditCard className="h-6 w-6 text-cyan-500" />
          </FeatureIconContainer>

          <Heading
            className="bg-gradient-to-b from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent mb-3"
            size="md"
          >
            Logiciels Sur Mesure pour Pros
          </Heading>

          <Subheading className="max-w-2xl mx-auto text-gray-300 text-base">
            <Balancer>
              Solutions 100% adaptées à votre métier. Livraison rapide, prix
              fixe, sans abonnement.
            </Balancer>
          </Subheading>
        </div>

        {/* Avantages Ultra Compacts */}
        <div className="mb-8 fade-element">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-cyan-500" />
              <span className="text-cyan-400 font-semibold text-sm">
                Pourquoi Nous Choisir
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <Rocket className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Livraison Express
                </h3>
                <p className="text-gray-400">
                  Vos logiciels livrés en{" "}
                  <strong className="text-green-400">2-8 semaines</strong> vs
                  des mois avec les autres.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <PiggyBank className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">Prix Fixe</h3>
                <p className="text-gray-400">
                  <strong className="text-yellow-400">Zéro abonnement</strong>.
                  Un paiement unique, le logiciel est à vous à vie.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <Gauge className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Performance 10x
                </h3>
                <p className="text-gray-400">
                  Code optimisé pour{" "}
                  <strong className="text-purple-400">
                    vos besoins précis
                  </strong>
                  , pas de fonctions inutiles.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm mt-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">Sécurité FR</h3>
                <p className="text-gray-400">
                  Vos données restent chez vous.{" "}
                  <strong className="text-blue-400">RGPD natif</strong>,
                  hébergement français.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">
                  100% Sur Mesure
                </h3>
                <p className="text-gray-400">
                  Adapté à{" "}
                  <strong className="text-green-400">VOS processus</strong>, pas
                  l&apos;inverse. Zéro compromis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-neutral-950/50 border border-neutral-800">
              <Target className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold mb-1">Évolutif</h3>
                <p className="text-gray-400">
                  Votre entreprise grandit ?{" "}
                  <strong className="text-cyan-400">Vos outils aussi</strong>,
                  facilement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Compact */}
        <div className="text-center fade-element">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            <Balancer>Prêt à Booster Votre Activité ?</Balancer>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            <Balancer>
              <strong className="text-white">Audit gratuit 30min</strong> pour
              découvrir combien vous pourriez économiser avec du sur mesure.
            </Balancer>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <Button
              as={Link}
              href="/contact"
              variant="primary"
              className="w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-full flex items-center gap-2"
            >
              Audit Gratuit
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href="tel:+33123456789"
              variant="secondary"
              className="w-full sm:w-auto px-6 py-3 text-base rounded-full"
            >
              Appeler Maintenant
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>Devis 24h</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>ROI garanti</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
