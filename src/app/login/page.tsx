import LoginForm from "@/app/components/LoginForm";
import { NavbarDemo } from "@/app/components/NavbarDemo";

export default function LoginPage() {
  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    </>
  );
}
