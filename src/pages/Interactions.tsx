import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

const Interactions = () => {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('interation');

      if (response.status === 200) {
        setInteractions(response.data);
      }
    }

    fetchData();
  }, [])


  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      "PHONE": Phone,
      "EMAIL": Mail,
      "WHATSAPP": MessageSquare,
      "MEET": Video,
    };
    return icons[type] || MessageSquare;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "PHONE": "bg-info/10 text-info",
      "EMAIL": "bg-primary/10 text-primary",
      "WHATSAPP": "bg-success/10 text-success",
      "MEET": "bg-warning/10 text-warning",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interações</h1>
          <p className="text-muted-foreground mt-1">
            Histórico de contatos com clientes
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar interações..."
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-4">
          {interactions.map((interaction) => {
            const Icon = getTypeIcon(interaction.type);
            return (
              <Card key={interaction.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-lg h-fit ${getTypeColor(interaction.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{interaction.oportunity.customer.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {interaction.oportunity.salesman.name} • {new Date(interaction.interationDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge variant="secondary" className={getTypeColor(interaction.type)}>
                          {interaction.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interaction.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interactions;
