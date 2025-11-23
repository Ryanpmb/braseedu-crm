import { useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MoreVertical, Edit, RefreshCw } from "lucide-react";
import { CustomerDialog } from "@/components/Dialogs/CustomerDialog";
import { StatusDialog } from "@/components/Dialogs/StatusDialog";
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

const Customers = () => {
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Mock data
  const customers = [
    { id: "1", name: "João Silva", email: "joao@email.com", phone: "(11) 99999-9999", status: "Qualificado", origin: "Site", registerDate: "2024-01-15" },
    { id: "2", name: "Ana Costa", email: "ana@email.com", phone: "(11) 98888-8888", status: "Novo Lead", origin: "Facebook", registerDate: "2024-02-20" },
    { id: "3", name: "Carlos Souza", email: "carlos@email.com", phone: "(11) 97777-7777", status: "Em Negociação", origin: "Indicação", registerDate: "2024-03-10" },
  ];

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(true);
  };

  const handleChangeStatus = (customer: any) => {
    setSelectedCustomer(customer);
    setStatusDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string, notes?: string) => {
    console.log("Status atualizado:", { customerId: selectedCustomer?.id, newStatus, notes });
    // Aqui você atualizaria o status via API
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Qualificado": "bg-success/10 text-success",
      "Novo Lead": "bg-info/10 text-info",
      "Em Negociação": "bg-warning/10 text-warning",
      "Perdido": "bg-destructive/10 text-destructive",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus leads e clientes
            </p>
          </div>
          <Button 
            className="gap-2" 
            onClick={() => {
              setSelectedCustomer(null);
              setCustomerDialogOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Novo Cliente
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{customer.origin}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(customer.registerDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(customer)}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Alterar Status
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

      <CustomerDialog 
        open={customerDialogOpen} 
        onOpenChange={setCustomerDialogOpen}
        customer={selectedCustomer}
      />

      <StatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        currentStatus={selectedCustomer?.status || ""}
        entityType="customer"
        onStatusChange={handleStatusChange}
      />
    </DashboardLayout>
  );
};

export default Customers;
