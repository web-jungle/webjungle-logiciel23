"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { format, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Clock,
  FileText,
  Info,
  Loader2,
  MapPin,
  Search,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Types locaux (copiés de lib/types.ts)
export type TypeEvenement =
  | "presence"
  | "absence"
  | "formation"
  | "autre"
  | "ferie";
export type TypeAbsence =
  | "CP"
  | "RTT"
  | "CSS"
  | "Arrêt Travail"
  | "Abs Inj"
  | "Accident Travail"
  | "CFA"
  | "Congé Pater"
  | "Absence autorisée"
  | "Congé exceptionnel";
export type ZoneTrajet = "Zone 1" | "Zone 2" | "Zone 3" | "Zone 4" | "Zone 5";
export type Role = "super_admin" | "admin" | "manager" | "collaborateur";

export interface Collaborateur {
  id: string;
  nom: string;
  prenom?: string;
  couleur?: string;
  entreprise: string;
  created_at?: string;
  isArchived?: boolean;
}

export interface Evenement {
  id: string;
  title: string;
  start: Date;
  end: Date;
  collaborateurId: string;
  typeEvenement: string;
  lieuChantier?: string;
  zoneTrajet?: string;
  panierRepas: boolean;
  ticketRestaurant: boolean;
  heuresSupplementaires: number;
  grandDeplacement: boolean;
  prgd: boolean;
  nombrePrgd: number;
  typeAbsence?: TypeAbsence;
  verrouille: boolean;
  latitude?: number;
  longitude?: number;
  adresseComplete?: string;
  createdAt?: string | Date;
  demandeCongeId?: string;
  commentaire?: string | null;
  collaborateur?: Collaborateur;
}

// Jours fériés (version simplifiée)
export const joursFeries: { [annee: number]: Date[] } = {
  2025: [
    new Date(2025, 0, 1), // Jour de l'an
    new Date(2025, 3, 21), // Lundi de Pâques
    new Date(2025, 4, 1), // Fête du Travail
    new Date(2025, 4, 8), // Victoire 1945
    new Date(2025, 4, 29), // Ascension
    new Date(2025, 5, 9), // Lundi de Pentecôte
    new Date(2025, 6, 14), // Fête nationale
    new Date(2025, 7, 15), // Assomption
    new Date(2025, 10, 1), // Toussaint
    new Date(2025, 10, 11), // Armistice 1918
    new Date(2025, 11, 25), // Noël
  ],
};

// Entreprises
export const entreprises = [
  "ORIZON TELECOM",
  "ORIZON GROUP",
  "ORIZON INSTALLATION",
  "YELLEEN",
];

// Données de démonstration
const DEMO_COLLABORATEURS: Collaborateur[] = [
  {
    id: "1",
    nom: "Romain",
    prenom: "Marty",
    entreprise: "Web Jungle",
    couleur: "#3B82F6",
  },
  {
    id: "2",
    nom: "Guillaume",
    prenom: "BELTRAN",
    entreprise: "Web Jungle",
    couleur: "#10B981",
  },
  {
    id: "3",
    nom: "Dupont",
    prenom: "Jean",
    entreprise: "Web Jungle",
    couleur: "#F59E0B",
  },
  {
    id: "4",
    nom: "Fortin",
    prenom: "Pierre",
    entreprise: "Web Jungle",
    couleur: "#EF4444",
  },
  {
    id: "5",
    nom: "Martin",
    prenom: "Pierre",
    entreprise: "Web Jungle",
    couleur: "#8B5CF6",
  },
];

const getCurrentWeekEvents = () => {
  const now = new Date();
  const currentWeekStart = startOfWeek(now, { locale: fr });

  return [
    {
      id: "1",
      title: "Chantier 1 ",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate(),
        8,
        0
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate(),
        17,
        0
      ),
      collaborateurId: "1",
      typeEvenement: "presence",
      lieuChantier: "Chantier 1",
      zoneTrajet: "1A",
      panierRepas: false,
      ticketRestaurant: true,
      heuresSupplementaires: 0,
      grandDeplacement: false,
      prgd: false,
      nombrePrgd: 0,
      verrouille: false,
      adresseComplete: "1 rue de la paix, 75000 Paris, France",
      latitude: 42.7743,
      longitude: 2.9265,
    },
    {
      id: "2",
      title: "RTT",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 1,
        8,
        0
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 1,
        17,
        0
      ),
      collaborateurId: "1",
      typeEvenement: "absence",
      typeAbsence: "RTT",
      panierRepas: false,
      ticketRestaurant: false,
      heuresSupplementaires: 0,
      grandDeplacement: false,
      prgd: false,
      nombrePrgd: 0,
      verrouille: false,
    },
    {
      id: "3",
      title: "Chantier Perpignan",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 2,
        7,
        30
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 2,
        18,
        0
      ),
      collaborateurId: "2",
      typeEvenement: "presence",
      lieuChantier: "Chantier Perpignan",
      zoneTrajet: "2",
      panierRepas: true,
      ticketRestaurant: false,
      heuresSupplementaires: 1,
      grandDeplacement: false,
      prgd: true,
      nombrePrgd: 1,
      verrouille: false,
      adresseComplete: "Avenue du Général de Gaulle, 66000 Perpignan, France",
      latitude: 42.6886,
      longitude: 2.8946,
    },
    {
      id: "4",
      title: "Mise en service ",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 3,
        6,
        0
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 3,
        19,
        0
      ),
      collaborateurId: "3",
      typeEvenement: "presence",
      lieuChantier: "Mise en service",
      zoneTrajet: "12",
      panierRepas: true,
      ticketRestaurant: false,
      heuresSupplementaires: 2,
      grandDeplacement: true,
      prgd: true,
      nombrePrgd: 2,
      verrouille: false,
      adresseComplete: "1 rue de la paix, 75000 Paris, France",
      latitude: 43.6456,
      longitude: 0.5865,
    },
    {
      id: "5",
      title: "Maintenance Narbonne",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 4,
        8,
        0
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 4,
        17,
        0
      ),
      collaborateurId: "4",
      typeEvenement: "presence",
      lieuChantier: "Maintenance Narbonne",
      zoneTrajet: "3",
      panierRepas: false,
      ticketRestaurant: true,
      heuresSupplementaires: 0,
      grandDeplacement: false,
      prgd: false,
      nombrePrgd: 0,
      verrouille: false,
      adresseComplete: "1 rue de la paix, 75000 Paris, France",
      latitude: 43.1839,
      longitude: 3.0032,
    },
    {
      id: "6",
      title: "Dépannage Toulouse",
      start: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 5,
        7,
        0
      ),
      end: new Date(
        currentWeekStart.getFullYear(),
        currentWeekStart.getMonth(),
        currentWeekStart.getDate() + 5,
        18,
        30
      ),
      collaborateurId: "5",
      typeEvenement: "presence",
      lieuChantier: "Dépannage Toulouse",
      zoneTrajet: "8",
      panierRepas: true,
      ticketRestaurant: false,
      heuresSupplementaires: 1.5,
      grandDeplacement: true,
      prgd: true,
      nombrePrgd: 1,
      verrouille: false,
      adresseComplete: "Place du Capitole, 31000 Toulouse, France",
      latitude: 43.6045,
      longitude: 1.444,
    },
  ] as Evenement[];
};

const DEMO_EVENEMENTS: Evenement[] = getCurrentWeekEvents();

// Configuration du localisateur pour date-fns

// Fonction utilitaire pour normaliser une date (réinitialiser heures/minutes/secondes)
const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Fonction pour vérifier si une date est un jour férié
const estJourFerie = (date: Date): boolean => {
  const annee = date.getFullYear();

  if (!joursFeries[annee]) {
    return false;
  }

  return joursFeries[annee].some(
    (jourFerie: Date) =>
      jourFerie.getDate() === date.getDate() &&
      jourFerie.getMonth() === date.getMonth()
  );
};

// Fonction pour vérifier si c'est un weekend (samedi ou dimanche)
const estWeekend = (date: Date): boolean => {
  const jour = date.getDay();
  return jour === 0 || jour === 6; // 0 = dimanche, 6 = samedi
};

