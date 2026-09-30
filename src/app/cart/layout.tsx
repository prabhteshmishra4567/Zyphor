import { redirect } from "next/navigation";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  void children;
  redirect("/shop");
}