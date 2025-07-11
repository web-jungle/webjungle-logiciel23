"use client";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle,
  Cloud,
  Code,
  Database,
  FileText,
  Heart,
  Lightbulb,
  PieChart,
  Settings,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function NosSolutionsPage() {
  return (
    <div className="relative w-full overflow-hidden rounded-md bg-black/[0.96] antialiased">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-20 md:px-8 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mx-auto mb-8 max-w-4xl text-center"
        >
          <motion.h1
            className={cn(
              "inline-block bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
              "bg-clip-text text-transparent text-4xl md:text-7xl font-bold mb-6"
            )}
          >
            Nos Solutions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 mx-auto mt-6 max-w-3xl px-4 text-center text-lg md:text-xl text-neutral-300 leading-relaxed"
          >
            Des logiciels sur mesure en mode SaaS pour digitaliser et optimiser
            tous les aspects de votre entreprise. De la gestion RH à la
            comptabilité, nous créons les outils parfaitement adaptés à vos
            besoins.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mt-12"
        >
          <div className="relative p-1 rounded-3xl">
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              borderWidth={2}
              blur={8}
            />
            <div className="relative bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Cloud className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    SaaS
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Accessible partout, tout le temps
                  </p>
                </div>
                <div className="text-center">
                  <Code className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sur Mesure
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Adapté à vos processus
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Performant
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Technologies modernes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Solutions Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Heading size="xl" className="mb-6">
              Nos Domaines d&apos;Expertise
            </Heading>
            <Subheading className="max-w-3xl mx-auto">
              Nous développons des solutions complètes pour tous les aspects de
              votre entreprise, de la gestion des ressources humaines à
              l&apos;analyse financière.
            </Subheading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Gestion RH Complete",
                description:
                  "Gestion des employés, planning d'affectation, suivi des compétences, évaluations et tableaux de bord RH en temps réel.",
                features: [
                  "Base de données employés",
                  "Planning d'affectation",
                  "Suivi des compétences",
                  "Évaluations & formations",
                ],
              },
              {
                icon: Calendar,
                title: "Congés & RTT",
                description:
                  "Système complet de gestion des congés, RTT, absences maladie avec validation hiérarchique et export comptable automatisé.",
                features: [
                  "Demandes en ligne",
                  "Validation automatisée",
                  "Suivi des soldes",
                  "Export comptable",
                ],
              },
              {
                icon: Target,
                title: "CRM & Clients",
                description:
                  "Centralisation client, suivi commercial, relances automatiques, historique des interactions et pilotage des ventes.",
                features: [
                  "Base client centralisée",
                  "Suivi commercial",
                  "Relances automatiques",
                  "Reporting ventes",
                ],
              },
              {
                icon: Calculator,
                title: "Gestion Comptable",
                description:
                  "Facturation, suivi des paiements, gestion de trésorerie, rapprochements bancaires et exports pour votre expert-comptable.",
                features: [
                  "Facturation automatisée",
                  "Suivi paiements",
                  "Gestion trésorerie",
                  "Export comptable",
                ],
              },
              {
                icon: PieChart,
                title: "Analyse & Reporting",
                description:
                  "Tableaux de bord personnalisés, KPI métier, analyses prédictives et reporting automatisé pour un pilotage optimal.",
                features: [
                  "Tableaux de bord",
                  "KPI personnalisés",
                  "Analyses prédictives",
                  "Reporting automatisé",
                ],
              },
              {
                icon: Database,
                title: "Intégration & API",
                description:
                  "Connexion avec vos outils existants, synchronisation des données, API REST et webhooks pour une écosystème unifié.",
                features: [
                  "API REST complète",
                  "Synchronisation données",
                  "Webhooks en temps réel",
                  "Connecteurs sur mesure",
                ],
              },
            ].map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative p-6 bg-gradient-to-br from-neutral-900/80 to-black/80 rounded-xl border border-neutral-800 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors duration-300">
                      <solution.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm mb-4">
                      {solution.description}
                    </p>
                    <div className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                          <span className="text-neutral-300 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages SaaS Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-transparent to-neutral-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Heading size="xl" className="mb-6">
              Pourquoi Choisir le SaaS ?
            </Heading>
            <Subheading className="max-w-3xl mx-auto">
              Le mode SaaS offre flexibilité, sécurité et évolutivité pour vos
              solutions métier
            </Subheading>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Cloud className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Accessible Partout
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Travaillez depuis n&apos;importe où avec une simple
                    connexion internet. Vos données sont disponibles 24h/24,
                    7j/7 depuis tous vos appareils.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Maintenance Simplifiée
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Mises à jour automatiques, maintenance préventive et support
                    technique inclus. Concentrez-vous sur votre métier, nous
                    nous occupons de la technique.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Évolutivité Garantie
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Votre solution grandit avec votre entreprise. Ajout de
                    fonctionnalités, augmentation de capacité et nouveaux
                    modules en fonction de vos besoins.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative p-8 bg-gradient-to-br from-neutral-900/50 to-black/50 rounded-2xl border border-neutral-800">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl" />
                <div className="relative">
                  <h4 className="text-2xl font-bold text-white mb-6">
                    Technologies Modernes
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <Smartphone className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <span className="text-neutral-300 text-sm font-medium">
                        Responsive
                      </span>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <Database className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <span className="text-neutral-300 text-sm font-medium">
                        Sécurisé
                      </span>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <span className="text-neutral-300 text-sm font-medium">
                        Rapide
                      </span>
                    </div>
                    <div className="text-center p-4 bg-neutral-800/50 rounded-lg">
                      <Heart className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                      <span className="text-neutral-300 text-sm font-medium">
                        Intuitif
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Processus de Développement Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Heading size="xl" className="mb-6">
              Notre Processus de Développement
            </Heading>
            <Subheading className="max-w-3xl mx-auto">
              Une méthodologie éprouvée pour créer votre solution sur mesure
            </Subheading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                icon: Users,
                title: "Analyse des Besoins",
                description:
                  "Étude approfondie de vos processus métier et définition des spécifications fonctionnelles.",
              },
              {
                step: "02",
                icon: Code,
                title: "Conception & Design",
                description:
                  "Maquettage UX/UI et architecture technique adaptée à vos contraintes et objectifs.",
              },
              {
                step: "03",
                icon: Settings,
                title: "Développement Agile",
                description:
                  "Développement itératif avec validation continue et ajustements en temps réel.",
              },
              {
                step: "04",
                icon: Lightbulb,
                title: "Déploiement & Formation",
                description:
                  "Mise en production, formation des utilisateurs et accompagnement au changement.",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 mb-6">
                  <span className="text-2xl font-bold text-cyan-400">
                    {process.step}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mx-auto">
                    <process.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {process.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {process.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              className={cn(
                "inline-block text-3xl md:text-5xl font-bold mb-6",
                "bg-gradient-to-b from-[#3B3B3B] via-[#FFFFFF] to-[#3B3B3B]",
                "bg-clip-text text-transparent"
              )}
            >
              Prêt à Digitaliser Votre Entreprise ?
            </h2>
            <p className="max-w-2xl text-lg text-neutral-400 text-center mx-auto mb-8">
              Discutons de votre projet et découvrez comment nos solutions SaaS
              sur mesure peuvent transformer votre façon de travailler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/contact"
                variant="primary"
                className="h-12 px-8 rounded-full text-base font-medium inline-flex items-center gap-2 group"
              >
                Demander une Démo
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                as={Link}
                href="/notre-vision"
                variant="secondary"
                className="h-12 px-8 rounded-full text-base font-medium inline-flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                En Savoir Plus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
