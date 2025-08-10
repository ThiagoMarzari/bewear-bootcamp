/**
 * Formata um valor em centavos para o formato de moeda brasileira (R$)
 * @param priceInCents - Valor em centavos (ex: 1299 = R$ 12,99)
 * @returns String formatada em moeda brasileira
 */
export function formatCurrency(priceInCents: number): string {
  const priceInReais = priceInCents / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInReais);
}
