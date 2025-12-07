import { useEffect, useState } from "react";
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
import { api } from "@/services/api";

const Customers = () => {
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/customers');
      setCustomers(response.data)
    }

    fetchData()
  }, []);

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerDialogOpen(true);
  };

  const getStatusName = (status: string): string => {
    let treatyStatus = "";

    switch (status) {
      case "NEW":
        treatyStatus = "Novo Lead";
        break;
      case "WON":
        treatyStatus = "Ganho";
        break;
      case "LOSE":
        treatyStatus = "Perdido";
        break;
      case "iN_PROGRESS":
        treatyStatus = "Em Progresso"
        break;
    }
    return treatyStatus;
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "WON": "bg-success/10 text-success",
      "NEW": "bg-info/10 text-info",
      "iN_PROGRESS": "bg-warning/10 text-warning",
      "LOSE": "bg-destructive/10 text-destructive",
    };
    return colors[status] || "bg-muted text-muted-foreground";
  };

  function toLocalDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

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
          {
            customers.length !== 0 ?
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Origem</TableHead>
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
                        <Badge variant="secondary" className={getStatusColor(customer.leadStatus)}>
                          {getStatusName(customer.leadStatus)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{customer.origin}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {toLocalDate(customer.birthDate).toLocaleDateString('pt-BR')}
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> :
              <>
                <h1 className="p-4 text-blue-500 text-lg font-bold">Nenhum Cliente Encontrado!</h1>
              </>
          }
        </div>
      </div>

      <CustomerDialog
        open={customerDialogOpen}
        onOpenChange={setCustomerDialogOpen}
        customer={selectedCustomer}
        customers={customers}
      />
    </DashboardLayout>
  );
};

export default Customers;
