import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/money";

interface CartSummaryProps {
  cart: {
    items: Array<{
      id: string;
      quantity: number;
      productVariant: {
        id: string;
        name: string;
        priceInCents: number;
        imageUrl: string;
        product: {
          name: string;
        };
      };
    }>;
  };
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.items.reduce(
    (total, item) => total + item.productVariant.priceInCents * item.quantity,
    0
  );

  const shippingCost = 0; // Grátis
  const estimatedTax = 0; // Não aplicável
  const total = subtotal + shippingCost + estimatedTax;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Seu pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumo financeiro */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Subtotal</span>
            <span className="text-sm text-gray-600">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Transporte e Manuseio</span>
            <span className="text-sm text-gray-600">Grátis</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-semibold">Taxa Estimada</span>
            <span className="text-sm text-gray-600">-</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold">{formatCurrency(total)}</span>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Lista de produtos */}
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <Image
                src={item.productVariant.imageUrl}
                alt={item.productVariant.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm">
                  {item.productVariant.product.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {item.productVariant.name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.quantity}
                </p>

              </div>
              <div className="flex flex-col items-end justify-center gap-1">
                <p className="font-semibold text-sm">
                  {formatCurrency(item.productVariant.priceInCents * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
