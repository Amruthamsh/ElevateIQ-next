import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./_components/form";

export default async function RegisterPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="bg-black h-screen flex items-center justify-center">
      <div className="w-[600px] ">
        <Form />
      </div>
    </section>
  );
}