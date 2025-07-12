"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  CheckCircle,
  Computer,
  CreditCard,
  Mail,
  Settings,
  Store,
  User,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// Types pour le formulaire
interface FormulaireData {
  typeEntreprise: string;
  besoins: string[];
  nom: string;
  prenom: string;
  email: string;
}

// Options pour le type d&apos;entreprise
const optionsEntreprise = [
  {
    id: "btp",
    label: "BTP",
    description: "Construction, rénovation, artisanat",
    icon: Building,
  },
  {
    id: "service",
    label: "Service",
    description: "Conseil, maintenance, assistance",
    icon: Users,
  },
  {
    id: "vente",
    label: "Vente",
    description: "Commerce, e-commerce, retail",
    icon: Store,
  },
  {
    id: "autre",
    label: "Autre",
    description: "Autre secteur d'activité",
    icon: Settings,
  },
];

// Options pour les besoins
const optionsBesoins = [
  {
    id: "planning",
    label: "Planning",
    description: "Gestion des équipes et planification",
    icon: Users,
  },
  {
    id: "crm",
    label: "CRM",
    description: "Gestion de la relation client",
    icon: User,
  },
  {
    id: "comptabilite",
    label: "Gestion comptable",
    description: "Facturation et comptabilité",
    icon: CreditCard,
  },
  {
    id: "autre",
    label: "Autre",
    description: "Autre besoin logiciel",
    icon: Computer,
  },
];

