import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LandingNav from "@/components/Layout/LandingNav";
import { Clock, Users, Star, BookOpen, Award, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showInterestDialog, setShowInterestDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    origin: "",
  });

  // Mock data - substituir pela API real
  const courses = [
    {
      id: 1,
      title: "Desenvolvimento Web Full Stack",
      description: "Aprenda a criar aplicações web completas do zero",
      fullDescription: "Neste curso completo de Desenvolvimento Web Full Stack, você aprenderá todas as tecnologias necessárias para criar aplicações web modernas e profissionais. Desde o front-end com React até o back-end com Node.js, passando por bancos de dados e deploy.",
      category: "Tecnologia",
      duration: "40 horas",
      students: 1234,
      rating: 4.8,
      price: "R$ 497,00",
      level: "Intermediário",
      modules: [
        "Fundamentos de HTML, CSS e JavaScript",
        "React e desenvolvimento front-end moderno",
        "Node.js e APIs REST",
        "Bancos de dados SQL e NoSQL",
        "Autenticação e segurança",
        "Deploy e CI/CD",
      ],
      benefits: [
        "Certificado de conclusão",
        "Suporte da comunidade",
        "Acesso vitalício ao conteúdo",
        "Projetos práticos",
      ],
    },
    {
      id: 2,
      title: "Marketing Digital Avançado",
      description: "Domine estratégias de marketing digital e redes sociais",
      fullDescription: "Curso completo de Marketing Digital com foco em estratégias avançadas para redes sociais, SEO, Google Ads e análise de métricas. Aprenda a criar campanhas efetivas e mensurar resultados.",
      category: "Marketing",
      duration: "30 horas",
      students: 890,
      rating: 4.9,
      price: "R$ 397,00",
      level: "Avançado",
      modules: [
        "Estratégias de redes sociais",
        "SEO e marketing de conteúdo",
        "Google Ads e Facebook Ads",
        "Email marketing",
        "Analytics e métricas",
      ],
      benefits: [
        "Certificado reconhecido",
        "Mentoria em grupo",
        "Templates e ferramentas",
        "Atualizações constantes",
      ],
    },
  ];

  const course = courses.find((c) => c.id === Number(id)) || courses[0];

  const handleSubmitInterest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você faria a chamada para a API para criar o cliente e a oportunidade
    // Por enquanto, apenas mostra um toast de sucesso
    
    toast({
      title: "Interesse registrado!",
      description: "Obrigado pelo interesse! Em breve um de nossos vendedores entrará em contato com você.",
    });
    
    setShowInterestDialog(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      birthDate: "",
      origin: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      
      {/* Header */}
      <section className="py-8 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/courses-public")}
            className="mb-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar para cursos
          </Button>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{course.category}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{course.description}</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>{course.students.toLocaleString()} alunos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{course.rating} / 5.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Sobre o curso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.fullDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>O que você vai aprender</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      </div>
                      <span>{module}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Benefícios inclusos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center">
                        <div className="h-2 w-2 bg-success rounded-full" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-3xl text-primary">{course.price}</CardTitle>
                <CardDescription>Investimento único</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setShowInterestDialog(true)}
                >
                  Mostrar Interesse
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Preencha seus dados e um consultor entrará em contato
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interest Dialog */}
      <Dialog open={showInterestDialog} onOpenChange={setShowInterestDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manifestar Interesse</DialogTitle>
            <DialogDescription>
              Preencha seus dados e entraremos em contato em breve para ajudá-lo com a matrícula.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitInterest}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Como conheceu a BrasEdu?</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="Ex: Google, indicação, redes sociais..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowInterestDialog(false)}>
                Cancelar
              </Button>
              <Button type="submit">Enviar Interesse</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BrasEdu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CourseDetail;
