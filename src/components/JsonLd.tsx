/**
 * Injeta um bloco JSON-LD (Schema.org) no HTML. Os dados são estáticos/nossos
 * (sem entrada do usuário), então o `dangerouslySetInnerHTML` é seguro aqui.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
