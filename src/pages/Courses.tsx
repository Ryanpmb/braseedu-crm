import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/Layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Plus, Pencil, Trash2 } from "lucide-react";
import { CourseDialog } from "@/components/Dialogs/CourseDialog";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

interface Course {
  id: number;
  name: string;
  description: string;
  hourlyLoad: number;
  value: number;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('course');
      if (response.status === 200) {
        setCourses(response.data)
      }
    }

    fetchData();
  }, []);

  const handleCreate = () => {
    setSelectedCourse(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const response = await api.delete('course/' + id)

    if (response.status === 204) {
      setCourses(courses.filter((course) => course.id !== id));
      toast({
        title: "Curso excluído",
        description: "O curso foi excluído com sucesso.",
      });
    }
  };

  const handleSave = async (courseData: Partial<Course>) => {
    if (selectedCourse) {
      const response = await api.put('course/' + selectedCourse.id, courseData);

      if (response.status === 200) {
        setCourses(
          courses.map((course) =>
            course.id === selectedCourse.id
              ? { ...course, ...courseData }
              : course
          )
        );
        toast({
          title: "Curso atualizado",
          description: "As informações do curso foram atualizadas.",
        });
        setIsDialogOpen(false);
      }

    } else {
      const response = await api.post('course', courseData);
      if (response.status === 201) {
        setCourses([...courses, response.data]);
        toast({
          title: "Curso criado",
          description: "O novo curso foi adicionado com sucesso.",
        });
        setIsDialogOpen(false);
      }

    }

  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cursos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os cursos disponíveis na plataforma
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Curso
          </Button>
        </div>

        <div className="rounded-lg border bg-card">
          {courses.length !== 0 ?
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {course.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.description}</TableCell>
                    <TableCell>{course.hourlyLoad + 'h'}</TableCell>
                    <TableCell>R$ {course.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(course)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(course.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table> :
            <h1 className="p-4 text-blue-500 text-lg font-bold">Nenhum Curso Encontrado!</h1>
          }
        </div>
      </div>

      <CourseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        course={selectedCourse}
        onSave={handleSave}
      />
    </DashboardLayout>
  );
}