export default function FormulaireCreation() {
  const [etapeActuelle, setEtapeActuelle] = useState(1);
  const [formData, setFormData] = useState<FormulaireData>({
    typeEntreprise: "",
    besoins: [],
    nom: "",
    prenom: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTypeEntrepriseSelect = (type: string) => {
    setFormData({ ...formData, typeEntreprise: type });
    // Passer automatiquement à l&apos;étape suivante après 500ms
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNextStep();
    }, 500);
  };

  const handleBesoinToggle = (besoin: string) => {
    const besoins = formData.besoins.includes(besoin)
      ? formData.besoins.filter((b) => b !== besoin)
      : [...formData.besoins, besoin];
    setFormData({ ...formData, besoins });
  };

  const handleNextStep = () => {
    if (etapeActuelle < 3) {
      setEtapeActuelle(etapeActuelle + 1);
    }
  };

  const handlePrevStep = () => {
    if (etapeActuelle > 1) {
      setEtapeActuelle(etapeActuelle - 1);
    }
    // Nettoyer le timeout si on revient en arrière
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulation d&apos;envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const isStepValid = () => {
    switch (etapeActuelle) {
      case 1:
        return formData.typeEntreprise !== "";
      case 2:
        return formData.besoins.length > 0;
      case 3:
        return formData.nom && formData.prenom && formData.email;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setFormData({
      typeEntreprise: "",
      besoins: [],
      nom: "",
      prenom: "",
      email: "",
    });
    setEtapeActuelle(1);
    setIsSubmitted(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div
      id="formulaire-creation"
      className="relative w-full overflow-hidden rounded-md bg-black/[0.96] antialiased min-h-screen"
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
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)`,
          }}
        />
      </div>

      {/* Gradients d'accent sur les côtés */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-1/3 h-full opacity-30"
          style={{
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-30"
          style={{
            background: `linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Effet de lumière en haut */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-96 pointer-events-none">
        <div
          className="w-full h-full opacity-20"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 70%)`,
          }}
        />
      </div>

      {/* Contenu principal qui change selon l'état */}
      <div className="relative z-10">
        {isSubmitted ? (
          // Page de succès
          <div className="max-w-2xl mx-auto pt-32 pb-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Demande envoyée avec succès !
                </h1>
                <p className="text-gray-300 max-w-md mx-auto">
                  Merci pour votre intérêt ! Notre équipe vous contactera sous
                  24h pour discuter de votre projet.
                </p>
              </div>

              <Button
                onClick={resetForm}
                className="bg-white text-black hover:bg-gray-100"
              >
                Créer une nouvelle demande
              </Button>
            </motion.div>
          </div>
        ) : (
          // Formulaire principal
          <div className="max-w-4xl mx-auto pt-20 pb-20 px-4">
            {/* En-tête avec badge de progression */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="bg-gray-800/50 text-gray-300 px-4 py-2 rounded-full text-sm mb-6 inline-block">
                100% personnalisé
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Créer mon <span className="text-blue-400">logiciel</span>{" "}
                maintenant
              </h1>

              {/* Barre de progression */}
              <div className="flex items-center justify-center gap-4 mt-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                        step === etapeActuelle
                          ? "bg-blue-500 text-white scale-110"
                          : step < etapeActuelle
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-gray-400"
                      )}
                    >
                      {step < etapeActuelle ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div
                        className={cn(
                          "w-12 h-1 ml-4 rounded transition-all duration-300",
                          step < etapeActuelle ? "bg-green-500" : "bg-gray-700"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contenu principal */}
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {/* Étape 1: Type d&apos;entreprise */}
                {etapeActuelle === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Quel type d&apos;entreprise avez-vous ?
                      </h2>
                      <p className="text-gray-400">
                        Sélectionnez le secteur qui correspond le mieux à votre
                        activité
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {optionsEntreprise.map((option) => {
                        const IconComponent = option.icon;
                        const isSelected =
                          formData.typeEntreprise === option.id;

                        return (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={cn(
                                "cursor-pointer transition-all duration-300 bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50",
                                isSelected &&
                                  "ring-2 ring-blue-500 bg-blue-900/20"
                              )}
                              onClick={() =>
                                handleTypeEntrepriseSelect(option.id)
                              }
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={cn(
                                      "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                                      isSelected ? "bg-blue-500" : "bg-gray-700"
                                    )}
                                  >
                                    <IconComponent className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">
                                      {option.label}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                      {option.description}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Étape 2: Besoins */}
                {etapeActuelle === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Vous cherchez à gérer quoi ?
                      </h2>
                      <p className="text-gray-400">
                        Sélectionnez tous les domaines qui vous intéressent
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {optionsBesoins.map((option) => {
                        const IconComponent = option.icon;
                        const isSelected = formData.besoins.includes(option.id);

                        return (
                          <motion.div
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={cn(
                                "cursor-pointer transition-all duration-300 bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:bg-gray-800/50",
                                isSelected &&
                                  "ring-2 ring-blue-500 bg-blue-900/20"
                              )}
                              onClick={() => handleBesoinToggle(option.id)}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={cn(
                                      "w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                                      isSelected ? "bg-blue-500" : "bg-gray-700"
                                    )}
                                  >
                                    <IconComponent className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white">
                                      {option.label}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                      {option.description}
                                    </p>
                                  </div>
                                  {isSelected && (
                                    <CheckCircle className="w-6 h-6 text-blue-400" />
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Étape 3: Informations de contact */}
                {etapeActuelle === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Vos informations de contact
                      </h2>
                      <p className="text-gray-400">
                        Nous vous contacterons pour discuter de votre projet
                      </p>
                    </div>

                    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Mail className="w-5 h-5" />
                          Coordonnées
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="prenom" className="text-white">
                              Prénom *
                            </Label>
                            <Input
                              id="prenom"
                              value={formData.prenom}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  prenom: e.target.value,
                                })
                              }
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                              placeholder="Jean"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="nom" className="text-white">
                              Nom *
                            </Label>
                            <Input
                              id="nom"
                              value={formData.nom}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nom: e.target.value,
                                })
                              }
                              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                              placeholder="Dupont"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-white">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                            placeholder="jean.dupont@email.com"
                            required
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Boutons de navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center mt-8"
              >
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={etapeActuelle === 1}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>

                {etapeActuelle < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={!isStepValid()}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid() || isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
