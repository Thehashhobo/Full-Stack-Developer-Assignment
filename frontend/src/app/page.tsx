import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return null; // This ensures nothing is rendered
}
