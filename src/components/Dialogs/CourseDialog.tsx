import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: any | null;
  onSave: (data: any) => void;
}

export function CourseDialog({
  open,
  onOpenChange,
  course,
  onSave,
}: CourseDialogProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      hourlyLoad: 0,
      value: "",
    },
  });

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        description: course.description,
        hourlyLoad: course.hourlyLoad,
        value: course.value
      });
    } else {
      reset({
        name: "",
        description: "",
        hourlyLoad: 0,
        value: ""
      });
    }
  }, [course, reset]);

  const onSubmit = (data: any) => {
    onSave({
      ...data,
      price: parseFloat(data.price),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {course ? "Editar Curso" : "Novo Curso"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Nome do Curso</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Ex: Desenvolvimento Web"
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Descreva o curso..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="hourlyLoad">Carga horária</Label>
              <Input
                id="hourlyLoad"
                {...register("hourlyLoad")}
                placeholder="Ex: 100"
                type="number"
              />
            </div>


            <div>
              <Label htmlFor="value">Preço (R$)</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                {...register("value")}
                placeholder="0.00"
              />
            </div>
            
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {course ? "Salvar Alterações" : "Criar Curso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
