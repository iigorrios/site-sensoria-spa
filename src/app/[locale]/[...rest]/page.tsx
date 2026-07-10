import { notFound } from 'next/navigation';

// Qualquer rota desconhecida dentro de um idioma cai no 404 localizado
// (src/app/[locale]/not-found.tsx), que já vive dentro do layout com <html>.
export default function CatchAll() {
  notFound();
}
