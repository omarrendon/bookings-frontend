// Components
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    title: "Corte de Cabello",
    description: "Corte de cabello profesional para hombres y mujeres.",
    price: "$20",
    time: "30 mins",
  },
  {
    title: "Manicura",
    description: "Servicio completo de manicura y pedicura.",
    price: "$30",
    time: "45 mins",
  },
  {
    title: "Masajes",
    description: "Masajes relajantes y terapéuticos.",
    price: "$50",
    time: "60 mins",
  },
  {
    title: "Tratamiento Facial",
    description: "Limpieza profunda y rejuvenecimiento facial.",
    price: "$40",
    time: "50 mins",
  },
  {
    title: "Depilación",
    description: "Depilación con cera para diferentes áreas del cuerpo.",
    price: "$25",
    time: "30 mins",
  },
  {
    title: "Peinados para Eventos",
    description: "Peinados especiales para bodas, fiestas y eventos.",
    price: "$60",
    time: "90 mins",
  },
];

export default function LayoutServices() {
  return (
    <div className="w-full flex flex-col items-center my-10 px-2">
      <h2 className="text-2xl md:text-2xl font-bold mb-4 ">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            price={service.price}
            time={service.time}
          />
        ))}
      </div>
    </div>
  );
}
