import { redirect } from "next/navigation";

export default function DashboardLoginRedirectPage() {
  redirect("/panel/login");
}
