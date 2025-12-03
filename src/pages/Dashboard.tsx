import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { Users, Target, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

const Dashboard = () => {
  const [customers, setCustomers] = useState([])
  const [opportunities, setOpportunities] = useState([]);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/sales');

      if (response.status === 200) {
        setSales(response.data);
      }
    }

    fetchData();
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('oportunity');
      if (response.status === 200) {
        setOpportunities(response.data);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/customers');
      setCustomers(response.data)
    }

    fetchData()
  }, []);
  // Mock data - substituir por dados reais da API
  const metrics = {
    totalCustomers: 1247,
    activeOpportunities: 89,
    monthSales: 156,
    conversionRate: "23.4%",
  };

  const recentOpportunities = [
    { id: 1, customer: "João Silva", course: "React Avançado", status: "Em Negociação", salesman: "Maria Santos" },
    { id: 2, customer: "Ana Costa", course: "Node.js", status: "Proposta Enviada", salesman: "Pedro Lima" },
    { id: 3, customer: "Carlos Souza", course: "Python", status: "Contato Inicial", salesman: "Maria Santos" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do seu CRM
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total de Clientes"
            value={customers.length}
            icon={Users}
            trend={{ value: "+12% esse mês", isPositive: true }}
            variant="info"
          />
          <MetricCard
            title="Oportunidades Ativas"
            value={opportunities.length}
            icon={Target}
            trend={{ value: "+8% essa semana", isPositive: true }}
            variant="warning"
          />
          <MetricCard
            title="Vendas do Mês"
            value={sales.length}
            icon={DollarSign}
            trend={{ value: "+18% vs mês anterior", isPositive: true }}
            variant="success"
          />
          <MetricCard
            title="Taxa de Conversão"
            value={Math.round(sales.length / opportunities.length * 100) + '%'}
            icon={TrendingUp}
            trend={{ value: "+2.1% e sse mês", isPositive: true }}
            variant="default"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Oportunidades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{opp.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{opp.course.name}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {opp.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{opp.salesman.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funil de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Contato Inicial", count: 45, percentage: 100 },
                  { stage: "Qualificado", count: 32, percentage: 71 },
                  { stage: "Proposta", count: 18, percentage: 40 },
                  { stage: "Negociação", count: 12, percentage: 27 },
                  { stage: "Fechado", count: 8, percentage: 18 },
                ].map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                      <span className="text-sm text-muted-foreground">{stage.count}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${stage.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
