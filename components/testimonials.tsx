"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

export function Testimonials() {
  return (
    <div className="w-full max-w-7xl mx-auto my-20 py-20 px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Title Section - 40% */}
        <div className="w-full lg:w-[40%]">
          <div className="sticky top-20">
            <h2
              className={cn(
                "text-3xl text-center lg:text-left md:text-6xl bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)] ",
                "bg-clip-text text-transparent leading-tight"
              )}
            >
              Ce qu&apos;ils disent <br />
              de nous
            </h2>
            <p className="text-sm text-center lg:text-left mx-auto lg:mx-0 text-neutral-400 mt-6 max-w-sm">
              Nous sommes une équipe de passionnés qui créent des logiciels sur
              mesure pour les entreprises. Nous sommes fiers de notre travail et
              de nos clients.
            </p>
          </div>
        </div>

        {/* Right Testimonials Section - 60% */}
        <div className="w-full grid gap-8 grid-cols-1 lg:grid-cols-2 md:w-[60%] mx-auto">
          <TestimonialCard
            name="Guillaume"
            role="Co-fondateur de Frame"
            image="/manu_arora.jpg"
            quote="J'utilisais Trello , il n'était pas  adapté au besoin de mon entreprise, l'abonnement tres chere alors que j'ai fais appel a web - jungle pour me créer un logiciel sur mesure c'est vraiment une experience incroyable et je suis vraiment content de l'avoir fait "
          />
          <TestimonialCard
            name="Hugo"
            role="SARL Borcella"
            image="/kishore_gunnam.jpg"
            quote="Web Jungle ma créer un logiciel 100% adapté a mon entreprise depuis elle a gagné en efficacité, plus d'erreur de comptabilité tout est exporté en un clique a mon comptable, j'ai gagné en tranquillité d'esprit finalement pour mon chere qu'un logiciel pas sur mesure "
            className="lg:mt-[50px]"
          />
          <TestimonialCard
            name="Sophie"
            role="Drh de EnerLab"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            quote="Avant je passé des heures a faire des fichiers excel, pour la gestion des congé les employés m'envoyé des emails ou des sms j'étais vraiment stressé et je n'arrivais pas a gérer toutes les demandes, maintenant tout est automatisé plus d'erreure !  "
            className="lg:mt-[-50px]"
          />
          <TestimonialCard
            name="Damien"
            role="Narbonne et fils"
            image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
            quote="Web - Jungle ma entre autre créer un générateur de devis en fonctionne de mes anciens devis j'ai gagné un temps fou ! "
          />
        </div>
      </div>
    </div>
  );
}

const TestimonialCard = ({
  name,
  role,
  image,
  quote,
  className,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  className?: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "flex flex-col h-96 p-8 rounded-[17px]",
        "border border-[#474747]",
        "bg-white bg-[linear-gradient(178deg,#2E2E2E_0.37%,#0B0B0B_38.61%),linear-gradient(180deg,#4C4C4C_0%,#151515_100%),linear-gradient(180deg,#2E2E2E_0%,#0B0B0B_100%)]",
        "relative isolate",
        className
      )}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-neutral-700">
          <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-sm text-neutral-400">{role}</p>
        </div>
      </div>
      <p className="text-lg text-neutral-300 leading-relaxed">
        &quot;{quote}&quot;
      </p>
    </motion.div>
  );
};
