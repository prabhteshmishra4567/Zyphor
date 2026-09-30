import { redirect } from "next/navigation";

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("/contact");
}