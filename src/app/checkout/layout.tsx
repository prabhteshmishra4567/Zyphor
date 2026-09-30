import { redirect } from "next/navigation";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("/contact");
}