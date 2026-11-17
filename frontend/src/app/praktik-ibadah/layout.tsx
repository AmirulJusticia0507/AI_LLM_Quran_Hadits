import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meneladani Wudhu dan Shalat Nabi",
  description: "Panduan urutan wudhu dan shalat dengan ilustrasi, bacaan, dan rujukan hadits.",
};

export default function PraktikIbadahLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
