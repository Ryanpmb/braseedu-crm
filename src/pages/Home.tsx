import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LandingNav from "@/components/Layout/LandingNav";
import { GraduationCap, Users, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      navigate('/dashboard');
    }
  }, [])

  const features = [
    {
      icon: GraduationCap,
      title: "Cursos de Qualidade",
      description: "Aprenda com os melhores profissionais do mercado",
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com milhares de estudantes",
    },
    {
      icon: TrendingUp,
      title: "Evolução Contínua",
      description: "Acompanhe seu progresso em tempo real",
    },
    {
      icon: Award,
      title: "Certificação",
      description: "Receba certificados reconhecidos no mercado",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transforme sua Carreira com BrasEdu
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma completa de cursos online para impulsionar seu desenvolvimento profissional
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Área do Cliente
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher BrasEdu?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8">
            Junte-se a milhares de alunos que já transformaram suas carreiras
          </p>
          <Button size="lg" onClick={() => navigate("/courses-public")}>
            Explorar Cursos
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BrasEdu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
