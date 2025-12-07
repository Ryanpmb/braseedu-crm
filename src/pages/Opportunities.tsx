import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Edit, RefreshCw, MessageSquare } from "lucide-react";
import { OpportunityDialog } from "@/components/Dialogs/OpportunityDialog";
import { StatusDialog } from "@/components/Dialogs/StatusDialog";
import { InteractionDialog } from "@/components/Dialogs/InteractionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { api } from "@/services/api";

const Opportunities = () => {
  const [opportunityDialogOpen, setOpportunityDialogOpen] = useState(false);
  const [interactionDialogOpen, setInteractionDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [opportunities, setOpportunities] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('oportunity');
      if (response.status === 200) {
        setOpportunities(response.data);
      }
    }

    fetchData();
  }, []);

  const handleEditOpportunity = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setOpportunityDialogOpen(true);
  };


  const handleAddInteraction = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setInteractionDialogOpen(true);
  };


  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "PROGRESS": "bg-warning/10 text-warning",
      "WON": "bg-success/10 text-success",
      "LOSE": "bg-destructive/10 text-destructive",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  const getStatusName = (status: string): string => {
    let treatyStatus = "";

    switch (status) {
      case "WON":
        treatyStatus = "Ganho";
        break;
      case "LOSE":
        treatyStatus = "Perdido";
        break;
      case "PROGRESS":
        treatyStatus = "Em Progresso"
        break;

    }
    return treatyStatus;
  }

  function toLocalDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Oportunidades</h1>
            <p className="text-muted-foreground mt-1">
              Pipeline de vendas e oportunidades ativas
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setSelectedOpportunity(null);
              setOpportunityDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Nova Oportunidade
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidades..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          {
            opportunities.length !== 0 ?
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Curso</TableHead>
                    <TableHead>Vendedor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opp) => (
                    <TableRow key={opp.id}>
                      <TableCell className="font-medium">{opp?.customer?.name}</TableCell>
                      <TableCell className="text-muted-foreground">{opp?.course?.name}</TableCell>
                      <TableCell className="text-muted-foreground">{opp?.salesman?.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(opp.salesStatus)}>
                          {getStatusName(opp.salesStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {toLocalDate(opp.initiatedAt).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditOpportunity(opp)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAddInteraction(opp)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Registrar Interação
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> :
              <>
                <h1 className="p-4 text-blue-500 text-lg font-bold">Nenhuma Oportunidade Encontrada!</h1>
              </>
          }
        </div>
      </div>

      <OpportunityDialog
        open={opportunityDialogOpen}
        onOpenChange={setOpportunityDialogOpen}
        opportunity={selectedOpportunity}
        opportunities={opportunities}
      />

      <InteractionDialog
        open={interactionDialogOpen}
        onOpenChange={setInteractionDialogOpen}
        opportunityId={selectedOpportunity?.id}
        customerName={selectedOpportunity?.customer}
      />
    </DashboardLayout>
  );
};

export default Opportunities;
