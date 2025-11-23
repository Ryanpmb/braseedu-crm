import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Search, Phone, Mail, MessageSquare, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Interactions = () => {
  // Mock data
  const interactions = [
    { 
      id: 1, 
      customer: "João Silva", 
      type: "Telefone", 
      description: "Cliente interessado em curso de React. Agendada reunião para próxima semana.",
      date: "2024-03-20",
      salesman: "Maria Santos"
    },
    { 
      id: 2, 
      customer: "Ana Costa", 
      type: "Email", 
      description: "Enviada proposta comercial com valores e condições de pagamento.",
      date: "2024-03-19",
      salesman: "Pedro Lima"
    },
    { 
      id: 3, 
      customer: "Carlos Souza", 
      type: "WhatsApp", 
      description: "Respondidas dúvidas sobre cronograma e certificação do curso.",
      date: "2024-03-19",
      salesman: "Maria Santos"
    },
    { 
      id: 4, 
      customer: "Maria Santos", 
      type: "Reunião", 
      description: "Demonstração da plataforma de ensino e apresentação do conteúdo programático.",
      date: "2024-03-18",
      salesman: "Julia Costa"
    },
  ];

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      "Telefone": Phone,
      "Email": Mail,
      "WhatsApp": MessageSquare,
      "Reunião": Video,
    };
    return icons[type] || MessageSquare;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Telefone": "bg-info/10 text-info",
      "Email": "bg-primary/10 text-primary",
      "WhatsApp": "bg-success/10 text-success",
      "Reunião": "bg-warning/10 text-warning",
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
                          <h3 className="font-semibold text-foreground">{interaction.customer}</h3>
                          <p className="text-sm text-muted-foreground">
                            {interaction.salesman} • {new Date(interaction.date).toLocaleDateString('pt-BR')}
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
