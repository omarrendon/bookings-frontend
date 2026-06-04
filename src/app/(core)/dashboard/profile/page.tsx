import Title from "@/components/ui/Title";
import ProfileForm from "./components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div>
        <Title text="Mi Perfil" />
        <p className="text-sm text-muted-foreground mt-1">
          Actualiza tu información personal. Los campos marcados con{" "}
          <span className="text-destructive font-medium">*</span> son obligatorios.
        </p>
      </div>
      <div className="max-w-2xl w-full">
        <ProfileForm />
      </div>
    </div>
  );
}
