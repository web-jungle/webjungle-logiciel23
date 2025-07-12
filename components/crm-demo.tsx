"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  Archive,
  BarChart3,
  Building,
  Car,
  ChevronLeft,
  ChevronRight,
  Edit,
  Euro,
  FileText,
  Home,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  PieChart,
  Search,
  Shield,
  Star,
  Sun,
  Thermometer,
  TrendingUp,
  UserPlus,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

// ===== TYPES LOCAUX =====
export type ContactCategory =
  | "CAT1"
  | "CAT2"
  | "CAT3"
  | "CAT4"
  | "CAT5"
  | "CAT6"
  | "CAT7"
  | "CAT8"
  | "CAT9"
  | "CAT10";

export type ContactStatus =
  | "À contacter"
  | "VT à programmer"
  | "VT programmé"
  | "Devis à faire"
  | "Devis envoyé"
  | "Travaux à réaliser"
  | "À facturer"
  | "Terminé";

export interface Document {
  id: string;
  nom: string;
  type: string;
  dateAjout: Date;
  url: string;
  taille: number; // en Ko
}

export interface Contact {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  categories: ContactCategory[];
  status: ContactStatus;
  commentaires: string;
  dateCreation: Date;
  dateDerniereModification: Date;
  utilisateurId: string;
  collaborateursIds: string[];
  documents: Document[];
  alertesIgnorees?: string[];
  archived?: boolean;
  archiveDate?: Date;
  montantDevis?: number;
  important?: boolean;
}

// ===== DONNÉES LOCALES =====
const contactStatuses: ContactStatus[] = [
  "À contacter",
  "VT à programmer",
  "VT programmé",
  "Devis à faire",
  "Devis envoyé",
  "Travaux à réaliser",
  "À facturer",
  "Terminé",
];

const contactCategories: ContactCategory[] = [
  "CAT1",
  "CAT2",
  "CAT3",
  "CAT4",
  "CAT5",
  "CAT6",
  "CAT7",
  "CAT8",
  "CAT9",
  "CAT10",
];

