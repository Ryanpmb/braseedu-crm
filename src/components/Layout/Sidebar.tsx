import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  DollarSign, 
  UserCircle,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/customers", icon: Users, label: "Clientes" },
  { to: "/opportunities", icon: Target, label: "Oportunidades" },
  { to: "/sales", icon: DollarSign, label: "Vendas" },
  { to: "/salesmen", icon: UserCircle, label: "Vendedores" },
  { to: "/interactions", icon: MessageSquare, label: "Interações" },
  { to: "/courses", icon: BookOpen, label: "Cursos" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">
            BrasEdu CRM
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1">
            Gestão de Cursos
          </p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  "hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-foreground font-medium"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};