// Fonction pour obtenir le début d'une semaine normalisé
const getStandardizedWeekStart = (date: Date): Date => {
  const weekStart = startOfWeek(normalizeDate(date), { locale: fr });
  return normalizeDate(weekStart);
};

// Fonctions géo-utils intégrées
const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance en kilomètres
}

// Coordonnées du siège social
export const SIEGE_SOCIAL = {
  latitude: 42.7743,
  longitude: 2.9265,
  address: "7 avenue alfred sauvy, 66600 Rivesaltes, France",
};

// Déterminer la zone de trajet en fonction de la distance
export function determineZoneTrajet(distance: number): string {
  if (distance <= 5) return "1A";
  if (distance <= 10) return "1B";
  if (distance <= 22) return "2";
  if (distance <= 30) return "3";
  if (distance <= 42) return "4";
  if (distance <= 50) return "5";
  if (distance <= 55) return "6";
  if (distance <= 60) return "7";
  if (distance <= 72) return "8";
  if (distance <= 80) return "9";
  if (distance <= 92) return "10";
  if (distance <= 100) return "11";
  if (distance <= 122) return "12";
  if (distance <= 130) return "13";
  if (distance <= 142) return "14";
  if (distance <= 150) return "15";
  if (distance <= 162) return "16";
  if (distance <= 170) return "17";
  if (distance <= 182) return "18";
  if (distance <= 190) return "19";
  if (distance <= 200) return "20";
  if (distance <= 220) return "21";
  if (distance <= 232) return "22";
  if (distance <= 240) return "23";
  if (distance <= 250) return "24";

  return ""; // Au-delà de 250 km, pas de zone applicable
}