const getCategoryIcon = (category: ContactCategory) => {
  switch (category) {
    case "CAT1":
      return <Car className="h-4 w-4" />;
    case "CAT2":
      return <Shield className="h-4 w-4" />;
    case "CAT3":
      return <Zap className="h-4 w-4" />;
    case "CAT4":
      return <Thermometer className="h-4 w-4" />;
    case "CAT5":
      return <Thermometer className="h-4 w-4" />;
    case "CAT6":
      return <Sun className="h-4 w-4" />;
    case "CAT7":
      return <Home className="h-4 w-4" />;
    case "CAT8":
      return <Building className="h-4 w-4" />;
    case "CAT9":
      return <Wrench className="h-4 w-4" />;
    case "CAT10":
      return <Star className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: ContactCategory) => {
  switch (category) {
    case "CAT1":
      return "bg-blue-100 text-blue-800";
    case "CAT2":
      return "bg-red-100 text-red-800";
    case "CAT3":
      return "bg-yellow-100 text-yellow-800";
    case "CAT4":
      return "bg-green-100 text-green-800";
    case "CAT5":
      return "bg-cyan-100 text-cyan-800";
    case "CAT6":
      return "bg-orange-100 text-orange-800";
    case "CAT8":
      return "bg-purple-100 text-purple-800";
    case "CAT9":
      return "bg-gray-100 text-gray-800";
    case "CAT10":
      return "bg-indigo-100 text-indigo-800";
    case "CAT9":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Données de démonstration
const contactsInitiaux: Contact[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    telephone: "06 12 34 56 78",
    adresse: "123 Rue de Paris",
    codePostal: "75001",
    ville: "Paris",
    categories: ["CAT1", "CAT2"],
    status: "À contacter",
    commentaires:
      "Client intéressé par une installation électrique complète et un système d'alarme.",
    dateCreation: new Date(2023, 0, 15),
    dateDerniereModification: new Date(2023, 0, 15),
    utilisateurId: "1",
    collaborateursIds: ["1", "3"],
    documents: [],
    montantDevis: 3500,
    important: true,
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.com",
    telephone: "07 23 45 67 89",
    adresse: "456 Avenue des Champs",
    codePostal: "69002",
    ville: "Lyon",
    categories: ["CAT1", "CAT2"],
    status: "À contacter",
    commentaires:
      "Souhaite installer des panneaux solaires et une pompe à chaleur. Disponible les après-midis.",
    dateCreation: new Date(2023, 1, 20),
    dateDerniereModification: new Date(2023, 2, 5),
    utilisateurId: "1",
    collaborateursIds: ["2"],
    documents: [],
    montantDevis: 12500,
  },
  {
    id: "3",
    nom: "Petit",
    prenom: "Robert",
    email: "robert.petit@example.com",
    telephone: "06 34 56 78 90",
    adresse: "789 Boulevard Saint-Michel",
    codePostal: "33000",
    ville: "Bordeaux",
    categories: ["CAT1", "CAT2"],
    status: "Devis envoyé",
    commentaires:
      "Installation d'une borne de recharge pour véhicule électrique. Devis envoyé le 10/03/2023.",
    dateCreation: new Date(2023, 2, 1),
    dateDerniereModification: new Date(2023, 2, 10),
    utilisateurId: "2",
    collaborateursIds: ["2", "4"],
    documents: [],
    montantDevis: 2450.75,
  },
  {
    id: "4",
    nom: "Leroy",
    prenom: "Marie",
    email: "marie.leroy@example.com",
    telephone: "07 45 67 89 01",
    adresse: "101 Rue de la République",
    codePostal: "13001",
    ville: "Marseille",
    categories: ["CAT1", "CAT2"],
    status: "VT à programmer",
    commentaires:
      "Rénovation complète de l'installation électrique. Travaux prévus pour avril 2023.",
    dateCreation: new Date(2023, 1, 5),
    dateDerniereModification: new Date(2023, 3, 1),
    utilisateurId: "2",
    collaborateursIds: ["3"],
    documents: [],
    montantDevis: 8750,
  },
  {
    id: "5",
    nom: "Moreau",
    prenom: "Thomas",
    email: "thomas.moreau@example.com",
    telephone: "06 56 78 90 12",
    adresse: "202 Avenue Jean Jaurès",
    codePostal: "59000",
    ville: "Lille",
    categories: ["CAT1", "CAT2"],
    status: "VT programmé",
    commentaires:
      "Visite technique programmée le 15/04/2023 à 14h pour installation d'un chauffe-eau thermodynamique.",
    dateCreation: new Date(2023, 3, 1),
    dateDerniereModification: new Date(2023, 3, 5),
    utilisateurId: "1",
    collaborateursIds: ["1", "5"],
    documents: [],
    montantDevis: 4200,
  },
  {
    id: "6",
    nom: "Bernard",
    prenom: "Claire",
    email: "claire.bernard@example.com",
    telephone: "06 67 89 01 23",
    adresse: "303 Rue Victor Hugo",
    codePostal: "44000",
    ville: "Nantes",
    categories: ["CAT1", "CAT2"],
    status: "À facturer",
    commentaires: "Installation terminée. Facture en attente d'envoi.",
    dateCreation: new Date(2023, 0, 10),
    dateDerniereModification: new Date(2023, 4, 20),
    utilisateurId: "1",
    collaborateursIds: ["2"],
    documents: [],
    montantDevis: 5800,
  },
  {
    id: "7",
    nom: "Roux",
    prenom: "Pierre",
    email: "pierre.roux@example.com",
    telephone: "07 78 90 12 34",
    adresse: "404 Place de la Mairie",
    codePostal: "67000",
    ville: "Strasbourg",
    categories: ["CAT1", "CAT2"],
    status: "Terminé",
    commentaires:
      "Installation photovoltaïque terminée avec succès. Client très satisfait.",
    dateCreation: new Date(2023, 0, 5),
    dateDerniereModification: new Date(2023, 4, 15),
    utilisateurId: "2",
    collaborateursIds: ["3"],
    documents: [],
    montantDevis: 15000,
  },
  {
    id: "8",
    nom: "Garnier",
    prenom: "Isabelle",
    email: "isabelle.garnier@example.com",
    telephone: "06 89 01 23 45",
    adresse: "505 Boulevard de la Liberté",
    codePostal: "31000",
    ville: "Toulouse",
    categories: ["CAT1", "CAT2"],
    status: "Devis à faire",
    commentaires:
      "Demande de devis pour rénovation électrique et installation chauffe-eau.",
    dateCreation: new Date(2023, 4, 1),
    dateDerniereModification: new Date(2023, 4, 1),
    utilisateurId: "1",
    collaborateursIds: ["1"],
    documents: [],
    important: true,
  },
];

export default function CRMDemo() {
  // États locaux
  const [contacts, setContacts] = useState<Contact[]>(contactsInitiaux);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ContactCategory | "all">(
    "all"
  );
  const [activeTab, setActiveTab] = useState("kanban");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // États pour l'animation de démonstration
  const [isDemoCompleted, setIsDemoCompleted] = useState(false);
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration du scroll tracking pour l'animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation de démonstration au scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Déclencher l'animation quand on atteint 30% du scroll SEULEMENT si elle n'a jamais été jouée
    if (
      latest > 0.3 &&
      latest < 0.8 &&
      !hasAnimationPlayed &&
      contacts.length > 0
    ) {
      startDemoAnimation();
    }
  });

  // Fonction pour démarrer l'animation de démonstration
  const startDemoAnimation = useCallback(() => {
    if (contacts.length > 0 && !hasAnimationPlayed) {
      // Marquer que l'animation a été jouée
      setHasAnimationPlayed(true);

      // Simuler une création de contact et afficher le message
      setTimeout(() => {
        setIsDemoCompleted(true);
        setShowMessage(true);

        // Faire disparaître le message après 1.5 seconde
        setTimeout(() => {
          setShowMessage(false);
        }, 1500);
      }, 1000);
    }
  }, [contacts, hasAnimationPlayed]);

  // Configuration des capteurs pour le drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Distance très courte pour activation rapide
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Fonctions utilitaires
  const getActiveContacts = () => contacts.filter((c) => !c.archived);
  const getArchivedContacts = () => contacts.filter((c) => c.archived);
  const getFilteredContacts = () => {
    let filtered = getActiveContacts();

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.telephone.includes(searchTerm) ||
          c.ville.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((c) => c.categories.includes(categoryFilter));
    }

    return filtered;
  };

  const getContactCategories = () => {
    const categories = new Set<ContactCategory>();
    contacts.forEach((c) => c.categories.forEach((cat) => categories.add(cat)));
    return Array.from(categories);
  };

  // Gestion du drag and drop
  const handleContactDrop = useCallback(
    async (contactId: string, newStatus: string) => {
      const contact = contacts.find((c) => c.id === contactId);
      if (!contact || contact.status === newStatus) return;

      const updatedContacts = contacts.map((c) =>
        c.id === contactId
          ? {
              ...c,
              status: newStatus as ContactStatus,
              dateDerniereModification: new Date(),
            }
          : c
      );
      setContacts(updatedContacts);

      toast({
        title: "Contact mis à jour",
        description: `${contact.prenom} ${contact.nom} a été déplacé vers "${newStatus}".`,
      });
    },
    [contacts, setContacts]
  );

  const handleGlobalDragStart = useCallback(() => {
    // Fonctionnalité de drag start simplifiée pour de meilleures performances
  }, []);

  const handleGlobalDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      // Drop entre colonnes du Kanban
      const contactId = active.id as string;
      const contact = contacts.find((c) => c.id === contactId);
      if (!contact) return;

      let destinationStatus: ContactStatus | undefined;

      if (contactStatuses.includes(over.id as ContactStatus)) {
        destinationStatus = over.id as ContactStatus;
      } else if (over.data?.current?.status) {
        destinationStatus = over.data.current.status as ContactStatus;
      }

      if (!destinationStatus || destinationStatus === contact.status) return;
      await handleContactDrop(contactId, destinationStatus);
    },
    [contacts, handleContactDrop]
  );

  // Gestion des contacts
  const handleEditContact = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  }, []);

  const handleCreateContact = useCallback(() => {
    setSelectedContact(null);
    setIsFormOpen(true);
  }, []);

  const handleArchiveContact = useCallback(
    (contact: Contact) => {
      const updatedContacts = contacts.map((c) =>
        c.id === contact.id
          ? { ...c, archived: true, archiveDate: new Date() }
          : c
      );
      setContacts(updatedContacts);
      toast({
        title: "Contact archivé",
        description: `${contact.prenom} ${contact.nom} a été archivé avec succès.`,
      });
    },
    [contacts]
  );

  const handleSaveContact = useCallback(
    (updatedContact: Contact) => {
      if (
        updatedContact.id &&
        contacts.find((c) => c.id === updatedContact.id)
      ) {
        // Modification d'un contact existant
        const updatedContacts = contacts.map((c) =>
          c.id === updatedContact.id ? updatedContact : c
        );
        setContacts(updatedContacts);
        toast({
          title: "Contact mis à jour",
          description: `Les informations de ${updatedContact.prenom} ${updatedContact.nom} ont été mises à jour.`,
        });
      } else {
        // Création d'un nouveau contact
        const newContact = {
          ...updatedContact,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          dateCreation: new Date(),
          dateDerniereModification: new Date(),
          utilisateurId: "demo-user",
          collaborateursIds: [],
          documents: [],
        };
        setContacts([...contacts, newContact]);
        toast({
          title: "Contact créé",
          description: `${newContact.prenom} ${newContact.nom} a été créé avec succès.`,
        });
      }
      setIsFormOpen(false);
      setSelectedContact(null);
    },
    [contacts]
  );

  // Statistiques
  const activeContacts = getActiveContacts();
  const filteredContacts = getFilteredContacts();
  const archivedContacts = getArchivedContacts();
  const contactCategoriesUsed = getContactCategories();

  const totalContactsCount = activeContacts.length + archivedContacts.length;
  const archivedContactsCount = archivedContacts.length;
  const activeContactsCount = activeContacts.length;
  const filteredContactsCount = filteredContacts.length;

  return (
    <>
      {/* Overlay d'invitation similaire au planning-demo */}
      <AnimatePresence mode="wait">
        {isDemoCompleted && showMessage && (
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
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{
              zIndex: 1000,
              pointerEvents: "none",
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-2xl pointer-events-auto"
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
                className="flex flex-col items-center justify-center gap-2 font-semibold text-center max-w-md"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👆</span>
                  <span className="text-lg">Essayez vous-même !</span>
                </div>
                <p className="text-sm font-normal opacity-90 leading-relaxed">
                  Glissez-déposez les cartes entre les colonnes du tableau
                  Kanban pour changer leur statut, ou cliquez sur &ldquo;Créer
                  un contact&rdquo; pour ajouter un nouveau client.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleGlobalDragStart}
        onDragEnd={handleGlobalDragEnd}
      >
        <div
          className="container mx-auto py-6 space-y-6 bg-white"
          ref={containerRef}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                CRM Web jungle saas
              </h1>
            </div>
            <Button
              onClick={handleCreateContact}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size={
                typeof window !== "undefined" && window.innerWidth < 640
                  ? "sm"
                  : "default"
              }
            >
              <UserPlus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Créer un contact</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </div>

          <Tabs
            defaultValue="kanban"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsContent value="kanban" className="mt-6">
              <KanbanBoardDemo
                contacts={contacts}
                onUpdateContact={handleSaveContact}
                onEditContact={handleEditContact}
                onArchiveContact={handleArchiveContact}
              />
            </TabsContent>

            <TabsContent value="contacts" className="mt-6">
              <ContactsListDemo
                contacts={contacts}
                searchTerm={searchTerm}
                categoryFilter={categoryFilter}
                onSearchChange={setSearchTerm}
                onCategoryFilterChange={setCategoryFilter}
                onEditContact={handleEditContact}
                onArchiveContact={handleArchiveContact}
              />
            </TabsContent>

            <TabsContent value="stats" className="mt-6">
              <StatsDemo
                contacts={filteredContacts}
                activeContactsCount={activeContactsCount}
                archivedContactsCount={archivedContactsCount}
                totalContactsCount={totalContactsCount}
                filteredContactsCount={filteredContactsCount}
                contactCategories={contactCategoriesUsed}
                searchTerm={searchTerm}
                categoryFilter={categoryFilter}
                onSearchChange={setSearchTerm}
                onCategoryFilterChange={setCategoryFilter}
              />
            </TabsContent>
          </Tabs>

          {/* Formulaire de contact */}
          {isFormOpen && (
            <ContactFormDemo
              contact={selectedContact}
              onSave={handleSaveContact}
              onClose={() => {
                setIsFormOpen(false);
                setSelectedContact(null);
              }}
            />
          )}
        </div>
      </DndContext>
    </>
  );
}

// ===== COMPOSANTS INTÉGRÉS =====

// Composant ContactCard
function ContactCardDemo({
  contact,
  onEdit,
  isDragging = false,
  isMobile = false,
}: {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  isDragging?: boolean;
  isMobile?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isDraggingState,
  } = useDraggable({
    id: contact.id,
    data: {
      contact,
      status: contact.status,
    },
  });

  const style = useMemo(() => {
    if (transform) {
      return {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: "transform 0.2s cubic-bezier(0.2, 0, 0, 1)",
      };
    }
    return {
      transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
    };
  }, [transform]);

  const handleEdit = useCallback(() => {
    onEdit(contact);
  }, [onEdit, contact]);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`select-none bg-white border-gray-200 hover:shadow-lg transition-all duration-200 ${
        isDragging || isDraggingState
          ? "opacity-60 shadow-2xl scale-105 rotate-2 cursor-grabbing"
          : "cursor-grab hover:scale-[1.02]"
      } ${contact.important ? "ring-2 ring-orange-200" : ""} ${
        isMobile ? "text-xs" : ""
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className={`${isMobile ? "pb-2 px-3 pt-3" : "pb-3"}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle
              className={`${
                isMobile ? "text-sm" : "text-lg"
              } flex items-center gap-2 text-gray-900`}
            >
              {contact.important && (
                <Star
                  className={`${
                    isMobile ? "h-3 w-3" : "h-4 w-4"
                  } text-orange-500 fill-current`}
                />
              )}
              {isMobile
                ? `${contact.prenom} ${contact.nom}`.substring(0, 20) +
                  (`${contact.prenom} ${contact.nom}`.length > 20 ? "..." : "")
                : `${contact.prenom} ${contact.nom}`}
            </CardTitle>
            <CardDescription
              className={`flex items-center gap-1 ${
                isMobile ? "mt-0.5" : "mt-1"
              } text-gray-600 ${isMobile ? "text-xs" : ""}`}
            >
              <Mail className={`${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
              {isMobile
                ? contact.email.substring(0, 15) + "..."
                : contact.email}
            </CardDescription>
            {!isMobile && (
              <div className="text-xs text-gray-400 mt-1 italic">
                Glissez-déposez pour changer le statut
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={isMobile ? "sm" : "sm"}>
                <MoreHorizontal
                  className={`${isMobile ? "h-3 w-3" : "h-4 w-4"}`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border-gray-200">
              <DropdownMenuItem
                onClick={handleEdit}
                className="text-gray-700 hover:bg-gray-50"
              >
                <Edit className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-2`} />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 hover:bg-gray-50">
                <Archive
                  className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-2`}
                />
                Archiver
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className={`${isMobile ? "pt-0 px-3 pb-3" : "pt-0"}`}>
        <div className={`${isMobile ? "space-y-1" : "space-y-2"}`}>
          <div
            className={`flex items-center gap-2 ${
              isMobile ? "text-xs" : "text-sm"
            } text-gray-600`}
          >
            <Phone className={`${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
            {contact.telephone}
          </div>
          <div
            className={`flex items-center gap-2 ${
              isMobile ? "text-xs" : "text-sm"
            } text-gray-600`}
          >
            <MapPin className={`${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
            {contact.ville}
          </div>
          <div className={`flex flex-wrap gap-1 ${isMobile ? "mt-1" : "mt-2"}`}>
            {contact.categories
              .slice(0, isMobile ? 2 : contact.categories.length)
              .map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className={`${
                    isMobile ? "text-xs px-1 py-0" : "text-xs"
                  } ${getCategoryColor(category)}`}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category}</span>
                </Badge>
              ))}
            {isMobile && contact.categories.length > 2 && (
              <Badge
                variant="secondary"
                className="text-xs px-1 py-0 bg-gray-100 text-gray-800"
              >
                +{contact.categories.length - 2}
              </Badge>
            )}
          </div>
          {contact.montantDevis && (
            <div
              className={`flex items-center gap-2 ${
                isMobile ? "text-xs" : "text-sm"
              } font-medium text-green-600`}
            >
              <Euro className={`${isMobile ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(contact.montantDevis)}
            </div>
          )}
          {contact.commentaires && !isMobile && (
            <div className="text-sm text-gray-600 line-clamp-2">
              {contact.commentaires}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Composant KanbanBoard
function KanbanBoardDemo({
  contacts,
  onUpdateContact,
  onEditContact,
  onArchiveContact,
}: {
  contacts: Contact[];
  onUpdateContact: (contact: Contact) => void;
  onEditContact: (contact: Contact) => void;
  onArchiveContact: (contact: Contact) => void;
}) {
  const activeContacts = contacts.filter((c) => !c.archived);
  const [currentGroup, setCurrentGroup] = useState(0);

  // Grouper les statuts par paires pour mobile
  const statusGroups = [];
  for (let i = 0; i < contactStatuses.length; i += 2) {
    statusGroups.push(contactStatuses.slice(i, i + 2));
  }

  const totalGroups = statusGroups.length;

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % totalGroups);
  };

  const prevGroup = () => {
    setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
  };

  return (
    <div className="space-y-4">
      {/* Navigation mobile */}
      <div className="md:hidden flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded-lg gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={prevGroup}
          disabled={totalGroups <= 1}
          className="flex items-center gap-1 text-xs px-2 sm:px-3"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Préc.</span>
        </Button>

        <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-center">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {currentGroup + 1}/{totalGroups}
          </span>
          <div className="flex gap-1">
            {statusGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentGroup(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                  index === currentGroup ? "bg-blue-500" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextGroup}
          disabled={totalGroups <= 1}
          className="flex items-center gap-1 text-xs px-2 sm:px-3"
        >
          <span className="hidden sm:inline">Suiv.</span>
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      {/* Vue Desktop - Toutes les colonnes */}
      <div className="hidden md:flex gap-4 overflow-x-auto pb-4">
        {contactStatuses.map((status) => (
          <KanbanColumnDemo
            key={status}
            status={status}
            contacts={activeContacts.filter((c) => c.status === status)}
            onEditContact={onEditContact}
            onArchiveContact={onArchiveContact}
          />
        ))}
      </div>

      {/* Vue Mobile - 2 colonnes par groupe */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {statusGroups[currentGroup]?.map((status) => (
            <KanbanColumnDemo
              key={status}
              status={status}
              contacts={activeContacts.filter((c) => c.status === status)}
              onEditContact={onEditContact}
              onArchiveContact={onArchiveContact}
              isMobile={true}
            />
          ))}
        </div>
      </div>

      {/* Indicateur des statuts du groupe actuel sur mobile */}
      <div className="md:hidden bg-blue-50 p-3 rounded-lg">
        <p className="text-sm font-medium text-blue-800 mb-2">
          Statuts actuels :
        </p>
        <div className="flex flex-wrap gap-2">
          {statusGroups[currentGroup]?.map((status) => (
            <Badge key={status} variant="outline" className="text-xs">
              {status}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant KanbanColumn
function KanbanColumnDemo({
  status,
  contacts,
  onEditContact,
  onArchiveContact,
  isMobile = false,
}: {
  status: ContactStatus;
  contacts: Contact[];
  onEditContact: (contact: Contact) => void;
  onArchiveContact: (contact: Contact) => void;
  isMobile?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <div
      ref={setNodeRef}
      id={status}
      className={`${
        isMobile ? "w-full flex-1" : "w-80 flex-shrink-0"
      } transition-all duration-300 ${
        isOver
          ? "bg-blue-50 ring-2 ring-blue-200 ring-opacity-50 scale-105"
          : ""
      }`}
    >
      <div className="bg-gray-100 rounded-t-md p-3 flex items-center justify-between">
        <span
          className={`font-medium text-gray-900 ${isMobile ? "text-sm" : ""}`}
        >
          {isMobile
            ? status.split(" ")[0] + (status.split(" ")[1] ? "..." : "")
            : status}
        </span>
        <Badge
          variant="secondary"
          className={`bg-white text-gray-700 transition-all ${
            isOver ? "bg-blue-100 text-blue-800" : ""
          } ${isMobile ? "text-xs" : ""}`}
        >
          {contacts.length}
        </Badge>
      </div>
      <div
        className={`bg-white border border-gray-200 border-t-0 rounded-b-md p-3 min-h-[200px] space-y-3 transition-all duration-300 ${
          isOver ? "border-blue-200 bg-blue-50/20" : ""
        }`}
      >
        {contacts.map((contact) => (
          <ContactCardDemo
            key={contact.id}
            contact={contact}
            onEdit={onEditContact}
            isMobile={isMobile}
          />
        ))}
        {contacts.length === 0 && (
          <div
            className={`text-center py-8 text-gray-400 transition-all duration-300 ${
              isOver ? "text-blue-500" : ""
            }`}
          >
            <div className="text-4xl mb-2">📋</div>
            <p className={isMobile ? "text-sm" : ""}>Déposez un contact ici</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant ContactsList
function ContactsListDemo({
  contacts,
  searchTerm,
  categoryFilter,
  onSearchChange,
  onCategoryFilterChange,
  onEditContact,
  onArchiveContact,
}: {
  contacts: Contact[];
  searchTerm: string;
  categoryFilter: ContactCategory | "all";
  onSearchChange: (term: string) => void;
  onCategoryFilterChange: (category: ContactCategory | "all") => void;
  onEditContact: (contact: Contact) => void;
  onArchiveContact: (contact: Contact) => void;
}) {
  const activeContacts = contacts.filter((c) => !c.archived);
  let filteredContacts = activeContacts;

  if (searchTerm) {
    filteredContacts = filteredContacts.filter(
      (c) =>
        c.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.telephone.includes(searchTerm) ||
        c.ville.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categoryFilter !== "all") {
    filteredContacts = filteredContacts.filter((c) =>
      c.categories.includes(categoryFilter)
    );
  }

  const contactCategoriesUsed = Array.from(
    new Set(contacts.flatMap((c) => c.categories))
  );

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un contact..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              onCategoryFilterChange(value as ContactCategory | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {contactCategoriesUsed.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(categoryFilter !== "all" || searchTerm) && (
            <Badge
              variant="outline"
              className="h-10 px-3 flex items-center justify-center gap-1 w-full sm:w-auto"
            >
              <span className="text-xs sm:text-sm">
                {filteredContacts.length} contacts filtrés
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1 -mr-1"
                onClick={() => {
                  onSearchChange("");
                  onCategoryFilterChange("all");
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      </div>

      {/* Liste des contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => (
          <ContactCardDemo
            key={contact.id}
            contact={contact}
            onEdit={onEditContact}
            isMobile={false}
          />
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun contact trouvé</p>
        </div>
      )}
    </div>
  );
}

// Composant Stats
function StatsDemo({
  contacts,
  activeContactsCount,
  archivedContactsCount,
  totalContactsCount,
  filteredContactsCount,
  contactCategories,
  searchTerm,
  categoryFilter,
  onSearchChange,
  onCategoryFilterChange,
}: {
  contacts: Contact[];
  activeContactsCount: number;
  archivedContactsCount: number;
  totalContactsCount: number;
  filteredContactsCount: number;
  contactCategories: ContactCategory[];
  searchTerm: string;
  categoryFilter: ContactCategory | "all";
  onSearchChange: (term: string) => void;
  onCategoryFilterChange: (category: ContactCategory | "all") => void;
}) {
  return (
    <div className="space-y-6">
      {/* Filtres */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un contact..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            value={categoryFilter}
            onValueChange={(value) =>
              onCategoryFilterChange(value as ContactCategory | "all")
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {contactCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {(categoryFilter !== "all" || searchTerm) && (
            <Badge
              variant="outline"
              className="h-10 px-3 flex items-center justify-center gap-1 w-full sm:w-auto"
            >
              <span className="text-xs sm:text-sm">
                {filteredContactsCount} contacts filtrés
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1 -mr-1"
                onClick={() => {
                  onSearchChange("");
                  onCategoryFilterChange("all");
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      </div>

      {/* Statistiques des devis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total des devis
                </p>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(
                    contacts.reduce(
                      (sum, contact) => sum + (contact.montantDevis || 0),
                      0
                    )
                  )}
                </h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <Euro className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Contacts actifs/archivés
                </p>
                <h3 className="text-2xl font-bold">
                  {activeContactsCount} / {archivedContactsCount}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {totalContactsCount}
                </p>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <PieChart className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Devis moyen
                </p>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(
                    contacts.filter((c) => c.montantDevis && c.montantDevis > 0)
                      .length > 0
                      ? contacts.reduce(
                          (sum, contact) => sum + (contact.montantDevis || 0),
                          0
                        ) /
                          contacts.filter(
                            (c) => c.montantDevis && c.montantDevis > 0
                          ).length
                      : 0
                  )}
                </h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Devis en attente
                </p>
                <h3 className="text-2xl font-bold">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(
                    contacts
                      .filter((c) => c.status === "Devis envoyé")
                      .reduce(
                        (sum, contact) => sum + (contact.montantDevis || 0),
                        0
                      )
                  )}
                </h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <TrendingUp className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contacts par statut</CardTitle>
            <CardDescription>
              Répartition des contacts actifs selon leur statut
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(contacts.map((c) => c.status))).map(
                (status) => {
                  const count = contacts.filter(
                    (c) => c.status === status
                  ).length;
                  const percentage =
                    Math.round((count / contacts.length) * 100) || 0;

                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{status}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contacts par catégorie</CardTitle>
            <CardDescription>
              Répartition des contacts selon leurs intérêts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contactCategories.map((category) => {
                const count = contacts.filter((c) =>
                  c.categories.includes(category)
                ).length;
                const percentage =
                  Math.round((count / contacts.length) * 100) || 0;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-medium">{count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Montant par catégorie</CardTitle>
            <CardDescription>
              Répartition des montants de devis par catégorie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {contactCategories.map((category) => {
                const totalAmount = contacts
                  .filter(
                    (c) =>
                      c.categories.includes(category) &&
                      c.montantDevis &&
                      c.montantDevis > 0
                  )
                  .reduce(
                    (sum, contact) => sum + (contact.montantDevis || 0),
                    0
                  );

                const maxAmount = Math.max(
                  ...contactCategories.map((cat) =>
                    contacts
                      .filter(
                        (c) =>
                          c.categories.includes(cat) &&
                          c.montantDevis &&
                          c.montantDevis > 0
                      )
                      .reduce(
                        (sum, contact) => sum + (contact.montantDevis || 0),
                        0
                      )
                  )
                );

                const percentage =
                  maxAmount > 0
                    ? Math.round((totalAmount / maxAmount) * 100)
                    : 0;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category}</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(totalAmount)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composant ContactForm
function ContactFormDemo({
  contact,
  onSave,
  onClose,
}: {
  contact: Contact | null;
  onSave: (contact: Contact) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Contact>>(() => {
    if (contact) {
      return contact;
    }
    return {
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      adresse: "",
      codePostal: "",
      ville: "",
      categories: [],
      status: "À contacter",
      commentaires: "",
      montantDevis: 0,
      important: false,
    };
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs obligatoires
    if (
      !formData.nom ||
      !formData.prenom ||
      !formData.email ||
      !formData.telephone
    ) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const updatedContact: Contact = {
      ...formData,
      id: contact?.id || "", // L'ID sera généré dans handleSaveContact si c'est un nouveau contact
      dateCreation: contact?.dateCreation || new Date(),
      dateDerniereModification: new Date(),
      utilisateurId: contact?.utilisateurId || "demo-user",
      collaborateursIds: contact?.collaborateursIds || [],
      documents: contact?.documents || [],
    } as Contact;

    onSave(updatedContact);
  };

  const handleCategoryToggle = (category: ContactCategory) => {
    const categories = formData.categories || [];
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];

    setFormData({ ...formData, categories: newCategories });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {contact ? "Modifier le contact" : "Nouveau contact"}
          </DialogTitle>
          <DialogDescription>
            {contact
              ? "Modifiez les informations du contact"
              : "Créez un nouveau contact pour votre CRM"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input
                id="prenom"
                value={formData.prenom || ""}
                onChange={(e) =>
                  setFormData({ ...formData, prenom: e.target.value })
                }
                required
                placeholder="Prénom du contact"
              />
            </div>
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                value={formData.nom || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nom: e.target.value })
                }
                required
                placeholder="Nom du contact"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                value={formData.telephone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
                required
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="adresse">Adresse</Label>
            <Input
              id="adresse"
              value={formData.adresse || ""}
              onChange={(e) =>
                setFormData({ ...formData, adresse: e.target.value })
              }
              placeholder="123 Rue de la Paix"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="codePostal">Code postal</Label>
              <Input
                id="codePostal"
                value={formData.codePostal || ""}
                onChange={(e) =>
                  setFormData({ ...formData, codePostal: e.target.value })
                }
                placeholder="75001"
              />
            </div>
            <div>
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                value={formData.ville || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ville: e.target.value })
                }
                placeholder="Paris"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status || "À contacter"}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as ContactStatus })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contactStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Catégories</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {contactCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={formData.categories?.includes(category) || false}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="montantDevis">Montant du devis (€)</Label>
            <Input
              id="montantDevis"
              type="number"
              step="0.01"
              value={formData.montantDevis || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  montantDevis: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
            />
          </div>

          <div>
            <Label htmlFor="commentaires">Commentaires</Label>
            <Textarea
              id="commentaires"
              value={formData.commentaires || ""}
              onChange={(e) =>
                setFormData({ ...formData, commentaires: e.target.value })
              }
              rows={3}
              placeholder="Commentaires sur le contact..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="important"
              checked={formData.important || false}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, important: checked as boolean })
              }
            />
            <Label htmlFor="important">Contact important</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {contact ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
