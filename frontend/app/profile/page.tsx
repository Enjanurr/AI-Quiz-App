import Nav from "@/components/Nav";
import UserInfo from "@/components/Profile";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
const cookieStore = await cookies();
const access = cookieStore.get("access")?.value;
if(!access) redirect("/auth/login");
  return (
    <section className="bg-slate-800 min-h-screen">
      <Nav />
     <UserInfo/>
    </section>
  );
}