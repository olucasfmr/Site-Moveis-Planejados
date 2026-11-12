import "./globals.css";
import { business } from "../lib/site-config";

export const metadata = {
  title: `${business.name} | Móveis planejados com alma de madeira`,
  description: "Marcenaria sob medida com cuidado artesanal e desenho contemporâneo. Criamos ambientes que acolhem a sua vida, do primeiro projeto à instalação.",
  openGraph: {
    title: `${business.name} | Marcenaria sob medida`,
    description: "Móveis planejados com alma de madeira, feitos para a sua casa e para a sua história.",
    type: "website",
    locale: "pt_BR"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
