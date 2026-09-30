import { redirect } from "next/navigation";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("/contact");
}