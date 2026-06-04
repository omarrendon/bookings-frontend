// Components
import ProfileForm from "./components/ProfileForm";
// Icons
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex w-full flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <UserCircle className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mi Perfil</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Actualiza tu información personal. Los campos marcados con{" "}
            <span className="text-destructive font-medium">*</span> son
            obligatorios.
          </p>
        </div>
      </div>

      <div className="max-w-2xl w-full">
        <ProfileForm />
      </div>
    </div>
  );
}
