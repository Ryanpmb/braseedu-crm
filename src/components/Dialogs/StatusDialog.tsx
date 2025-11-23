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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStatus: string;
  entityType: "customer" | "opportunity" | "sale";
  onStatusChange: (newStatus: string, notes?: string) => void;
}

export const StatusDialog = ({ 
  open, 
  onOpenChange, 
  currentStatus,
  entityType,
  onStatusChange 
}: StatusDialogProps) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [notes, setNotes] = useState("");

  const getStatusOptions = () => {
    switch (entityType) {
      case "customer":
        return [
          "Novo Lead",
          "Contato Realizado",
          "Qualificado",
          "Em Negociação",
          "Perdido",
        ];
      case "opportunity":
        return [
          "Contato Inicial",
          "Qualificado",
          "Proposta Enviada",
          "Em Negociação",
          "Fechado Ganho",
          "Fechado Perdido",
        ];
      case "sale":
        return [
          "Pendente",
          "Concluída",
          "Cancelada",
        ];
      default:
        return [];
    }
  };

  const getEntityLabel = () => {
    switch (entityType) {
      case "customer":
        return "cliente";
      case "opportunity":
        return "oportunidade";
      case "sale":
        return "venda";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onStatusChange(newStatus, notes);
    
    toast({
      title: "Status atualizado!",
      description: `O status da ${getEntityLabel()} foi alterado para "${newStatus}".`,
    });
    
    onOpenChange(false);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Atualizar Status</DialogTitle>
          <DialogDescription>
            Altere o status da {getEntityLabel()} e adicione observações se necessário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Status Atual</Label>
              <div className="px-3 py-2 bg-muted rounded-md text-sm">
                {currentStatus}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="newStatus">Novo Status *</Label>
              <Select
                value={newStatus}
                onValueChange={setNewStatus}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getStatusOptions().map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Adicione notas sobre a mudança de status..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={newStatus === currentStatus}>
              Atualizar Status
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
