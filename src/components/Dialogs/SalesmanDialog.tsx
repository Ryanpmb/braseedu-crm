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

interface SalesmanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salesman?: any;
}

export const SalesmanDialog = ({ open, onOpenChange, salesman }: SalesmanDialogProps) => {
  const [formData, setFormData] = useState({
    name: salesman?.name || "",
    email: salesman?.email || "",
    phone: salesman?.phone || "",
    birthDate: salesman?.birthDate || "",
    department: salesman?.department || "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!salesman && formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Dados do vendedor:", formData);
    
    toast({
      title: salesman ? "Vendedor atualizado!" : "Vendedor criado!",
      description: salesman 
        ? "As informações do vendedor foram atualizadas."
        : "Novo vendedor adicionado à equipe.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {salesman ? "Editar Vendedor" : "Novo Vendedor"}
          </DialogTitle>
          <DialogDescription>
            {salesman 
              ? "Atualize as informações do vendedor."
              : "Adicione um novo vendedor à equipe."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Maria Santos"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="maria@brasedu.com"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="birthDate">Data de Nascimento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="department">Departamento *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vendas Online">Vendas Online</SelectItem>
                  <SelectItem value="Vendas Presencial">Vendas Presencial</SelectItem>
                  <SelectItem value="Vendas Corporativas">Vendas Corporativas</SelectItem>
                  <SelectItem value="Inside Sales">Inside Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {!salesman && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mínimo 6 caracteres"
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repita a senha"
                    required
                    minLength={6}
                  />
                </div>
              </>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {salesman ? "Atualizar" : "Criar Vendedor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
