"use client";

import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarIcon,
  CheckCircle,
  Clock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";

// Types pour le formulaire de contact
interface ContactForm {
  nom: string;
  prenom: string;
  email: string;
  entreprise: string;
  role: string;
  message?: string;
}

// Types pour les créneaux horaires
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

// Créneaux de 30 minutes disponibles par jour
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9h
  const endHour = 17; // 17h

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      slots.push({
        id: `${hour}-${minute}`,
        time: timeString,
        available: Math.random() > 0.3, // Simulation de disponibilité aléatoire
      });
    }
  }

  return slots;
};

export default function ContactPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"appointment" | "contact">(
    "appointment"
  );
  const [formData, setFormData] = useState<ContactForm>({
    nom: "",
    prenom: "",
    email: "",
    entreprise: "",
    role: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = generateTimeSlots();

  // Gérer les changements du formulaire
  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation basique
    if (!formData.nom || !formData.prenom || !formData.email) {
      alert("Veuillez remplir tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    // Si on est sur l'onglet rendez-vous, vérifier la sélection
    if (activeTab === "appointment" && (!selectedDate || !selectedTimeSlot)) {
      alert("Veuillez sélectionner une date et un créneau horaire.");
      setIsSubmitting(false);
      return;
    }

    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Données du formulaire:", {
      ...formData,
      ...(activeTab === "appointment" && {
        rendezVous: {
          date: selectedDate,
          creneau: selectedTimeSlot,
        },
      }),
    });

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      entreprise: "",
      role: "",
      message: "",
    });
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setIsSubmitted(false);
  };

  // Si le formulaire a été soumis avec succès
  if (isSubmitted) {
    return (
      <div className="relative w-full overflow-hidden rounded-md bg-black/[0.96] antialiased min-h-screen">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <div className="relative z-10 max-w-2xl mx-auto pt-32 pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>

            <Heading size="xl" className="text-white">
              Message envoyé avec succès !
            </Heading>

            <Subheading className="text-gray-300">
              {activeTab === "appointment"
                ? "Votre demande de rendez-vous a été reçue. Nous vous confirmerons les détails par email sous 24h."
                : "Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais."}
            </Subheading>

            <Button
              onClick={resetForm}
              className="bg-white text-black hover:bg-gray-100"
            >
              Envoyer un autre message
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-black/[0.96] antialiased min-h-screen">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-4">
        <div className="text-center space-y-6 mb-16">
          <Heading size="xl" className="text-white">
            Contactez-nous
          </Heading>
          <Subheading className="text-gray-300 max-w-2xl mx-auto">
            Prenez rendez-vous avec notre équipe ou envoyez-nous un message.
            Nous sommes là pour vous accompagner dans vos projets.
          </Subheading>
        </div>

        {/* Onglets de navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900/50 border border-gray-800 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("appointment")}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeTab === "appointment"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              )}
            >
              <CalendarIcon className="w-4 h-4 inline mr-2" />
              Prendre rendez-vous
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeTab === "contact"
                  ? "bg-white text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              )}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Contact simple
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "appointment" ? (
            <motion.div
              key="appointment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Rendez-vous avec calendrier */}
              <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Calendrier */}
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      Sélectionner une date
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Choisissez un jour pour votre rendez-vous
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        // Désactiver les weekends et les jours passés
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          date < today ||
                          date.getDay() === 0 ||
                          date.getDay() === 6
                        );
                      }}
                      className="rounded-md border-gray-700 bg-transparent text-white"
                    />

                    {/* Créneaux horaires */}
                    {selectedDate && (
                      <div className="mt-6">
                        <Label className="text-white flex items-center gap-2 mb-4">
                          <Clock className="w-4 h-4" />
                          Créneaux disponibles
                        </Label>
                        <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedTimeSlot(slot.time)}
                              disabled={!slot.available}
                              className={cn(
                                "p-2 text-sm rounded-md border transition-colors",
                                slot.available
                                  ? selectedTimeSlot === slot.time
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-white border-gray-600 hover:border-gray-400"
                                  : "bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed"
                              )}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Formulaire */}
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Vos informations
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Remplissez vos coordonnées pour confirmer le rendez-vous
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prenom" className="text-white">
                            Prénom *
                          </Label>
                          <Input
                            id="prenom"
                            value={formData.prenom}
                            onChange={(e) =>
                              handleInputChange("prenom", e.target.value)
                            }
                            className="bg-gray-800 border-gray-700 text-white"
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
                              handleInputChange("nom", e.target.value)
                            }
                            className="bg-gray-800 border-gray-700 text-white"
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
                            handleInputChange("email", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="jean.dupont@email.com"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="entreprise" className="text-white">
                          Entreprise
                        </Label>
                        <Input
                          id="entreprise"
                          value={formData.entreprise}
                          onChange={(e) =>
                            handleInputChange("entreprise", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role" className="text-white">
                          Rôle/Fonction
                        </Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            handleInputChange("role", value)
                          }
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez votre fonction" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="dirigeant">
                              Dirigeant/CEO
                            </SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="responsable-it">
                              Responsable IT
                            </SelectItem>
                            <SelectItem value="chef-projet">
                              Chef de projet
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-white">
                          Message (optionnel)
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Décrivez brièvement votre projet ou vos besoins..."
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={
                          isSubmitting || !selectedDate || !selectedTimeSlot
                        }
                        className="w-full bg-white text-black hover:bg-gray-100 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            Confirmer le rendez-vous
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>

                      {selectedDate && selectedTimeSlot && (
                        <div className="mt-4 p-3 bg-gray-800 rounded-md border border-gray-700">
                          <p className="text-sm text-gray-300">
                            <strong className="text-white">
                              Récapitulatif :
                            </strong>
                            <br />
                            Date : {selectedDate.toLocaleDateString("fr-FR")}
                            <br />
                            Créneau : {selectedTimeSlot}
                          </p>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Section Contact simple */}
              <div className="max-w-2xl mx-auto">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Envoyez-nous un message
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Une question ? Un projet ? Nous vous répondrons
                      rapidement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="prenom-simple" className="text-white">
                            Prénom *
                          </Label>
                          <Input
                            id="prenom-simple"
                            value={formData.prenom}
                            onChange={(e) =>
                              handleInputChange("prenom", e.target.value)
                            }
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Jean"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="nom-simple" className="text-white">
                            Nom *
                          </Label>
                          <Input
                            id="nom-simple"
                            value={formData.nom}
                            onChange={(e) =>
                              handleInputChange("nom", e.target.value)
                            }
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Dupont"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email-simple" className="text-white">
                          Email *
                        </Label>
                        <Input
                          id="email-simple"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="jean.dupont@email.com"
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="entreprise-simple"
                          className="text-white"
                        >
                          Entreprise
                        </Label>
                        <Input
                          id="entreprise-simple"
                          value={formData.entreprise}
                          onChange={(e) =>
                            handleInputChange("entreprise", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role-simple" className="text-white">
                          Rôle/Fonction
                        </Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            handleInputChange("role", value)
                          }
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Sélectionnez votre fonction" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="dirigeant">
                              Dirigeant/CEO
                            </SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="responsable-it">
                              Responsable IT
                            </SelectItem>
                            <SelectItem value="chef-projet">
                              Chef de projet
                            </SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="message-simple" className="text-white">
                          Message *
                        </Label>
                        <Textarea
                          id="message-simple"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Décrivez votre projet, vos besoins ou posez votre question..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-white text-black hover:bg-gray-100"
                      >
                        {isSubmitting ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            Envoyer le message
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
