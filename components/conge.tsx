"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, isSameDay, isSaturday, isSunday } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, CalendarIcon, Clock, FileText } from "lucide-react";
import type React from "react";
import { useState } from "react";

type TypeConge =
  | "Congés payés"
  | "RTT"
  | "Congé sans solde"
  | "Maladie"
  | "Autre"
  | "Congé exceptionnel";

interface DemandeConge {
  id: string;
  dateDebut: Date;
  dateFin: Date;
  joursSelectionnes: Date[];
  typeConge: TypeConge;
  motif: string;
  statut: "En attente" | "Approuvé" | "Refusé";
  dateCreation: Date;
}

// Fonction pour vérifier les jours fériés français
const isHoliday = (date: Date): boolean => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const fixedHolidays = [
    { month: 1, day: 1 }, // Nouvel An
    { month: 5, day: 1 }, // Fête du Travail
    { month: 5, day: 8 }, // Victoire 1945
    { month: 7, day: 14 }, // Fête Nationale
    { month: 8, day: 15 }, // Assomption
    { month: 11, day: 1 }, // Toussaint
    { month: 11, day: 11 }, // Armistice
    { month: 12, day: 25 }, // Noël
  ];

  return fixedHolidays.some(
    (holiday) => holiday.month === month && holiday.day === day
  );
};

// Composant CalendarDayPicker intégré
interface CalendarDayPickerProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
  excludeSundays?: boolean;
  excludeWeekends?: boolean;
  minDate?: Date;
}

