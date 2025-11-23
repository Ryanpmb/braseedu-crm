import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
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
  // Mock data
  const opportunities = [
    { id: 1, customer: "João Silva", course: "React Avançado", salesman: "Maria Santos", status: "Em Negociação", value: "R$ 2.500", initiatedAt: "2024-03-01" },
    { id: 2, customer: "Ana Costa", course: "Node.js", salesman: "Pedro Lima", status: "Proposta Enviada", value: "R$ 1.800", initiatedAt: "2024-03-05" },
    { id: 3, customer: "Carlos Souza", course: "Python", salesman: "Maria Santos", status: "Contato Inicial", value: "R$ 2.200", initiatedAt: "2024-03-10" },
  ];

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
          <Button className="gap-2">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {opportunities.map((opp) => (
                <TableRow key={opp.id} className="cursor-pointer hover:bg-muted/50">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
