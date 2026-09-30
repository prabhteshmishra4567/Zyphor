import { redirect } from "next/navigation";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("/contact");
}