function CalendarDayPicker({
  selectedDates,
  onDatesChange,
  excludeSundays = true,
  excludeWeekends = false,
  minDate,
}: CalendarDayPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const isSelected = selectedDates.some((selectedDate) =>
      isSameDay(selectedDate, date)
    );

    if (isSelected) {
      onDatesChange(
        selectedDates.filter((selectedDate) => !isSameDay(selectedDate, date))
      );
    } else {
      onDatesChange([...selectedDates, date]);
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (excludeSundays && isSunday(date)) return true;
    if (excludeWeekends && (isSaturday(date) || isSunday(date))) return true;
    return false;
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  };

  return (
    <div className="space-y-3">
      <Calendar
        mode="single"
        selected={undefined}
        onSelect={handleDateSelect}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        locale={fr}
        disabled={isDateDisabled}
        modifiers={{
          selected: isDateSelected,
          holiday: isHoliday,
        }}
        modifiersStyles={{
          selected: {
            backgroundColor: "rgb(59 130 246)",
            color: "white",
            fontWeight: "bold",
          },
          holiday: {
            color: "rgb(239 68 68)",
            fontWeight: "bold",
          },
        }}
        className="rounded-md border w-full"
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-2 sm:space-x-4 sm:space-y-0",
          month: "space-y-2",
          caption:
            "flex justify-center pt-1 relative items-center text-base font-semibold",
          caption_label: "text-base font-semibold",
          nav: "space-x-1 flex items-center",
          nav_button:
            "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border border-gray-300 rounded-md hover:bg-gray-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-gray-500 rounded-md w-9 h-8 font-medium text-sm flex items-center justify-center",
          row: "flex w-full mt-1",
          cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal text-sm hover:bg-gray-100 hover:text-gray-900 focus:bg-blue-100 focus:text-blue-900 rounded-md transition-colors",
          day_selected:
            "bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white font-bold",
          day_today: "bg-blue-100 text-blue-900 font-semibold",
          day_outside: "text-gray-400 opacity-50",
          day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
          day_hidden: "invisible",
        }}
      />

      {selectedDates.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Dates sélectionnées :</h4>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {selectedDates
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDateSelect(date)}
                  className="text-xs px-2 py-1 h-6"
                >
                  {format(date, "dd/MM", { locale: fr })}
                  <span className="ml-1">×</span>
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Composant principal
export function DemandeCongeComplete() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [typeConge, setTypeConge] = useState<TypeConge>("Congés payés");
  const [motif, setMotif] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const typesConges: TypeConge[] = [
    "Congés payés",
    "RTT",
    "Congé sans solde",
    "Maladie",
    "Autre",
    "Congé exceptionnel",
  ];

  // Calculer le nombre de jours ouvrés
  const joursDemandes = selectedDates.filter((date) => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return false; // Exclure dimanches
    if (isHoliday(date)) return false; // Exclure jours fériés
    return true;
  }).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (selectedDates.length === 0) {
      alert("Veuillez sélectionner au moins un jour de congé.");
      setIsLoading(false);
      return;
    }

    if (!motif.trim()) {
      alert("Veuillez indiquer un motif pour votre demande.");
      setIsLoading(false);
      return;
    }

    const sortedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    const dateDebut = sortedDates[0];
    const dateFin = sortedDates[sortedDates.length - 1];

    const nouvelleDemande: DemandeConge = {
      id: String(Date.now()),
      dateDebut,
      dateFin,
      joursSelectionnes: selectedDates,
      typeConge,
      motif,
      statut: "En attente",
      dateCreation: new Date(),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Demande de congé créée:", nouvelleDemande);
      alert("Demande de congé envoyée avec succès !");

      setSelectedDates([]);
      setMotif("");
      setTypeConge("Congés payés");
    } catch {
      alert("Erreur lors de l'envoi de la demande");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="h-full max-w-6xl mx-auto p-4 flex flex-col bg-white text-black !dark:bg-white !dark:text-black"
      data-theme="light"
    >
      {/* En-tête */}
      <Card className="mb-4 flex-shrink-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarIcon className="h-5 w-5" />
            Nouvelle demande de congés
          </CardTitle>
          <CardDescription className="text-sm">
            Sélectionnez vos dates de congés et remplissez les informations
            nécessaires
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Contenu principal avec scroll */}
      <div className="flex-1 overflow-y-auto space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Layout en deux colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Colonne gauche - Calendrier */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="h-4 w-4" />
                  Choisissez vos jours de congés
                </CardTitle>
                <CardDescription className="text-xs">
                  Cliquez sur les dates. Les dimanches et jours fériés ne sont
                  pas décomptés.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarDayPicker
                  selectedDates={selectedDates}
                  onDatesChange={setSelectedDates}
                  excludeSundays={true}
                  excludeWeekends={false}
                  minDate={new Date()}
                />
              </CardContent>
            </Card>

            {/* Colonne droite - Formulaire et résumé */}
            <div className="space-y-4">
              {/* Résumé */}
              {selectedDates.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4" />
                      Résumé
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center p-2 bg-blue-50 rounded border">
                        <div className="text-lg font-bold text-blue-600">
                          {selectedDates.length}
                        </div>
                        <div className="text-xs text-gray-600">
                          Sélectionnés
                        </div>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded border">
                        <div className="text-lg font-bold text-green-600">
                          {joursDemandes}
                        </div>
                        <div className="text-xs text-gray-600">Décomptés</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded border">
                        <div className="text-lg font-bold text-gray-600">
                          {selectedDates.length - joursDemandes}
                        </div>
                        <div className="text-xs text-gray-600">Exclus</div>
                      </div>
                    </div>

                    {selectedDates.length !== joursDemandes && (
                      <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
                        <strong>Note:</strong>{" "}
                        {selectedDates.length - joursDemandes} jour(s) exclu(s)
                      </div>
                    )}

                    {selectedDates.length > 0 && (
                      <div className="text-xs text-gray-600 mt-2">
                        <strong>Période:</strong> Du{" "}
                        {format(
                          Math.min(...selectedDates.map((d) => d.getTime())),
                          "dd/MM/yyyy",
                          { locale: fr }
                        )}{" "}
                        au{" "}
                        {format(
                          Math.max(...selectedDates.map((d) => d.getTime())),
                          "dd/MM/yyyy",
                          { locale: fr }
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Formulaire */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-4 w-4" />
                    Détails de la demande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Type de congé */}
                  <div className="space-y-2">
                    <Label htmlFor="typeConge" className="text-sm font-medium">
                      Type de congés
                    </Label>
                    <Select
                      value={typeConge}
                      onValueChange={(value) =>
                        setTypeConge(value as TypeConge)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesConges.map((type) => (
                          <SelectItem key={type} value={type} className="py-2">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Motif */}
                  <div className="space-y-2">
                    <Label htmlFor="motif" className="text-sm font-medium">
                      Motif
                    </Label>
                    <Textarea
                      id="motif"
                      value={motif}
                      onChange={(e) => setMotif(e.target.value)}
                      placeholder="Précisez le motif de votre demande..."
                      rows={3}
                      className="resize-none text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-3 pt-2 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSelectedDates([]);
                setMotif("");
                setTypeConge("Congés payés");
              }}
              className="px-4"
            >
              Réinitialiser
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading || selectedDates.length === 0 || !motif.trim()
              }
              className="px-6"
            >
              {isLoading ? "Envoi..." : "Envoyer la demande"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
