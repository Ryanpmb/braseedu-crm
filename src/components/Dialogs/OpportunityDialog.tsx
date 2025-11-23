import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface OpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity?: any;
}

export const OpportunityDialog = ({ open, onOpenChange, opportunity }: OpportunityDialogProps) => {
  const [formData, setFormData] = useState({
    customerId: opportunity?.customerId || "",
    salesmanId: opportunity?.salesmanId || "",
    courseId: opportunity?.courseId || "",
    status: opportunity?.status || "Contato Inicial",
    estimatedValue: opportunity?.estimatedValue || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Dados da oportunidade:", formData);
    
    toast({
      title: opportunity ? "Oportunidade atualizada!" : "Oportunidade criada!",
      description: opportunity 
        ? "A oportunidade foi atualizada com sucesso."
        : "Nova oportunidade adicionada ao pipeline.",
    });
    
    onOpenChange(false);
  };

  // Mock data - substituir por dados da API
  const customers = [
    { id: "1", name: "João Silva" },
    { id: "2", name: "Ana Costa" },
    { id: "3", name: "Carlos Souza" },
  ];

  const salesmen = [
    { id: "1", name: "Maria Santos" },
    { id: "2", name: "Pedro Lima" },
    { id: "3", name: "Julia Costa" },
  ];

  const courses = [
    { id: "1", name: "React Avançado" },
    { id: "2", name: "Node.js" },
    { id: "3", name: "Python" },
    { id: "4", name: "Java Spring Boot" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {opportunity ? "Editar Oportunidade" : "Nova Oportunidade"}
          </DialogTitle>
          <DialogDescription>
            {opportunity 
              ? "Atualize as informações da oportunidade."
              : "Crie uma nova oportunidade de venda."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="customer">Cliente *</Label>
              <Select
                value={formData.customerId}
                onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="course">Curso *</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="salesman">Vendedor Responsável *</Label>
              <Select
                value={formData.salesmanId}
                onValueChange={(value) => setFormData({ ...formData, salesmanId: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {salesmen.map((salesman) => (
                    <SelectItem key={salesman.id} value={salesman.id}>
                      {salesman.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contato Inicial">Contato Inicial</SelectItem>
                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                    <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                    <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                    <SelectItem value="Fechado Ganho">Fechado Ganho</SelectItem>
                    <SelectItem value="Fechado Perdido">Fechado Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="estimatedValue">Valor Estimado</Label>
                <Input
                  id="estimatedValue"
                  type="number"
                  value={formData.estimatedValue}
                  onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                  placeholder="2500.00"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {opportunity ? "Atualizar" : "Criar Oportunidade"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
