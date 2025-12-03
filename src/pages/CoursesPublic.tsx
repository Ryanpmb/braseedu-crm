import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import LandingNav from "@/components/Layout/LandingNav";
import { Search, Clock, Users, Star } from "lucide-react";
import { api } from "@/services/api";

interface Course {
  id: number;
  name: string;
  description: string;
  hourlyLoad: number;
  value: number;
}

const CoursesPublic = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('course');
      if (response.status === 200) {
        setCourses(response.data)
      }
    }

    fetchData();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.hourlyLoad.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nossos Cursos</h1>
          <p className="text-muted-foreground mb-8">
            Explore nossa biblioteca com centenas de cursos de alta qualidade
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 text-muted-foreground">
            {filteredCourses.length} curso{filteredCourses.length !== 1 ? "s" : ""} encontrado{filteredCourses.length !== 1 ? "s" : ""}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader>
                  {/* <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div> */}
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.hourlyLoad}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} alunos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating} / 5.0</span>
                    </div> */}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{course.value.toFixed(2)}</span>
                  <Button onClick={() => navigate(`/course/${course.id}`)}>Ver Detalhes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-12">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 BrasEdu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoursesPublic;
