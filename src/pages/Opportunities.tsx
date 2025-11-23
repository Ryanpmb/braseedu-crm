import { useState } from "react";
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

const Opportunities = () => {
  const [opportunityDialogOpen, setOpportunityDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [interactionDialogOpen, setInteractionDialogOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);

  // Mock data
  const opportunities = [
    { id: 1, customer: "João Silva", course: "React Avançado", salesman: "Maria Santos", status: "Em Negociação", value: "R$ 2.500", initiatedAt: "2024-03-01" },
    { id: 2, customer: "Ana Costa", course: "Node.js", salesman: "Pedro Lima", status: "Proposta Enviada", value: "R$ 1.800", initiatedAt: "2024-03-05" },
    { id: 3, customer: "Carlos Souza", course: "Python", salesman: "Maria Santos", status: "Contato Inicial", value: "R$ 2.200", initiatedAt: "2024-03-10" },
  ];

  const handleEditOpportunity = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setOpportunityDialogOpen(true);
  };

  const handleChangeStatus = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setStatusDialogOpen(true);
  };

  const handleAddInteraction = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setInteractionDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string, notes?: string) => {
    console.log("Status atualizado:", { opportunityId: selectedOpportunity?.id, newStatus, notes });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Contato Inicial": "bg-info/10 text-info",
      "Qualificado": "bg-primary/10 text-primary",
      "Proposta Enviada": "bg-warning/10 text-warning",
      "Em Negociação": "bg-warning/10 text-warning",
      "Fechado Ganho": "bg-success/10 text-success",
      "Fechado Perdido": "bg-destructive/10 text-destructive",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opp) => (
                <TableRow key={opp.id}>
                  <TableCell className="font-medium">{opp.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{opp.course}</TableCell>
                  <TableCell className="text-muted-foreground">{opp.salesman}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(opp.status)}>
                      {opp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{opp.value}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(opp.initiatedAt).toLocaleDateString('pt-BR')}
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
                        <DropdownMenuItem onClick={() => handleChangeStatus(opp)}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Alterar Status
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
          </Table>
        </div>
      </div>

      <OpportunityDialog 
        open={opportunityDialogOpen} 
        onOpenChange={setOpportunityDialogOpen}
        opportunity={selectedOpportunity}
      />

      <StatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        currentStatus={selectedOpportunity?.status || ""}
        entityType="opportunity"
        onStatusChange={handleStatusChange}
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
