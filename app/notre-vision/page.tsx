"use client";
import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function NotreVisionPage() {
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
            Notre Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-20 mx-auto mt-6 max-w-3xl px-4 text-center text-lg md:text-xl text-neutral-300 leading-relaxed"
          >
            Une entreprise à taille humaine qui place l&apos;écoute et la
            proximité client au cœur de sa mission. Nous créons des solutions
            personnalisées et performantes qui s&apos;adaptent parfaitement à
            vos besoins spécifiques.
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
                  <Heart className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Humain
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    À l&apos;écoute de vos besoins
                  </p>
                </div>
                <div className="text-center">
                  <Target className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Personnalisé
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Solutions sur mesure
                  </p>
                </div>
                <div className="text-center">
                  <Lightbulb className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Performant
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Technologie de pointe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Notre Philosophie Section */}
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
              Notre Philosophie
            </Heading>
            <Subheading className="max-w-3xl mx-auto">
              Nous croyons que chaque entreprise est unique et mérite une
              solution qui lui ressemble. Notre approche privilégie
              l&apos;humain et l&apos;accompagnement personnalisé.
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
                  <Users className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Proximité Client
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Nous privilégions les relations directes et durables. Chaque
                    client bénéficie d&apos;un interlocuteur dédié qui comprend
                    ses enjeux métier et l&apos;accompagne dans sa
                    transformation digitale.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Solutions Sur Mesure
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Nous analysons en profondeur vos processus métier pour créer
                    des solutions qui s&apos;intègrent parfaitement dans votre
                    environnement et optimisent votre productivité.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Innovation Continue
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Nous restons à la pointe des technologies pour vous proposer
                    des solutions modernes, évolutives et performantes qui
                    grandissent avec votre entreprise.
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
                    Nos Engagements
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-300">
                        Écoute active et compréhension de vos besoins
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-300">
                        Développement agile et itératif
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-300">
                        Support et maintenance dédiés
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-300">
                        Formation et accompagnement utilisateur
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-neutral-300">
                        Évolution continue de votre solution
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi Nous Choisir Section */}
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
              Pourquoi Nous Choisir ?
            </Heading>
            <Subheading className="max-w-3xl mx-auto">
              Une approche différente pour des résultats exceptionnels
            </Subheading>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Approche Humaine",
                description:
                  "Des équipes passionnées qui s&apos;investissent dans votre réussite et comprennent vos défis quotidiens.",
              },
              {
                icon: Target,
                title: "Expertise Métier",
                description:
                  "Une connaissance approfondie des secteurs d&apos;activité pour des solutions parfaitement adaptées.",
              },
              {
                icon: Users,
                title: "Accompagnement Complet",
                description:
                  "De l&apos;analyse des besoins à la formation, nous vous accompagnons à chaque étape du projet.",
              },
              {
                icon: Lightbulb,
                title: "Innovation Technologique",
                description:
                  "Les dernières technologies au service de votre performance et de votre compétitivité.",
              },
              {
                icon: CheckCircle,
                title: "Qualité Garantie",
                description:
                  "Des processus rigoureux et des tests approfondis pour vous livrer des solutions fiables.",
              },
              {
                icon: ArrowRight,
                title: "Évolutivité",
                description:
                  "Des solutions conçues pour grandir avec votre entreprise et s&apos;adapter à vos évolutions.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
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
                      <item.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
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
              Prêt à Concrétiser Votre Vision ?
            </h2>
            <p className="max-w-2xl text-lg text-neutral-400 text-center mx-auto mb-8">
              Discutons de votre projet et découvrez comment notre approche
              humaine et personnalisée peut transformer votre entreprise.
            </p>
            <Button
              as={Link}
              href="/contact"
              variant="primary"
              className="h-12 px-8 rounded-full text-base font-medium inline-flex items-center gap-2 group"
            >
              Prenez Rendez-vous
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
