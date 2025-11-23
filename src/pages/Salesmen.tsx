import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Salesmen = () => {
  // Mock data
  const salesmen = [
    { 
      id: "1", 
      name: "Maria Santos", 
      email: "maria@brasedu.com", 
      department: "Vendas Online",
      activeOpportunities: 12,
      closedSales: 45,
      conversionRate: "28%"
    },
    { 
      id: "2", 
      name: "Pedro Lima", 
      email: "pedro@brasedu.com", 
      department: "Vendas Presencial",
      activeOpportunities: 8,
      closedSales: 32,
      conversionRate: "24%"
    },
    { 
      id: "3", 
      name: "Julia Costa", 
      email: "julia@brasedu.com", 
      department: "Vendas Online",
      activeOpportunities: 15,
      closedSales: 58,
      conversionRate: "31%"
    },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Vendedores</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie sua equipe de vendas
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Vendedor
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar vendedores..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {salesmen.map((salesman) => (
            <Card key={salesman.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(salesman.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{salesman.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{salesman.department}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="text-sm font-medium">{salesman.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Oportunidades Ativas:</span>
                    <span className="text-sm font-bold text-primary">{salesman.activeOpportunities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vendas Fechadas:</span>
                    <span className="text-sm font-bold text-success">{salesman.closedSales}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Taxa de Conversão:</span>
                    <span className="text-sm font-bold text-foreground">{salesman.conversionRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Salesmen;
