import CollegeRegisterForm from "@/app/components/CollegeRegisterForm";
import {NavbarDemo} from "@/app/components/NavbarDemo";

export default function RegisterCollegePage() {
  return (
    <>
      <NavbarDemo />
      <div className="min-h-screen flex items-center justify-center">
      <CollegeRegisterForm />
      </div>
    </>
  );
}
