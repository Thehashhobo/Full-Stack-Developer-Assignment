import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  redirect("/dashboard");
  return null; // This ensures nothing is rendered
}
