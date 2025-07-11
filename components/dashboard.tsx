import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, DollarSign, HardHat, Truck, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-3 bg-gray-50 p-2 h-full overflow-hidden scale-90 md:scale-90 lg:scale-100">
      <div className="grid gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-700">
              Chiffre d&apos;affaires (mensuel)
            </CardTitle>
            <DollarSign className="h-3 w-3 text-gray-500" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-lg font-bold text-gray-900">125 780,50 €</div>
            <p className="text-xs text-gray-600">
              +15.2% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-700">
              Chantiers Actifs
            </CardTitle>
            <HardHat className="h-3 w-3 text-gray-500" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-lg font-bold text-gray-900">8</div>
            <p className="text-xs text-gray-600">
              2 nouveaux chantiers ce mois-ci
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-700">
              Équipes sur le terrain
            </CardTitle>
            <Users className="h-3 w-3 text-gray-500" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-lg font-bold text-gray-900">42</div>
            <p className="text-xs text-gray-600">
              3 équipes actuellement déployées
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-gray-700">
              Matériel Disponible
            </CardTitle>
            <Truck className="h-3 w-3 text-gray-500" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-lg font-bold text-gray-900">85%</div>
            <p className="text-xs text-gray-600">
              Taux de disponibilité du parc
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-2 md:gap-3 lg:grid-cols-2 xl:grid-cols-3 flex-1 min-h-0">
        <Card className="xl:col-span-2 bg-white border-gray-200 shadow-sm flex flex-col">
          <CardHeader className="flex flex-row items-center pb-2">
            <div className="grid gap-1">
              <CardTitle className="text-gray-900 text-sm">
                Suivi des Chantiers
              </CardTitle>
              <CardDescription className="text-gray-600 text-xs">
                Vue d&apos;ensemble de l&apos;avancement des chantiers en cours.
              </CardDescription>
            </div>
            <Button
              asChild
              size="sm"
              className="ml-auto gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 h-auto"
            >
              <a href="#">
                Voir Tout
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="text-gray-700 text-xs">
                    Chantier / Client
                  </TableHead>
                  <TableHead className="hidden xl:table-cell text-gray-700 text-xs">
                    Statut
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-gray-700 text-xs">
                    Chef de chantier
                  </TableHead>
                  <TableHead className="text-right text-gray-700 text-xs">
                    Budget
                  </TableHead>
                  <TableHead className="hidden sm:table-cell text-gray-700 text-xs">
                    Avancement
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-gray-100">
                  <TableCell>
                    <div className="font-medium text-gray-900 text-xs">
                      Construction Villa &quot;Les Pins&quot;
                    </div>
                    <div className="hidden text-xs text-gray-500 md:inline">
                      Client: Famille Durand
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge
                      className="text-xs bg-blue-100 text-blue-800 border-blue-200"
                      variant="outline"
                    >
                      En cours
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-700 text-xs">
                    Marc Dubois
                  </TableCell>
                  <TableCell className="text-right text-gray-900 text-xs">
                    250 000 €
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Progress value={75} className="w-full h-1" />
                  </TableCell>
                </TableRow>
                <TableRow className="border-gray-100">
                  <TableCell>
                    <div className="font-medium text-gray-900 text-xs">
                      Rénovation Façade Immeuble &quot;Le Central&quot;
                    </div>
                    <div className="hidden text-xs text-gray-500 md:inline">
                      Client: Syndic Copro
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge
                      className="text-xs bg-green-100 text-green-800 border-green-200"
                      variant="secondary"
                    >
                      Terminé
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-700 text-xs">
                    Sophie Martin
                  </TableCell>
                  <TableCell className="text-right text-gray-900 text-xs">
                    85 000 €
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Progress value={100} className="w-full h-1" />
                  </TableCell>
                </TableRow>
                <TableRow className="border-gray-100">
                  <TableCell>
                    <div className="font-medium text-gray-900 text-xs">
                      Terrassement &quot;ZAC du Moulin&quot;
                    </div>
                    <div className="hidden text-xs text-gray-500 md:inline">
                      Client: Mairie de Villepin
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <Badge
                      className="text-xs bg-red-100 text-red-800 border-red-200"
                      variant="destructive"
                    >
                      En retard
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-gray-700 text-xs">
                    Alain Bernard
                  </TableCell>
                  <TableCell className="text-right text-gray-900 text-xs">
                    150 000 €
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Progress value={40} className="w-full h-1" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900 text-sm">
              Gestion du Matériel
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs">
              État et disponibilité du matériel clé.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-md p-1">
                <Truck className="h-4 w-4 text-gray-600" />
              </div>
              <div className="grid gap-1 flex-1">
                <p className="text-xs font-medium leading-none text-gray-900">
                  Mini-pelle CAT-301
                </p>
                <p className="text-xs text-gray-500">
                  Statut: Sur chantier &quot;Les Pins&quot;
                </p>
              </div>
              <div className="font-medium text-orange-600 text-xs">Occupé</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-md p-1">
                <Truck className="h-4 w-4 text-gray-600" />
              </div>
              <div className="grid gap-1 flex-1">
                <p className="text-xs font-medium leading-none text-gray-900">
                  Bétonnière Altrad
                </p>
                <p className="text-xs text-gray-500">Statut: Au dépôt</p>
              </div>
              <div className="font-medium text-green-600 text-xs">
                Disponible
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 rounded-md p-1">
                <Truck className="h-4 w-4 text-gray-600" />
              </div>
              <div className="grid gap-1 flex-1">
                <p className="text-xs font-medium leading-none text-gray-900">
                  Échafaudage (Lot 5)
                </p>
                <p className="text-xs text-gray-500">Statut: En maintenance</p>
              </div>
              <div className="font-medium text-red-600 text-xs">
                Indisponible
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
