import { useEffect, useState } from "react";
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
import { toast } from "@/hooks/use-toast";
import { api } from "@/services/api";

interface OpportunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity?: any;
  opportunities: any[];
}

export const OpportunityDialog = ({ open, onOpenChange, opportunity, opportunities }: OpportunityDialogProps) => {
  const [formData, setFormData] = useState({
    customerId: "",
    salesmanId: "",
    courseId: "",
    salesStatus: "PROGRESS",
    paymentMethod: "PIX",
    finished_in: null
  });

  useEffect(() => {
    if (opportunity !== null && opportunity !== undefined) {
      setFormData({
        customerId: opportunity?.customer.id,
        salesmanId: opportunity?.salesman.id,
        courseId: opportunity?.course.id,
        salesStatus: opportunity?.salesStatus,
        paymentMethod: opportunity?.paymentMethod,
        finished_in: null
      });
    } else {

      setFormData({
        customerId: "",
        salesmanId: "",
        courseId: "",
        salesStatus: "PROGRESS",
        paymentMethod: "PIX",
        finished_in: null
      });
    }



  }, [opportunity, open]);



  const [customers, setCutomers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [salesman, setSalesman] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = opportunity ?
      await api.put(`oportunity/${opportunity.id}`, formData) :
      await api.post('oportunity', formData);

    if (response.status === 201 || response.status === 200) {

      if (opportunity !== null) {
        const updateOpportunity = response.data;
        opportunities.map((op) => {
          op.id === updateOpportunity.id ?
            { ...opportunity, updateOpportunity } :
            op
        })

        setFormData({
          customerId: "",
          salesmanId: "",
          courseId: "",
          salesStatus: "PROGRESS",
          paymentMethod: "PIX",
          finished_in: null
        });
      } else {
        const newOportunity = response.data;
        opportunities.push(newOportunity);
        setFormData({
          customerId: "",
          salesmanId: "",
          courseId: "",
          salesStatus: "PROGRESS",
          paymentMethod: "PIX",
          finished_in: null
        });
      }

      toast({
        title: opportunity ? "Oportunidade atualizada!" : "Oportunidade criada!",
        description: opportunity
          ? "A oportunidade foi atualizada com sucesso."
          : "Nova oportunidade adicionada ao pipeline.",
      });

      onOpenChange(false);

    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseCustomers = await api.get('customers');
      const responseCourses = await api.get('course');
      const responseSalesman = await api.get('salesman');

      if (
        responseCustomers.status === 200
        && responseCourses.status === 200
        && responseSalesman.status === 200
      ) {
        setCutomers(responseCustomers.data);
        setCourses(responseCourses.data);
        setSalesman(responseSalesman.data);
      }
    }

    fetchData();
  }, [])

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
                disabled={opportunity}
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
                disabled={opportunity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o curso" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={String(course.id)}>
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
                  {salesman?.map((salesman) => (
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
                  value={formData.salesStatus}
                  onValueChange={(value) => setFormData({ ...formData, salesStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PROGRESS">Em Negociação</SelectItem>
                    <SelectItem value="WON">Fechado Ganho</SelectItem>
                    <SelectItem value="LOSE">Fechado Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Forma de Pagamento *</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIX">Pix</SelectItem>
                    <SelectItem value="CREDIT_CARD">Cartão Crédito</SelectItem>
                    <SelectItem value="DEBIT_CARD">Cartão Débito</SelectItem>
                    <SelectItem value="MONEY">Dinheiro</SelectItem>
                  </SelectContent>
                </Select>
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
