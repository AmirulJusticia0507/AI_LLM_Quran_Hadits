import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arah Kiblat",
  description: "Kompas arah kiblat berdasarkan GPS: bearing ke Ka'bah, jarak, dan penunjuk live dari sensor perangkat.",
};

export default function KiblatLayout({ children }: { children: React.ReactNode }) {
  return children;
}