// Interface pour les résultats de géocodage
export interface GeocodingResult {
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

// Composant AddressSearch intégré
const AddressSearch = ({
  onSelectAddress,
  initialAddress = "",
  disabled = false,
}: {
  onSelectAddress: (result: GeocodingResult) => void;
  initialAddress?: string;
  disabled?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState(initialAddress);
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fermer les résultats si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Rechercher une adresse avec l'API Nominatim (OpenStreetMap)
  const searchAddress = async () => {
    if (!searchTerm.trim() || searchTerm.length < 3) return;

    setIsLoading(true);
    setError(null);
    setIsOpen(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la recherche d'adresse");
      }

      const data = await response.json();

      if (data.length === 0) {
        setResults([]);
        setError("Aucune adresse trouvée");
      } else {
        const formattedResults: GeocodingResult[] = data.map(
          (item: {
            display_name: string;
            lat: string;
            lon: string;
            place_id: string;
          }) => ({
            address: item.display_name,
            latitude: Number.parseFloat(item.lat),
            longitude: Number.parseFloat(item.lon),
            placeId: item.place_id,
          })
        );
        setResults(formattedResults);
      }
    } catch (err) {
      console.error("Erreur de géocodage:", err);
      setError("Erreur lors de la recherche d'adresse");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectResult = (result: GeocodingResult) => {
    setSearchTerm(result.address);
    onSelectAddress(result);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Rechercher une adresse..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchAddress();
              }
            }}
            className="pr-8"
            disabled={disabled}
          />
          {isLoading && (
            <Loader2 className="absolute right-2 top-2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={searchAddress}
          disabled={isLoading || disabled || searchTerm.length < 3}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isOpen && (results.length > 0 || error) && (
        <Card className="absolute z-10 mt-1 w-full max-h-60 overflow-auto shadow-lg">
          <div className="p-2">
            {error ? (
              <p className="text-sm text-destructive p-2">{error}</p>
            ) : (
              results.map((result) => (
                <div
                  key={result.placeId}
                  className="p-2 hover:bg-muted cursor-pointer text-sm rounded-md"
                  onClick={() => handleSelectResult(result)}
                >
                  {result.address}
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

// Props du composant
interface PlanningDemoProps {
  userRole?: Role;
  userCollaborateurId?: string;
  customCollaborateurs?: Collaborateur[];
  customEvenements?: Evenement[];
  onEventSelect?: (event: Evenement) => void;
  onEventCreate?: (event: Evenement) => void;
  onEventUpdate?: (event: Evenement) => void;
  onEventDelete?: (eventId: string) => void;
}

// Composant MultiSelectCollaborateurs intégré
const MultiSelectCollaborateurs = ({
  collaborateurs,
  selectedCollaborateurs,
  onChange,
  disabled = false,
}: {
  collaborateurs: Collaborateur[];
  selectedCollaborateurs: string[];
  onChange: (selectedIds: string[]) => void;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const handleSelect = (collaborateurId: string) => {
    if (selectedCollaborateurs.includes(collaborateurId)) {
      onChange(selectedCollaborateurs.filter((id) => id !== collaborateurId));
    } else {
      onChange([...selectedCollaborateurs, collaborateurId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCollaborateurs.length === collaborateurs.length) {
      onChange([]);
    } else {
      onChange(collaborateurs.map((c) => c.id));
    }
  };

  const handleClear = () => {
    onChange([]);
    setOpen(false);
  };

  const selectedCollaborateursNames = selectedCollaborateurs
    .map((id) => collaborateurs.find((c) => c.id === id)?.nom)
    .filter(Boolean);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between min-w-[200px] h-auto min-h-10"
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 py-1">
            {selectedCollaborateurs.length === 0 ? (
              <span className="text-muted-foreground">
                Sélectionner des collaborateurs
              </span>
            ) : selectedCollaborateurs.length === collaborateurs.length ? (
              <span>Liste des employés</span>
            ) : (
              selectedCollaborateursNames.map((name) => (
                <Badge variant="secondary" key={name} className="mr-1">
                  {name}
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: Math.max(300, triggerWidth) }}
      >
        <Command>
          <CommandInput placeholder="Rechercher un collaborateur..." />
          <CommandList>
            <CommandEmpty>Aucun collaborateur trouvé.</CommandEmpty>
          </CommandList>
          <div className="border-t px-2 py-2 flex justify-between">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedCollaborateurs.length === collaborateurs.length
                ? "Désélectionner tout"
                : "Sélectionner tout"}
            </Button>
            {selectedCollaborateurs.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <X className="h-4 w-4 mr-2" />
                Effacer
              </Button>
            )}
          </div>
          <ScrollArea className="h-[300px]">
            <CommandList>
              <CommandGroup>
                {collaborateurs.map((collaborateur) => {
                  const isSelected = selectedCollaborateurs.includes(
                    collaborateur.id
                  );
                  return (
                    <CommandItem
                      key={collaborateur.id}
                      value={collaborateur.nom}
                      onSelect={() => handleSelect(collaborateur.id)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Checkbox checked={isSelected} />
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: collaborateur.couleur }}
                        ></div>
                        {collaborateur.nom}
                      </div>
                      <Check
                        className={`h-4 w-4 ${
                          isSelected ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Composant ResourceView intégré (version simplifiée de la vue tableau)
const ResourceView = ({
  events,
  collaborateurs,
  date,
  onSelectEvent,
  onSelectSlot,
  onNavigate,
  onEventDrop,
  onDuplicateEvent,
  userRole,
  userCollaborateurId,
  setEvents,
  // Props pour l'animation de démonstration
  isAnimatingDemo,
  setIsAnimatingDemo,
  demoAnimationEvent,
  setDemoAnimationEvent,
  demoAnimationProgress,
  setDemoAnimationProgress,
  demoAnimationPhase,
  setDemoAnimationPhase,
  isDemoCompleted,
  setIsDemoCompleted,
  demoDestination,
  setDemoDestination,
  hasAnimationPlayed,
  setHasAnimationPlayed,
  setIsInView,
  showMessage,
  setShowMessage,
}: {
  events: Evenement[];
  collaborateurs: Collaborateur[];
  date: Date;
  onSelectEvent: (event: Evenement) => void;
  onSelectSlot: (slotInfo: {
    start: Date;
    end: Date;
    collaborateurId: string;
  }) => void;
  onNavigate?: (date: Date) => void;
  onEventDrop?: (info: {
    event: Evenement;
    start: Date;
    end: Date;
    collaborateurId?: string;
  }) => void;
  onDuplicateEvent?: (
    event: Evenement,
    newDate: Date,
    newCollaborateurId?: string,
    isCollaborateurChange?: boolean
  ) => void;
  userRole?: Role;
  userCollaborateurId?: string;
  setEvents: React.Dispatch<React.SetStateAction<Evenement[]>>;
  // Props pour l'animation de démonstration
  isAnimatingDemo: boolean;
  setIsAnimatingDemo: React.Dispatch<React.SetStateAction<boolean>>;
  demoAnimationEvent: Evenement | null;
  setDemoAnimationEvent: React.Dispatch<React.SetStateAction<Evenement | null>>;
  demoAnimationProgress: number;
  setDemoAnimationProgress: React.Dispatch<React.SetStateAction<number>>;
  demoAnimationPhase: "preparing" | "moving" | "landing" | "complete";
  setDemoAnimationPhase: React.Dispatch<
    React.SetStateAction<"preparing" | "moving" | "landing" | "complete">
  >;
  isDemoCompleted: boolean;
  setIsDemoCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  demoDestination: { collaborateurId: string; dayIndex: number } | null;
  setDemoDestination: React.Dispatch<
    React.SetStateAction<{ collaborateurId: string; dayIndex: number } | null>
  >;
  hasAnimationPlayed: boolean;
  setHasAnimationPlayed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInView: React.Dispatch<React.SetStateAction<boolean>>;
  showMessage: boolean;
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  const [draggedEvent, setDraggedEvent] = useState<Evenement | null>(null);
  const [dragOverCell, setDragOverCell] = useState<{
    collaborateurId: string;
    day: Date;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedEventClone, setDraggedEventClone] = useState<Evenement | null>(
    null
  );

  // Configuration du scroll tracking pour l'animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation de démonstration au scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Déclencher l'animation quand on atteint 20% du scroll SEULEMENT si elle n'a jamais été jouée
    if (
      latest > 0.2 &&
      latest < 0.8 &&
      !isAnimatingDemo &&
      !hasAnimationPlayed &&
      events.length > 0
    ) {
      startDemoAnimation();
    }

    // Arrêter l'animation quand on sort de la zone (mais ne pas réinitialiser hasAnimationPlayed)
    if ((latest < 0.1 || latest > 0.9) && isAnimatingDemo) {
      stopDemoAnimation();
    }
    // MAJ de la visibilité du composant pour l'overlay
    setIsInView(latest > 0.1 && latest < 0.9);
  });

  // Fonction pour démarrer l'animation de démonstration
  const startDemoAnimation = useCallback(() => {
    if (
      events.length > 0 &&
      collaborateurs.length >= 3 &&
      !hasAnimationPlayed
    ) {
      // Marquer que l'animation a été jouée
      setHasAnimationPlayed(true);

      // Prendre le premier collaborateur et ses événements
      const firstCollaborateur = collaborateurs[0];
      const firstCollabEvent =
        events.find(
          (e) =>
            e.collaborateurId === firstCollaborateur.id &&
            e.typeEvenement === "presence"
        ) || events.find((e) => e.collaborateurId === firstCollaborateur.id);

      if (firstCollabEvent) {
        // Les 2 collaborateurs suivants dans la liste
        const targetCollaborateurs = [collaborateurs[1], collaborateurs[2]];

        // Trouver des jours libres pour chaque collaborateur cible
        const findFreeDay = (collaborateurId: string) => {
          for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
            // Lundi à vendredi
            const testDate = new Date(
              firstCollabEvent.start.getTime() + dayOffset * 24 * 60 * 60 * 1000
            );
            const hasEventOnDay = events.some((e) => {
              const eventDate = new Date(e.start);
              return (
                e.collaborateurId === collaborateurId &&
                eventDate.getDate() === testDate.getDate() &&
                eventDate.getMonth() === testDate.getMonth() &&
                eventDate.getFullYear() === testDate.getFullYear()
              );
            });
            if (!hasEventOnDay) {
              return { dayOffset, date: testDate };
            }
          }
          return {
            dayOffset: 1,
            date: new Date(
              firstCollabEvent.start.getTime() + 1 * 24 * 60 * 60 * 1000
            ),
          }; // Fallback
        };

        const freeSlots = targetCollaborateurs.map((collab) => ({
          collaborateur: collab,
          ...findFreeDay(collab.id),
        }));

        setIsAnimatingDemo(true);
        setDemoAnimationEvent(firstCollabEvent);
        setDemoAnimationPhase("preparing");

        // Destination : premier jour libre trouvé
        setDemoDestination({
          collaborateurId: freeSlots[0].collaborateur.id,
          dayIndex: freeSlots[0].dayOffset,
        });

        // Animation rapide
        setTimeout(() => {
          setDemoAnimationPhase("moving");
          setDemoAnimationProgress(0);

          const animationDuration = 800;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            const easedProgress =
              progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            setDemoAnimationProgress(easedProgress);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDemoAnimationPhase("landing");

              // Créer les événements dupliqués SEULEMENT sur les jours libres
              const clonedEvents = freeSlots.map((slot) => ({
                ...firstCollabEvent,
                id: firstCollabEvent.id + "_clone_" + slot.collaborateur.id,
                collaborateurId: slot.collaborateur.id,
                start: new Date(slot.date.getTime()),
                end: new Date(
                  slot.date.getTime() +
                    (firstCollabEvent.end.getTime() -
                      firstCollabEvent.start.getTime())
                ),
              }));

              // Ajouter TOUS les événements clonés aux événements permanents
              setEvents((prev) => [...prev, ...clonedEvents]);
              setDraggedEventClone(clonedEvents[0]); // Pour l'affichage

              setTimeout(() => {
                setDemoAnimationPhase("complete");
                setIsDemoCompleted(true);
                setShowMessage(true);

                // Faire disparaître le message après 1.5 seconde
                setTimeout(() => {
                  setShowMessage(false);
                }, 1500);

                setTimeout(() => {
                  setIsAnimatingDemo(false);
                  setDemoAnimationEvent(null);
                  setDemoAnimationProgress(0);
                  setDemoDestination(null);
                  setDemoAnimationPhase("preparing");
                  setDraggedEventClone(null);
                }, 800);
              }, 200);
            }
          };

          requestAnimationFrame(animate);
        }, 300);
      }
    }
  }, [events, collaborateurs, hasAnimationPlayed, setHasAnimationPlayed]);

  // Fonction pour arrêter l'animation de démonstration (sans nettoyer les événements)
  const stopDemoAnimation = useCallback(() => {
    setIsAnimatingDemo(false);
    setDemoAnimationEvent(null);
    setDemoAnimationProgress(0);
    setDemoDestination(null);
    setDemoAnimationPhase("preparing");
    setDraggedEventClone(null);
    // Ne pas nettoyer les événements - ils restent visible !
  }, []);

  // Initialiser la semaine en cours
  useEffect(() => {
    const startOfWeek = getStandardizedWeekStart(date);
    setCurrentWeekStart(startOfWeek);

    // Générer les jours de la semaine (lundi à samedi)
    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(normalizeDate(day));
    }
    setWeekDays(days);
  }, [date]);

  // Navigation entre les semaines
  const navigateToPreviousWeek = useCallback(() => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    const standardizedStart = getStandardizedWeekStart(newStart);

    if (onNavigate) {
      onNavigate(standardizedStart);
    }

    setCurrentWeekStart(standardizedStart);

    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(standardizedStart);
      day.setDate(standardizedStart.getDate() + i);
      days.push(normalizeDate(day));
    }
    setWeekDays(days);
  }, [currentWeekStart, onNavigate]);

  const navigateToNextWeek = useCallback(() => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    const standardizedStart = getStandardizedWeekStart(newStart);

    if (onNavigate) {
      onNavigate(standardizedStart);
    }

    setCurrentWeekStart(standardizedStart);

    const days = [];
    for (let i = 0; i < 6; i++) {
      const day = new Date(standardizedStart);
      day.setDate(standardizedStart.getDate() + i);
      days.push(normalizeDate(day));
    }
    setWeekDays(days);
  }, [currentWeekStart, onNavigate]);

  // Formater la date pour l'affichage
  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }, []);

  // Vérifier si un événement est pour un collaborateur et un jour spécifique
  const getEventsForCollaboratorAndDay = useCallback(
    (collaborateurId: string, day: Date) => {
      return events.filter((event) => {
        const eventDate = new Date(event.start);
        return (
          event.collaborateurId === collaborateurId &&
          eventDate.getDate() === day.getDate() &&
          eventDate.getMonth() === day.getMonth() &&
          eventDate.getFullYear() === day.getFullYear()
        );
      });
    },
    [events]
  );

  // Vérifier si un collaborateur a déjà un événement pour une date donnée
  const hasDayEvent = useCallback(
    (collaborateurId: string, date: Date, excludeEventId?: string): boolean => {
      if (!collaborateurId) return false;

      const dateString = normalizeDate(date).toISOString().split("T")[0];

      return events.some((event) => {
        if (event.collaborateurId !== collaborateurId) return false;
        if (excludeEventId && event.id === excludeEventId) return false;

        const eventStart =
          event.start instanceof Date ? event.start : new Date(event.start);
        const eventDateString = normalizeDate(eventStart)
          .toISOString()
          .split("T")[0];

        return dateString === eventDateString;
      });
    },
    [events]
  );

  // Formater l'heure pour l'affichage
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Gérer le clic sur une cellule vide
  const handleCellClick = useCallback(
    (collaborateurId: string, day: Date) => {
      const canCreate =
        userRole === "admin" ||
        userRole === "manager" ||
        (userRole === "collaborateur" &&
          collaborateurId === userCollaborateurId);

      if (canCreate) {
        const start = new Date(day);
        start.setHours(8, 0, 0, 0);
        const end = new Date(day);
        end.setHours(17, 0, 0, 0);
        onSelectSlot({ start, end, collaborateurId });
      }
    },
    [userRole, userCollaborateurId, onSelectSlot]
  );

  const formatWeekRange = () => {
    const endOfWeek = new Date(currentWeekStart);
    endOfWeek.setDate(currentWeekStart.getDate() + 5); // Samedi

    return `Semaine du ${currentWeekStart.getDate()} ${currentWeekStart.toLocaleDateString(
      "fr-FR",
      { month: "long" }
    )} ${currentWeekStart.getFullYear()}`;
  };

  // Gestion du drag & drop
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, event: Evenement) => {
      // Vérifier les permissions
      if (userRole !== "admin" && userRole !== "manager") {
        e.preventDefault();
        return;
      }

      if (event.verrouille) {
        e.preventDefault();
        return;
      }

      setDraggedEvent(event);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", event.id);
    },
    [userRole]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, collaborateurId: string, day: Date) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverCell({ collaborateurId, day });
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Vérifier si on quitte vraiment la cellule
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverCell(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, collaborateurId: string, day: Date) => {
      e.preventDefault();
      setDragOverCell(null);

      if (!draggedEvent) return;

      // Vérifier si c'est le même collaborateur et le même jour
      const eventDate = new Date(draggedEvent.start);
      const isSameDay =
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear();
      const isSameCollaborateur =
        draggedEvent.collaborateurId === collaborateurId;

      if (isSameDay && isSameCollaborateur) {
        setDraggedEvent(null);
        return;
      }

      // Vérifier si le collaborateur a déjà un événement ce jour-là (en excluant l'événement en cours de déplacement)
      if (hasDayEvent(collaborateurId, day, draggedEvent.id)) {
        alert(
          "Ce collaborateur a déjà un événement programmé pour cette date. Un seul événement par jour par collaborateur est autorisé."
        );
        setDraggedEvent(null);
        return;
      }

      // Créer les nouvelles dates pour l'événement
      const originalStart = new Date(draggedEvent.start);
      const originalEnd = new Date(draggedEvent.end);
      const duration = originalEnd.getTime() - originalStart.getTime();

      const newStart = new Date(day);
      newStart.setHours(
        originalStart.getHours(),
        originalStart.getMinutes(),
        0,
        0
      );

      const newEnd = new Date(newStart.getTime() + duration);

      // Utiliser onDuplicateEvent pour créer une copie
      if (onDuplicateEvent) {
        onDuplicateEvent(
          draggedEvent,
          newStart,
          collaborateurId,
          !isSameCollaborateur
        );
      }

      setDraggedEvent(null);
    },
    [draggedEvent, onDuplicateEvent, hasDayEvent]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedEvent(null);
    setDragOverCell(null);
  }, []);

  return (
    <div className="space-y-4" ref={containerRef}>
      {/* Indicateur d'animation de démonstration */}
      <AnimatePresence>
        {isAnimatingDemo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-500 border-t-transparent rounded-full shrink-0"
            />
            <span className="text-xs sm:text-sm text-blue-700 leading-tight">
              {demoAnimationPhase === "preparing" && "Préparation..."}
              {demoAnimationPhase === "moving" &&
                `Duplication en cours... (${Math.round(
                  demoAnimationProgress * 100
                )}%)`}
              {demoAnimationPhase === "landing" && "Création..."}
              {demoAnimationPhase === "complete" && "Événements dupliqués !"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation de semaine */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left w-full sm:w-auto">
          {formatWeekRange()}
        </h2>
        <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToPreviousWeek}
            className="flex-1 sm:flex-none"
          >
            <ChevronLeft className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Précédent</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={navigateToNextWeek}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight className="h-4 w-4 sm:ml-1" />
          </Button>
        </div>
      </div>

      {/* Tableau de planning */}
      <Card>
        <CardContent className="p-0">
          {/* Indicateur de scroll horizontal sur mobile */}
          <div className="block sm:hidden bg-blue-50 border-b border-blue-200 p-2 text-center">
            <span className="text-xs text-blue-700">
              👈 Faites défiler horizontalement pour voir plus de jours 👉
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="p-2 sm:p-3 text-left font-medium w-32 sm:w-48 bg-gray-50 sticky left-0 z-10">
                    <span className="text-xs sm:text-sm">Collaborateur</span>
                  </th>
                  {weekDays.map((day, index) => (
                    <th
                      key={index}
                      className="p-2 sm:p-3 text-center font-medium min-w-[140px] sm:min-w-[200px] bg-gray-50"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs sm:text-sm">
                          {formatDate(day)}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {collaborateurs.map((collaborateur) => (
                  <tr
                    key={collaborateur.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-2 sm:p-3 font-medium sticky left-0 bg-white z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: collaborateur.couleur }}
                        />
                        <span className="text-blue-600 text-xs sm:text-sm leading-tight">
                          <span className="block sm:inline">
                            {collaborateur.nom}
                          </span>
                          <span className="block sm:inline sm:ml-1">
                            {collaborateur.prenom}
                          </span>
                        </span>
                      </div>
                    </td>
                    {weekDays.map((day, dayIndex) => {
                      const dayEvents = getEventsForCollaboratorAndDay(
                        collaborateur.id,
                        day
                      );
                      const isWeekend =
                        day.getDay() === 0 || day.getDay() === 6;
                      const isHoliday = estJourFerie(day);
                      const isDragOver =
                        dragOverCell?.collaborateurId === collaborateur.id &&
                        dragOverCell?.day.getTime() === day.getTime();

                      return (
                        <td
                          key={dayIndex}
                          className={`p-1 sm:p-2 align-top cursor-pointer hover:bg-blue-50 transition-colors min-h-[80px] ${
                            isWeekend ? "bg-gray-100" : ""
                          } ${isHoliday ? "bg-red-100" : ""} ${
                            isDragOver
                              ? "bg-blue-100 border-2 border-blue-300"
                              : ""
                          }`}
                          onClick={() => handleCellClick(collaborateur.id, day)}
                          onDragOver={(e) =>
                            handleDragOver(e, collaborateur.id, day)
                          }
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, collaborateur.id, day)}
                        >
                          <div className="space-y-1">
                            {dayEvents.map((event) => {
                              // Logique pour l'animation de démonstration
                              const isDemoSourceEvent =
                                isAnimatingDemo &&
                                demoAnimationEvent?.id === event.id;

                              return (
                                <div
                                  key={event.id}
                                  draggable={
                                    userRole === "admin" ||
                                    userRole === "manager"
                                  }
                                  onDragStart={(e) => handleDragStart(e, event)}
                                  onDragEnd={handleDragEnd}
                                  className={`p-1 sm:p-2 rounded text-[10px] sm:text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                                    event.typeEvenement === "absence"
                                      ? event.typeAbsence === "RTT"
                                        ? "bg-orange-200"
                                        : event.typeAbsence === "CP"
                                        ? "bg-green-200"
                                        : "bg-red-200"
                                      : "bg-blue-200"
                                  } ${
                                    draggedEvent?.id === event.id
                                      ? "opacity-50"
                                      : ""
                                  } ${
                                    (userRole === "admin" ||
                                      userRole === "manager") &&
                                    !event.verrouille
                                      ? "cursor-grab active:cursor-grabbing"
                                      : ""
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectEvent(event);
                                  }}
                                >
                                  <motion.div
                                    // Animation de démonstration pour l'événement source
                                    animate={
                                      isDemoSourceEvent
                                        ? {
                                            scale:
                                              demoAnimationPhase === "preparing"
                                                ? 1.08
                                                : demoAnimationPhase ===
                                                  "moving"
                                                ? 1.02
                                                : 1,
                                            opacity:
                                              demoAnimationPhase === "moving"
                                                ? 0.9
                                                : 1,
                                            x:
                                              demoAnimationPhase === "moving"
                                                ? 120 * demoAnimationProgress
                                                : 0,
                                            y:
                                              demoAnimationPhase === "moving"
                                                ? -15 *
                                                  Math.sin(
                                                    demoAnimationProgress *
                                                      Math.PI
                                                  )
                                                : 0,
                                            boxShadow:
                                              demoAnimationPhase === "moving"
                                                ? `0 6px 20px rgba(59, 130, 246, 0.35)`
                                                : "0 0 0 rgba(59, 130, 246, 0)",
                                            zIndex:
                                              demoAnimationPhase === "moving"
                                                ? 50
                                                : 1,
                                            rotate:
                                              demoAnimationPhase === "moving"
                                                ? 3 * demoAnimationProgress
                                                : 0,
                                          }
                                        : {}
                                    }
                                    transition={{
                                      duration:
                                        demoAnimationPhase === "preparing"
                                          ? 0.2
                                          : demoAnimationPhase === "moving"
                                          ? 0.05
                                          : 0.3,
                                      ease:
                                        demoAnimationPhase === "moving"
                                          ? "easeOut"
                                          : "easeInOut",
                                    }}
                                  >
                                    <div className="font-medium truncate">
                                      {event.typeEvenement === "presence"
                                        ? event.lieuChantier
                                        : event.typeAbsence}
                                    </div>
                                    <div className="text-gray-600 text-[9px] sm:text-[10px]">
                                      {formatTime(event.start)} -{" "}
                                      {formatTime(event.end)}
                                    </div>
                                    {event.typeEvenement === "presence" && (
                                      <div className="flex flex-wrap gap-0.5 sm:gap-1 mt-0.5 sm:mt-1">
                                        {event.grandDeplacement && (
                                          <span className="bg-blue-100 text-blue-800 px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px]">
                                            GD
                                          </span>
                                        )}
                                        {event.zoneTrajet && (
                                          <span className="bg-gray-500 text-white px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px]">
                                            {event.zoneTrajet}
                                          </span>
                                        )}
                                        {event.panierRepas && (
                                          <span className="bg-green-100 text-green-800 px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px]">
                                            PR
                                          </span>
                                        )}
                                        {event.prgd && (
                                          <span className="bg-purple-100 text-purple-800 px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px] hidden sm:inline">
                                            PRGD: {event.nombrePrgd || 0}
                                          </span>
                                        )}
                                        {event.prgd && (
                                          <span className="bg-purple-100 text-purple-800 px-0.5 rounded text-[8px] sm:hidden">
                                            P:{event.nombrePrgd || 0}
                                          </span>
                                        )}
                                        {(event.heuresSupplementaires || 0) >
                                          0 && (
                                          <span className="bg-orange-100 text-orange-800 px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px]">
                                            HS:{" "}
                                            {event.heuresSupplementaires || 0}h
                                          </span>
                                        )}
                                        {event.ticketRestaurant && (
                                          <span className="bg-yellow-100 text-yellow-800 px-0.5 sm:px-1 rounded text-[8px] sm:text-[10px]">
                                            TR
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </motion.div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Composants simplifiés
const ExportPDF = () => (
  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
    <FileText className="h-4 w-4 sm:mr-2" />
    <span className="hidden sm:inline">Partager le planning</span>
    <span className="sm:hidden">Partager</span>
  </Button>
);

const Legend = () => (
  <Card>
    <CardContent className="p-4">
      <h3 className="font-semibold mb-3">Légende</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-200 rounded"></div>
          <span className="text-sm">RTT</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-200 rounded"></div>
          <span className="text-sm">Congés Payés</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-200 rounded"></div>
          <span className="text-sm">Arrêt Travail</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 rounded"></div>
          <span className="text-sm">Présence</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CommentModal = ({
  isOpen,
  onClose,
  event,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: Evenement | null;
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Commentaire de l&apos;événement</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="whitespace-pre-wrap">{event?.commentaire}</p>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>Fermer</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Composant EventTypeSelector intégré
const EventTypeSelector = ({
  isOpen,
  onClose,
  onSelectType,
  date,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: "presence" | "absence") => void;
  date: Date;
}) => {
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Nouvel événement
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-muted-foreground mb-6 text-sm">
            <CalendarIcon className="inline-block mr-2 h-4 w-4" />
            {formattedDate}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={() => onSelectType("presence")}
              className="h-24 sm:h-32 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="font-medium text-sm sm:text-base">Présence</span>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                Chantier, déplacement, etc.
              </span>
            </Button>
            <Button
              onClick={() => onSelectType("absence")}
              className="h-24 sm:h-32 flex flex-col items-center justify-center gap-2"
              variant="outline"
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <CalendarIcon className="h-4 w-4 sm:h-6 sm:w-6 text-orange-500" />
              </div>
              <span className="font-medium text-sm sm:text-base">Absence</span>
              <span className="text-xs text-muted-foreground text-center leading-tight">
                RTT, congés, arrêt, etc.
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Composant EventModal intégré (version complète avec géolocalisation)
const EventModal = ({
  isOpen,
  onClose,
  event,
  onSave,
  onDelete,
  collaborateurs,
  userRole = "admin",
}: {
  isOpen: boolean;
  onClose: () => void;
  event: Evenement | null;
  onSave: (event: Evenement) => void;
  onDelete: (eventId: string) => void;
  collaborateurs: Collaborateur[];
  userRole?: Role;
}) => {
  const [formData, setFormData] = useState<Partial<Evenement>>({});
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(
    null
  );
  const [calculatedZone, setCalculatedZone] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setFormData(event);

      // Calculer la distance et la zone si les coordonnées sont disponibles
      if (event.latitude && event.longitude) {
        const distance = calculateDistance(
          SIEGE_SOCIAL.latitude,
          SIEGE_SOCIAL.longitude,
          event.latitude,
          event.longitude
        );
        setCalculatedDistance(distance);
        setCalculatedZone(determineZoneTrajet(distance));
      } else {
        setCalculatedDistance(null);
        setCalculatedZone(null);
      }
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && event) {
      onSave({ ...event, ...formData } as Evenement);
    }
  };

  const handleInputChange = (
    field: string,
    value: string | number | boolean | Date
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Gérer la sélection d'une adresse géolocalisée
  const handleSelectAddress = (result: GeocodingResult) => {
    // Calculer la distance entre le siège social et l'adresse sélectionnée
    const distance = calculateDistance(
      SIEGE_SOCIAL.latitude,
      SIEGE_SOCIAL.longitude,
      result.latitude,
      result.longitude
    );

    // Déterminer la zone de trajet en fonction de la distance
    const zone = determineZoneTrajet(distance);

    setCalculatedDistance(distance);
    setCalculatedZone(zone);

    setFormData((prev) => ({
      ...prev,
      lieuChantier: result.address.split(",")[0], // Prendre la première partie de l'adresse comme nom du lieu
      adresseComplete: result.address,
      latitude: result.latitude,
      longitude: result.longitude,
      zoneTrajet: zone, // Définir automatiquement la zone de trajet
    }));
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-[700px] max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {event.id ? "Modifier l&apos;événement" : "Nouvel événement"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="collaborateur">Collaborateur</Label>
              <Select
                value={formData.collaborateurId || event.collaborateurId}
                onValueChange={(value) =>
                  handleInputChange("collaborateurId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un collaborateur" />
                </SelectTrigger>
                <SelectContent>
                  {collaborateurs.map((collab) => (
                    <SelectItem key={collab.id} value={collab.id}>
                      {collab.prenom} {collab.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Type d&apos;événement</Label>
              <Select
                value={formData.typeEvenement || event.typeEvenement}
                onValueChange={(value) =>
                  handleInputChange("typeEvenement", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="presence">Présence</SelectItem>
                  <SelectItem value="absence">Absence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(formData.typeEvenement || event.typeEvenement) === "presence" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="lieuChantier">Lieu de chantier</Label>
                <Input
                  id="lieuChantier"
                  value={formData.lieuChantier || event.lieuChantier || ""}
                  onChange={(e) =>
                    handleInputChange("lieuChantier", e.target.value)
                  }
                  placeholder="Lieu du chantier"
                />
              </div>

              <div>
                <Label htmlFor="adresse">
                  Adresse complète
                  <span className="text-xs text-muted-foreground ml-2">
                    (Géolocalisation pour calcul de zone)
                  </span>
                </Label>
                <AddressSearch
                  onSelectAddress={handleSelectAddress}
                  initialAddress={
                    formData.adresseComplete || event.adresseComplete || ""
                  }
                />

                {formData.latitude && formData.longitude && (
                  <div className="mt-2 text-xs text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    Coordonnées: {formData.latitude.toFixed(6)},{" "}
                    {formData.longitude.toFixed(6)}
                  </div>
                )}

                {calculatedDistance !== null && (
                  <div className="mt-2 flex items-center">
                    <Info className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="text-xs">
                      Distance: {calculatedDistance.toFixed(2)} km
                      {calculatedZone && (
                        <>
                          {" - "}
                          Zone suggérée:{" "}
                          <Badge variant="outline" className="text-xs ml-1">
                            {calculatedZone}
                          </Badge>
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="zoneTrajet">Zone de trajet</Label>
                <Select
                  value={formData.zoneTrajet || event.zoneTrajet || ""}
                  onValueChange={(value) =>
                    handleInputChange("zoneTrajet", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1A">Zone 1A (≤ 5 km)</SelectItem>
                    <SelectItem value="1B">Zone 1B (≤ 10 km)</SelectItem>
                    <SelectItem value="2">Zone 2 (≤ 22 km)</SelectItem>
                    <SelectItem value="3">Zone 3 (≤ 30 km)</SelectItem>
                    <SelectItem value="4">Zone 4 (≤ 42 km)</SelectItem>
                    <SelectItem value="5">Zone 5 (≤ 50 km)</SelectItem>
                    <SelectItem value="6">Zone 6 (≤ 55 km)</SelectItem>
                    <SelectItem value="7">Zone 7 (≤ 60 km)</SelectItem>
                    <SelectItem value="8">Zone 8 (≤ 72 km)</SelectItem>
                    <SelectItem value="9">Zone 9 (≤ 80 km)</SelectItem>
                    <SelectItem value="10">Zone 10 (≤ 92 km)</SelectItem>
                    <SelectItem value="11">Zone 11 (≤ 100 km)</SelectItem>
                    <SelectItem value="12">Zone 12 (≤ 122 km)</SelectItem>
                    <SelectItem value="13">Zone 13 (≤ 130 km)</SelectItem>
                    <SelectItem value="14">Zone 14 (≤ 142 km)</SelectItem>
                    <SelectItem value="15">Zone 15 (≤ 150 km)</SelectItem>
                    <SelectItem value="16">Zone 16 (≤ 162 km)</SelectItem>
                    <SelectItem value="17">Zone 17 (≤ 170 km)</SelectItem>
                    <SelectItem value="18">Zone 18 (≤ 182 km)</SelectItem>
                    <SelectItem value="19">Zone 19 (≤ 190 km)</SelectItem>
                    <SelectItem value="20">Zone 20 (≤ 200 km)</SelectItem>
                    <SelectItem value="21">Zone 21 (≤ 220 km)</SelectItem>
                    <SelectItem value="22">Zone 22 (≤ 232 km)</SelectItem>
                    <SelectItem value="23">Zone 23 (≤ 240 km)</SelectItem>
                    <SelectItem value="24">Zone 24 (≤ 250 km)</SelectItem>
                  </SelectContent>
                </Select>
                {calculatedZone && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Zone automatiquement calculée:{" "}
                    <strong>{calculatedZone}</strong>
                  </p>
                )}
              </div>
            </div>
          )}

          {(formData.typeEvenement || event.typeEvenement) === "absence" && (
            <div>
              <Label htmlFor="typeAbsence">Type d&apos;absence</Label>
              <Select
                value={formData.typeAbsence || event.typeAbsence}
                onValueChange={(value) =>
                  handleInputChange("typeAbsence", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type d'absence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RTT">RTT</SelectItem>
                  <SelectItem value="CP">Congés payés</SelectItem>
                  <SelectItem value="Arrêt Travail">
                    Arrêt de travail
                  </SelectItem>
                  <SelectItem value="Accident Travail">
                    Accident de travail
                  </SelectItem>
                  <SelectItem value="Absence autorisée">
                    Absence autorisée
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start">Heure de début</Label>
              <Input
                id="start"
                type="time"
                value={
                  formData.start
                    ? format(new Date(formData.start), "HH:mm")
                    : format(event.start, "HH:mm")
                }
                onChange={(e) => {
                  const [hours, minutes] = e.target.value
                    .split(":")
                    .map(Number);
                  const newStart = new Date(event.start);
                  newStart.setHours(hours, minutes);
                  handleInputChange("start", newStart);
                }}
              />
            </div>
            <div>
              <Label htmlFor="end">Heure de fin</Label>
              <Input
                id="end"
                type="time"
                value={
                  formData.end
                    ? format(new Date(formData.end), "HH:mm")
                    : format(event.end, "HH:mm")
                }
                onChange={(e) => {
                  const [hours, minutes] = e.target.value
                    .split(":")
                    .map(Number);
                  const newEnd = new Date(event.end);
                  newEnd.setHours(hours, minutes);
                  handleInputChange("end", newEnd);
                }}
              />
            </div>
          </div>

          {(formData.typeEvenement || event.typeEvenement) === "presence" && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ticketRestaurant"
                  checked={formData.ticketRestaurant ?? event.ticketRestaurant}
                  onCheckedChange={(checked) =>
                    handleInputChange("ticketRestaurant", checked)
                  }
                />
                <Label htmlFor="ticketRestaurant">Ticket restaurant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="panierRepas"
                  checked={formData.panierRepas ?? event.panierRepas}
                  onCheckedChange={(checked) =>
                    handleInputChange("panierRepas", checked)
                  }
                />
                <Label htmlFor="panierRepas">Panier repas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="grandDeplacement"
                  checked={formData.grandDeplacement ?? event.grandDeplacement}
                  onCheckedChange={(checked) =>
                    handleInputChange("grandDeplacement", checked)
                  }
                />
                <Label htmlFor="grandDeplacement">Grand déplacement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="prgd"
                  checked={formData.prgd ?? event.prgd}
                  onCheckedChange={(checked) =>
                    handleInputChange("prgd", checked)
                  }
                />
                <Label htmlFor="prgd">PRGD</Label>
              </div>
              {(formData.prgd ?? event.prgd) && (
                <div>
                  <Label htmlFor="nombrePrgd">Nombre PRGD</Label>
                  <Input
                    id="nombrePrgd"
                    type="number"
                    min="0"
                    value={formData.nombrePrgd ?? event.nombrePrgd ?? 0}
                    onChange={(e) =>
                      handleInputChange(
                        "nombrePrgd",
                        parseInt(e.target.value) || 0
                      )
                    }
                  />
                </div>
              )}
              <div>
                <Label htmlFor="heuresSupplementaires">
                  Heures supplémentaires
                </Label>
                <Input
                  id="heuresSupplementaires"
                  type="number"
                  min="0"
                  step="0.5"
                  value={
                    formData.heuresSupplementaires ??
                    event.heuresSupplementaires ??
                    0
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "heuresSupplementaires",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="commentaire">Commentaire</Label>
            <Textarea
              id="commentaire"
              value={formData.commentaire || event.commentaire || ""}
              onChange={(e) => handleInputChange("commentaire", e.target.value)}
              placeholder="Commentaire optionnel"
              rows={3}
            />
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {event.id && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onDelete(event.id)}
                >
                  Supprimer
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Sauvegarder</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default function PlanningDemo({
  userRole = "admin",
  userCollaborateurId = "1",
  customCollaborateurs,
  customEvenements,
  onEventSelect,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
}: PlanningDemoProps) {
  // États locaux (mêmes que l'original)
  const [collaborateurs] = useState<Collaborateur[]>(
    customCollaborateurs || DEMO_COLLABORATEURS
  );
  const [events, setEvents] = useState<Evenement[]>(
    customEvenements || DEMO_EVENEMENTS
  );
  const [date, setDate] = useState(() => {
    // Initialiser avec la date actuelle
    const now = new Date();
    return startOfWeek(now, { locale: fr });
  });

  const [selectedCollaborateurs, setSelectedCollaborateurs] = useState<
    string[]
  >([]);
  const [isLoading] = useState(false);
  const [selectedCommentEvent, setSelectedCommentEvent] =
    useState<Evenement | null>(null);

  // États pour les modaux (copiés de l'original)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Evenement | null>(null);
  const [tempSlotInfo, setTempSlotInfo] = useState<{
    start: Date;
    end: Date;
    collaborateurId?: string;
  } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [isSpecialDayDialogOpen, setIsSpecialDayDialogOpen] = useState(false);
  const [specialDaySlotInfo, setSpecialDaySlotInfo] = useState<{
    start: Date;
    end: Date;
    collaborateurId?: string;
    isHoliday: boolean;
    isWeekend: boolean;
  } | null>(null);

  // Simulation des hooks d'authentification
  const isAuthenticated = true;
  const canManageEvents = userRole === "admin" || userRole === "manager";

  // Initialiser les collaborateurs sélectionnés
  useEffect(() => {
    setSelectedCollaborateurs(collaborateurs.map((c) => c.id));
  }, [collaborateurs]);

  const currentWeekStart = useMemo(() => {
    return startOfWeek(date, { locale: fr });
  }, [date]);

  // Les collaborateurs sont maintenant tous visibles
  const filteredCollaborateurs = useMemo(() => {
    return collaborateurs;
  }, [collaborateurs]);

  // Fonction pour vérifier si un collaborateur a déjà un événement pour une date donnée
  const hasDayEvent = useCallback(
    (collaborateurId: string, date: Date, excludeEventId?: string): boolean => {
      if (!collaborateurId) return false;

      const dateString = normalizeDate(date).toISOString().split("T")[0];

      return events.some((event) => {
        if (event.collaborateurId !== collaborateurId) return false;
        if (excludeEventId && event.id === excludeEventId) return false;

        const eventStart =
          event.start instanceof Date ? event.start : new Date(event.start);
        const eventDateString = normalizeDate(eventStart)
          .toISOString()
          .split("T")[0];

        return dateString === eventDateString;
      });
    },
    [events]
  );

  const handleSelectEvent = useCallback(
    (event: Evenement) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
      onEventSelect?.(event);
    },
    [onEventSelect]
  );

  const handleSelectSlot = useCallback(
    (slotInfo: { start: Date; end: Date; collaborateurId?: string }) => {
      if (!canManageEvents) {
        alert(
          "Seuls les administrateurs et managers peuvent créer des événements."
        );
        return;
      }

      if (
        slotInfo.collaborateurId &&
        hasDayEvent(slotInfo.collaborateurId, slotInfo.start)
      ) {
        alert(
          "Ce collaborateur a déjà un événement programmé pour cette date."
        );
        return;
      }

      const isHoliday = estJourFerie(slotInfo.start);
      const isWeekend = estWeekend(slotInfo.start);

      if (isHoliday || isWeekend) {
        setSpecialDaySlotInfo({
          ...slotInfo,
          isHoliday,
          isWeekend,
        });
        setIsSpecialDayDialogOpen(true);
        return;
      }

      setTempSlotInfo(slotInfo);
      setIsTypeSelectorOpen(true);
    },
    [canManageEvents, hasDayEvent]
  );

  // Gérer la sélection du type d'événement
  const handleSelectEventType = useCallback(
    (type: "presence" | "absence") => {
      if (!tempSlotInfo) return;

      const newEvent: Evenement = {
        id: crypto.randomUUID(),
        title: "",
        start: tempSlotInfo.start,
        end: tempSlotInfo.end,
        collaborateurId: tempSlotInfo.collaborateurId || "",
        typeEvenement: type,
        typeAbsence: type === "absence" ? "RTT" : undefined,
        lieuChantier: type === "presence" ? "" : undefined,
        zoneTrajet: type === "presence" ? "" : undefined,
        panierRepas: false,
        heuresSupplementaires: 0,
        grandDeplacement: false,
        prgd: false,
        nombrePrgd: 0,
        verrouille: false,
        ticketRestaurant: false,
      };

      setSelectedEvent(newEvent);
      setIsTypeSelectorOpen(false);
      setIsModalOpen(true);
    },
    [tempSlotInfo]
  );

  // Confirmer la création d'un événement sur un jour spécial
  const confirmSpecialDayEvent = useCallback(() => {
    if (specialDaySlotInfo) {
      setTempSlotInfo({
        start: specialDaySlotInfo.start,
        end: specialDaySlotInfo.end,
        collaborateurId: specialDaySlotInfo.collaborateurId,
      });
      setIsTypeSelectorOpen(true);
    }
    setIsSpecialDayDialogOpen(false);
    setSpecialDaySlotInfo(null);
  }, [specialDaySlotInfo]);

  // Sauvegarder un événement
  const handleSaveEvent = useCallback(
    (event: Evenement) => {
      if (!canManageEvents) {
        alert(
          "Seuls les administrateurs et managers peuvent gérer les événements."
        );
        return;
      }

      const isNewEvent = !events.find((e) => e.id === event.id);

      if (isNewEvent) {
        setEvents((prev) => [...prev, event]);
        onEventCreate?.(event);
      } else {
        setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
        onEventUpdate?.(event);
      }

      setIsModalOpen(false);
      setSelectedEvent(null);
    },
    [canManageEvents, events, onEventCreate, onEventUpdate]
  );

  // Supprimer un événement
  const handleDeleteEvent = useCallback((eventId: string) => {
    setEventToDelete(eventId);
    setIsDeleteDialogOpen(true);
  }, []);

  const confirmDeleteEvent = useCallback(() => {
    if (!eventToDelete) return;

    if (!canManageEvents) {
      alert(
        "Seuls les administrateurs et managers peuvent supprimer des événements."
      );
      return;
    }

    setEvents((prev) => prev.filter((e) => e.id !== eventToDelete));
    onEventDelete?.(eventToDelete);
    setIsModalOpen(false);
    setSelectedEvent(null);
    setEventToDelete(null);
    setIsDeleteDialogOpen(false);
  }, [eventToDelete, canManageEvents, onEventDelete]);

  // Filtrer les événements selon les collaborateurs sélectionnés
  const filteredEvents = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }
    const filtered = events.filter(
      (event) =>
        event.collaborateurId &&
        selectedCollaborateurs.includes(event.collaborateurId)
    );
    return filtered;
  }, [events, selectedCollaborateurs]);

  // Filtrer les collaborateurs visibles
  const visibleCollaborateurs = useMemo(() => {
    return filteredCollaborateurs;
  }, [filteredCollaborateurs]);

  // Navigation avec préchargement intelligent
  const handleNavigate = (newDateRaw: Date) => {
    const newDate = normalizeDate(newDateRaw);
    setDate(newDate);
  };

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
    collaborateurId: string;
  } | null>(null);

  // États pour l'animation de démonstration
  const [isAnimatingDemo, setIsAnimatingDemo] = useState(false);
  const [demoAnimationEvent, setDemoAnimationEvent] =
    useState<Evenement | null>(null);
  const [demoAnimationProgress, setDemoAnimationProgress] = useState(0);
  const [demoAnimationPhase, setDemoAnimationPhase] = useState<
    "preparing" | "moving" | "landing" | "complete"
  >("preparing");
  const [isDemoCompleted, setIsDemoCompleted] = useState(false);
  const [demoDestination, setDemoDestination] = useState<{
    collaborateurId: string;
    dayIndex: number;
  } | null>(null);
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  // Ajout de l'état pour la visibilité du composant (doit être ici AVANT le useMotionValueEvent)
  const [isInView, setIsInView] = useState(true);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <>
      {/* Overlay d'invitation complètement séparé */}
      <AnimatePresence mode="wait">
        {isDemoCompleted && isInView && showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.4,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: 999999,
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-full shadow-2xl pointer-events-auto mx-4"
              style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(59, 130, 246, 0.5)",
                    "0 0 25px rgba(59, 130, 246, 0.8)",
                    "0 0 0 rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center justify-center gap-2 font-semibold text-center max-w-sm sm:max-w-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">👆</span>
                  <span className="text-base sm:text-lg">
                    Essayez vous-même !
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-normal opacity-90 leading-relaxed">
                  Vous pouvez déplacer des événements existants ou en créer un
                  nouveau en cliquant sur un jour libre, puis le déplacer vers
                  d&apos;autres collaborateurs.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4 bg-white text-gray-900 light relative">
        {/* En-tête avec titre et contrôles */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Planning Web - Jungle
          </h1>
        </div>

        {/* Ajouter un indicateur de rôle pour le débogage */}

        {/* En-tête compact du planning */}
        <div className="flex flex-col gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg border border-blue-100 text-gray-900">
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
            <div className="w-full sm:flex-1 sm:max-w-[400px]">
              <MultiSelectCollaborateurs
                collaborateurs={visibleCollaborateurs}
                selectedCollaborateurs={selectedCollaborateurs}
                onChange={setSelectedCollaborateurs}
                disabled={false}
              />
            </div>
          </div>
        </div>

        {/* Barre d'informations */}

        <>
          <ResourceView
            events={filteredEvents}
            collaborateurs={visibleCollaborateurs.filter((c) =>
              selectedCollaborateurs.includes(c.id)
            )}
            date={date}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            onNavigate={handleNavigate}
            onEventDrop={(info) => {
              // Gérer le drop d'événement
              if (onEventUpdate) {
                const updatedEvent = {
                  ...info.event,
                  start: info.start,
                  end: info.end,
                  collaborateurId:
                    info.collaborateurId || info.event.collaborateurId,
                };
                setEvents((prev) =>
                  prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
                );
                onEventUpdate(updatedEvent);
              }
            }}
            onDuplicateEvent={(
              event,
              newDate,
              newCollaborateurId,
              isCollaborateurChange
            ) => {
              // Créer une copie de l'événement
              const newEvent: Evenement = {
                ...event,
                id: crypto.randomUUID(),
                start: newDate,
                end: new Date(
                  newDate.getTime() +
                    (new Date(event.end).getTime() -
                      new Date(event.start).getTime())
                ),
                collaborateurId: newCollaborateurId || event.collaborateurId,
              };

              setEvents((prev) => [...prev, newEvent]);
              onEventCreate?.(newEvent);
            }}
            userRole={userRole}
            userCollaborateurId={userCollaborateurId || ""}
            setEvents={setEvents}
            // Props pour l'animation de démonstration
            isAnimatingDemo={isAnimatingDemo}
            setIsAnimatingDemo={setIsAnimatingDemo}
            demoAnimationEvent={demoAnimationEvent}
            setDemoAnimationEvent={setDemoAnimationEvent}
            demoAnimationProgress={demoAnimationProgress}
            setDemoAnimationProgress={setDemoAnimationProgress}
            demoAnimationPhase={demoAnimationPhase}
            setDemoAnimationPhase={setDemoAnimationPhase}
            isDemoCompleted={isDemoCompleted}
            setIsDemoCompleted={setIsDemoCompleted}
            demoDestination={demoDestination}
            setDemoDestination={setDemoDestination}
            hasAnimationPlayed={hasAnimationPlayed}
            setHasAnimationPlayed={setHasAnimationPlayed}
            setIsInView={setIsInView}
            showMessage={showMessage}
            setShowMessage={setShowMessage}
          />
          <Legend />
        </>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-4 flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs sm:text-sm truncate">
                  Collaborateurs actifs
                </span>
              </div>
              <Badge variant="outline" className="text-xs sm:text-sm shrink-0">
                {selectedCollaborateurs.length}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4 flex flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-xs sm:text-sm truncate">
                  Événements planifiés
                </span>
              </div>
              <Badge variant="outline" className="text-xs sm:text-sm shrink-0">
                {filteredEvents.length}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <CommentModal
          isOpen={!!selectedCommentEvent}
          onClose={() => setSelectedCommentEvent(null)}
          event={selectedCommentEvent}
        />

        {/* Modal de sélection du type d'événement */}
        {isTypeSelectorOpen && tempSlotInfo && (
          <EventTypeSelector
            isOpen={isTypeSelectorOpen}
            onClose={() => setIsTypeSelectorOpen(false)}
            onSelectType={handleSelectEventType}
            date={tempSlotInfo.start}
          />
        )}

        {/* Modal d'édition d'événement */}
        {isModalOpen && (
          <EventModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedEvent(null);
            }}
            event={selectedEvent}
            onSave={handleSaveEvent}
            onDelete={handleDeleteEvent}
            collaborateurs={visibleCollaborateurs}
            userRole={userRole}
          />
        )}

        {/* Dialogue de confirmation de suppression */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmer la suppression</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              Voulez-vous vraiment supprimer cet événement ? Cette action est
              irréversible.
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Annuler
              </Button>
              <Button variant="destructive" onClick={confirmDeleteEvent}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialogue de confirmation pour les jours spéciaux */}
        <Dialog
          open={isSpecialDayDialogOpen}
          onOpenChange={setIsSpecialDayDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {specialDaySlotInfo?.isHoliday
                  ? "Jour férié"
                  : specialDaySlotInfo?.isWeekend
                  ? "Jour de weekend"
                  : "Jour spécial"}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {specialDaySlotInfo?.isHoliday && (
                <p className="text-red-500 mb-4">
                  Cette date est un jour férié. Êtes-vous sûr de vouloir créer
                  un événement à cette date ?
                </p>
              )}
              {specialDaySlotInfo?.isWeekend &&
                !specialDaySlotInfo?.isHoliday && (
                  <p className="text-amber-500 mb-4">
                    Cette date est un jour de weekend. Êtes-vous sûr de vouloir
                    créer un événement à cette date ?
                  </p>
                )}
              <p>
                Date :{" "}
                {specialDaySlotInfo &&
                  format(specialDaySlotInfo.start, "dd/MM/yyyy")}
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSpecialDayDialogOpen(false);
                  setSpecialDaySlotInfo(null);
                }}
              >
                Annuler
              </Button>
              <Button onClick={confirmSpecialDayEvent}>Créer quand même</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
