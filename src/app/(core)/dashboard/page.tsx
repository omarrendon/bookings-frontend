// Components
import DashboardGreeting from "./components/DashboardGreeting";
import CardInformation from "./components/CardInformation";
import DashboardChart from "./components/DashboardChart";
// Icons
import { CalendarCheck, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-6 md:gap-8">

      {/* Greeting + quick actions */}
      <DashboardGreeting />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CardInformation
          icon={CalendarCheck}
          title="Reservas del mes"
          value="1,234"
          percent="5.1"
          trend="up"
          description="Reservas confirmadas en los últimos 30 días."
        />
        <CardInformation
          icon={DollarSign}
          title="Ingresos estimados"
          value="$12,500"
          percent="12.5"
          trend="up"
          description="Basado en reservas completadas este mes."
        />
        <CardInformation
          icon={Users}
          title="Clientes atendidos"
          value="432"
          percent="3.2"
          trend="neutral"
          description="Clientes únicos en los últimos 30 días."
        />
      </div>

      {/* Chart */}
      <div className="w-full max-w-7xl">
        <DashboardChart />
      </div>
    </div>
  );
}
