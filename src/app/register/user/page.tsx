import UserRegisterForm from "@/app/components/UserRegisterForm";
import { NavbarDemo } from "@/app/components/NavbarDemo";

export default function UserRegisterPage() {
  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen flex items-center justify-center">
        <UserRegisterForm />
      </div>
    </>
  );
}
