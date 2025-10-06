import CardInformation from "@/app/(core)/dashboard/components/CardInformation";
import DashboardChart from "./components/DashboardChart";

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-6 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CardInformation
          title="Total Revenue"
          value="$1,250.00"
          porcent="12.5"
          textInformation="Trending up this month"
          description="Visitors for the last 6 months"
        />
        <CardInformation
          title="Total Users"
          value="5,432"
          porcent="8.3"
          textInformation="New users this month"
          description="Users for the last 6 months"
        />
        <CardInformation
          title="New Orders"
          value="1,234"
          porcent="5.1"
          textInformation="Orders this month"
          description="Orders for the last 6 months"
        />
      </div>
      <div className="w-full max-w-7xl">
        <DashboardChart />
      </div>
    </div>
  );
}
