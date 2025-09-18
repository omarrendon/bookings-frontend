import NavigationBreadCrumb from "@/components/ui/NavigationBreadCrumb";

interface BusinessSchedulePageProps {
  params: {
    id: string;
  };
}

export default function BusinessSchedulePage({
  params: { id },
}: BusinessSchedulePageProps) {
  return (
    <div className="w-full flex flex-col my-10 px-4">
      <NavigationBreadCrumb url={`/business/${id}`} label="Inicio" id={id} />
      <h1 className="text-3xl font-bold mb-4">Reservar en el negocio {id}</h1>
      <p className="text-lg">
        Aquí puedes implementar la funcionalidad de reserva para el negocio con
        ID: {id}
      </p>
    </div>
  );
}
