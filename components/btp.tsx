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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Calculator,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  nom: string;
  poste: string;
  salaireBase: number;
  heuresSupp: number;
  tauxHeureSup: number;
  primes: number;
}

interface Depense {
  id: string;
  categorie: string;
  description: string;
  montant: number;
  date: string;
}

interface Revenu {
  id: string;
  projet: string;
  description: string;
  montant: number;
  date: string;
}

export default function Component() {
  const [employes, setEmployes] = useState<Employee[]>([
    {
      id: "1",
      nom: "Jean Dupont",
      poste: "Chef de chantier",
      salaireBase: 3500,
      heuresSupp: 0,
      tauxHeureSup: 25,
      primes: 0,
    },
    {
      id: "2",
      nom: "Marie Martin",
      poste: "Maçon",
      salaireBase: 2800,
      heuresSupp: 0,
      tauxHeureSup: 20,
      primes: 0,
    },
    {
      id: "3",
      nom: "Pierre Durand",
      poste: "Électricien",
      salaireBase: 3200,
      heuresSupp: 0,
      tauxHeureSup: 22,
      primes: 0,
    },
  ]);

  const [depenses, setDepenses] = useState<Depense[]>([
    {
      id: "1",
      categorie: "Matériaux",
      description: "Ciment et béton",
      montant: 2500,
      date: "2024-01-15",
    },
    {
      id: "2",
      categorie: "Équipement",
      description: "Location pelleteuse",
      montant: 800,
      date: "2024-01-16",
    },
    {
      id: "3",
      categorie: "Carburant",
      description: "Essence véhicules",
      montant: 450,
      date: "2024-01-17",
    },
  ]);

  const [revenus, setRevenus] = useState<Revenu[]>([
    {
      id: "1",
      projet: "Maison Leblanc",
      description: "Gros œuvre",
      montant: 15000,
      date: "2024-01-10",
    },
    {
      id: "2",
      projet: "Rénovation Bureau",
      description: "Électricité",
      montant: 8500,
      date: "2024-01-12",
    },
  ]);

  const [nouvelEmploye, setNouvelEmploye] = useState({
    nom: "",
    poste: "",
    salaireBase: 0,
  });
  const [nouvelleDepense, setNouvelleDepense] = useState({
    categorie: "",
    description: "",
    montant: 0,
  });
  const [nouveauRevenu, setNouveauRevenu] = useState({
    projet: "",
    description: "",
    montant: 0,
  });

  // Calculs automatiques
  const totalSalaires = employes.reduce(
    (total, emp) =>
      total + emp.salaireBase + emp.heuresSupp * emp.tauxHeureSup + emp.primes,
    0
  );

  const totalDepenses =
    depenses.reduce((total, dep) => total + dep.montant, 0) + totalSalaires;

  const totalRevenus = revenus.reduce((total, rev) => total + rev.montant, 0);

  const benefice = totalRevenus - totalDepenses;

  const ajouterEmploye = () => {
    if (nouvelEmploye.nom && nouvelEmploye.poste) {
      setEmployes([
        ...employes,
        {
          ...nouvelEmploye,
          id: Date.now().toString(),
          heuresSupp: 0,
          tauxHeureSup: 20,
          primes: 0,
        },
      ]);
      setNouvelEmploye({ nom: "", poste: "", salaireBase: 0 });
    }
  };

  const ajouterDepense = () => {
    if (nouvelleDepense.description && nouvelleDepense.montant > 0) {
      setDepenses([
        ...depenses,
        {
          ...nouvelleDepense,
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNouvelleDepense({ categorie: "", description: "", montant: 0 });
    }
  };

  const ajouterRevenu = () => {
    if (nouveauRevenu.description && nouveauRevenu.montant > 0) {
      setRevenus([
        ...revenus,
        {
          ...nouveauRevenu,
          id: Date.now().toString(),
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNouveauRevenu({ projet: "", description: "", montant: 0 });
    }
  };

  const supprimerEmploye = (id: string) => {
    setEmployes(employes.filter((emp) => emp.id !== id));
  };

  const supprimerDepense = (id: string) => {
    setDepenses(depenses.filter((dep) => dep.id !== id));
  };

  const supprimerRevenu = (id: string) => {
    setRevenus(revenus.filter((rev) => rev.id !== id));
  };

  const mettreAJourEmploye = (
    id: string,
    field: keyof Employee,
    value: string | number
  ) => {
    setEmployes(
      employes.map((emp) => (emp.id === id ? { ...emp, [field]: value } : emp))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* En-tête */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Building className="h-8 w-8" />
            Comptabilité BTP
          </h1>
          <p className="text-gray-600 mt-2">
            Gestion financière pour entreprise de bâtiment
          </p>
        </div>

        {/* Tableau de bord */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenus Total
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalRevenus.toLocaleString("fr-FR")} €
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Dépenses Total
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {totalDepenses.toLocaleString("fr-FR")} €
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salaires</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalSalaires.toLocaleString("fr-FR")} €
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bénéfice</CardTitle>
              <Calculator className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  benefice >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {benefice.toLocaleString("fr-FR")} €
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="employes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="employes">Employés & Salaires</TabsTrigger>
            <TabsTrigger value="depenses">Dépenses</TabsTrigger>
            <TabsTrigger value="revenus">Revenus</TabsTrigger>
          </TabsList>

          {/* Onglet Employés */}
          <TabsContent value="employes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Employés</CardTitle>
                <CardDescription>
                  Gérez les salaires et les heures de vos employés
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Formulaire nouvel employé */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="nom">Nom complet</Label>
                    <Input
                      id="nom"
                      value={nouvelEmploye.nom}
                      onChange={(e) =>
                        setNouvelEmploye({
                          ...nouvelEmploye,
                          nom: e.target.value,
                        })
                      }
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <Label htmlFor="poste">Poste</Label>
                    <Input
                      id="poste"
                      value={nouvelEmploye.poste}
                      onChange={(e) =>
                        setNouvelEmploye({
                          ...nouvelEmploye,
                          poste: e.target.value,
                        })
                      }
                      placeholder="Maçon"
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaire">Salaire de base (€)</Label>
                    <Input
                      id="salaire"
                      type="number"
                      value={nouvelEmploye.salaireBase || ""}
                      onChange={(e) =>
                        setNouvelEmploye({
                          ...nouvelEmploye,
                          salaireBase: Number(e.target.value),
                        })
                      }
                      placeholder="2500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={ajouterEmploye} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>

                {/* Liste des employés */}
                <div className="space-y-4">
                  {employes.map((employe) => (
                    <Card key={employe.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                        <div>
                          <Label className="text-sm font-medium">
                            {employe.nom}
                          </Label>
                          <Badge variant="secondary" className="mt-1">
                            {employe.poste}
                          </Badge>
                        </div>

                        <div>
                          <Label
                            htmlFor={`salaire-${employe.id}`}
                            className="text-xs"
                          >
                            Salaire base
                          </Label>
                          <Input
                            id={`salaire-${employe.id}`}
                            type="number"
                            value={employe.salaireBase}
                            onChange={(e) =>
                              mettreAJourEmploye(
                                employe.id,
                                "salaireBase",
                                Number(e.target.value)
                              )
                            }
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor={`heures-${employe.id}`}
                            className="text-xs"
                          >
                            H. supplémentaires
                          </Label>
                          <Input
                            id={`heures-${employe.id}`}
                            type="number"
                            value={employe.heuresSupp}
                            onChange={(e) =>
                              mettreAJourEmploye(
                                employe.id,
                                "heuresSupp",
                                Number(e.target.value)
                              )
                            }
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor={`taux-${employe.id}`}
                            className="text-xs"
                          >
                            Taux/heure sup
                          </Label>
                          <Input
                            id={`taux-${employe.id}`}
                            type="number"
                            value={employe.tauxHeureSup}
                            onChange={(e) =>
                              mettreAJourEmploye(
                                employe.id,
                                "tauxHeureSup",
                                Number(e.target.value)
                              )
                            }
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor={`primes-${employe.id}`}
                            className="text-xs"
                          >
                            Primes
                          </Label>
                          <Input
                            id={`primes-${employe.id}`}
                            type="number"
                            value={employe.primes}
                            onChange={(e) =>
                              mettreAJourEmploye(
                                employe.id,
                                "primes",
                                Number(e.target.value)
                              )
                            }
                            className="text-sm"
                          />
                        </div>

                        <div className="text-center">
                          <Label className="text-xs">Total</Label>
                          <div className="font-bold text-green-600">
                            {(
                              employe.salaireBase +
                              employe.heuresSupp * employe.tauxHeureSup +
                              employe.primes
                            ).toLocaleString("fr-FR")}{" "}
                            €
                          </div>
                        </div>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => supprimerEmploye(employe.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Dépenses */}
          <TabsContent value="depenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Dépenses</CardTitle>
                <CardDescription>
                  Suivez toutes vos dépenses d&apos;entreprise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Formulaire nouvelle dépense */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Input
                      id="categorie"
                      value={nouvelleDepense.categorie}
                      onChange={(e) =>
                        setNouvelleDepense({
                          ...nouvelleDepense,
                          categorie: e.target.value,
                        })
                      }
                      placeholder="Matériaux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={nouvelleDepense.description}
                      onChange={(e) =>
                        setNouvelleDepense({
                          ...nouvelleDepense,
                          description: e.target.value,
                        })
                      }
                      placeholder="Achat ciment"
                    />
                  </div>
                  <div>
                    <Label htmlFor="montant">Montant (€)</Label>
                    <Input
                      id="montant"
                      type="number"
                      value={nouvelleDepense.montant || ""}
                      onChange={(e) =>
                        setNouvelleDepense({
                          ...nouvelleDepense,
                          montant: Number(e.target.value),
                        })
                      }
                      placeholder="500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={ajouterDepense} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>

                {/* Liste des dépenses */}
                <div className="space-y-2">
                  {depenses.map((depense) => (
                    <div
                      key={depense.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Badge variant="outline">{depense.categorie}</Badge>
                        </div>
                        <div className="font-medium">{depense.description}</div>
                        <div className="text-red-600 font-bold">
                          {depense.montant.toLocaleString("fr-FR")} €
                        </div>
                        <div className="text-sm text-gray-500">
                          {depense.date}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => supprimerDepense(depense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Revenus */}
          <TabsContent value="revenus" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des Revenus</CardTitle>
                <CardDescription>Suivez vos revenus par projet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Formulaire nouveau revenu */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="projet">Projet</Label>
                    <Input
                      id="projet"
                      value={nouveauRevenu.projet}
                      onChange={(e) =>
                        setNouveauRevenu({
                          ...nouveauRevenu,
                          projet: e.target.value,
                        })
                      }
                      placeholder="Maison Dupont"
                    />
                  </div>
                  <div>
                    <Label htmlFor="desc-revenu">Description</Label>
                    <Input
                      id="desc-revenu"
                      value={nouveauRevenu.description}
                      onChange={(e) =>
                        setNouveauRevenu({
                          ...nouveauRevenu,
                          description: e.target.value,
                        })
                      }
                      placeholder="Gros œuvre"
                    />
                  </div>
                  <div>
                    <Label htmlFor="montant-revenu">Montant (€)</Label>
                    <Input
                      id="montant-revenu"
                      type="number"
                      value={nouveauRevenu.montant || ""}
                      onChange={(e) =>
                        setNouveauRevenu({
                          ...nouveauRevenu,
                          montant: Number(e.target.value),
                        })
                      }
                      placeholder="15000"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={ajouterRevenu} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>

                {/* Liste des revenus */}
                <div className="space-y-2">
                  {revenus.map((revenu) => (
                    <div
                      key={revenu.id}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg"
                    >
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Badge variant="default">{revenu.projet}</Badge>
                        </div>
                        <div className="font-medium">{revenu.description}</div>
                        <div className="text-green-600 font-bold">
                          {revenu.montant.toLocaleString("fr-FR")} €
                        </div>
                        <div className="text-sm text-gray-500">
                          {revenu.date}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => supprimerRevenu(revenu.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
