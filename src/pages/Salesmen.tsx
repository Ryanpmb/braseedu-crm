import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit } from "lucide-react";
import { SalesmanDialog } from "@/components/Dialogs/SalesmanDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/services/api";

const Salesmen = () => {
  const [salesmanDialogOpen, setSalesmanDialogOpen] = useState(false);
  const [selectedSalesman, setSelectedSalesman] = useState<any>(null);
  const [salesmans, setSalesmans] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const response = await api.get('/salesman')

      if(response.status === 200){
        setSalesmans(response.data);
      }
    }

    fetchData();
  }, [])

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleEditSalesman = (salesman: any) => {
    setSelectedSalesman(salesman);
    setSalesmanDialogOpen(true);
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
          <Button 
            className="gap-2"
            onClick={() => {
              setSelectedSalesman(null);
              setSalesmanDialogOpen(true);
            }}
          >
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
          {salesmans.map((salesman) => (
            <Card key={salesman.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditSalesman(salesman)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
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
                    <span className="text-sm font-bold text-primary">{salesman.opportunitiesQuantities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Vendas Fechadas:</span>
                    <span className="text-sm font-bold text-success">{salesman.closedSales}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Taxa de Conversão:</span>
                    <span className="text-sm font-bold text-foreground">{salesman.opportunitiesQuantities > 0
                                                                          ? Math.round(salesman.closedSales / salesman.opportunitiesQuantities * 100) + '%'
                                                                          : '0%'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SalesmanDialog 
        open={salesmanDialogOpen} 
        onOpenChange={setSalesmanDialogOpen}
        salesman={selectedSalesman}
        salesmans={salesmans}
      />
    </DashboardLayout>
  );
};

export default Salesmen;
