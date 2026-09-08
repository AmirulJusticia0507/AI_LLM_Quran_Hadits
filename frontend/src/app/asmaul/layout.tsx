import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asmaul Husna",
  description: "99 Nama Allah SWT (Asmaul Husna) dalam tulisan Arab, Latin, beserta artinya, dilengkapi pencarian.",
};

export default function AsmaulLayout({ children }: { children: React.ReactNode }) {
  return children;
}
