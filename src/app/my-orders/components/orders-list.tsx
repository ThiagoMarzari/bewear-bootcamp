import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/money";

const statusMap = {
  pending: { label: "Pago", color: "bg-green-500" },
  paid: { label: "Pago", color: "bg-green-500" },
  canceled: { label: "Cancelado", color: "bg-red-500" },
};

interface Order {
  id: string;
  status: "pending" | "paid" | "canceled";
  totalPriceInCents: number;
  createdAt: Date;
  items: Array<{
    id: string;
    quantity: number;
    priceInCents: number;
    productVariant: {
      id: string;
      name: string;
      imageUrl: string;
      product: {
        name: string;
      };
    };
  }>;
}

interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(new Date(date));
  };

  const OrderSummary = ({ order }: { order: Order }) => (
    <div className="space-y-2 border-t pt-4">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(order.totalPriceInCents)}</span>
      </div>
      <div className="flex justify-between">
        <span>Transporte e Manuseio</span>
        <span>Grátis</span>
      </div>
      <div className="flex justify-between">
        <span>Taxa Estimada</span>
        <span>-</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>{formatCurrency(order.totalPriceInCents)}</span>
      </div>
    </div>
  );

  const OrderItems = ({ items }: { items: Order["items"] }) => (
    <div className="space-y-3 py-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <Image
            src={item.productVariant.imageUrl}
            alt={item.productVariant.name}
            width={60}
            height={60}
            className="rounded-lg lg:h-20 lg:w-20"
          />
          <div className="flex-1">
            <p className="text-sm font-medium lg:text-base">{item.productVariant.product.name}</p>
            <p className="text-xs text-muted-foreground lg:text-sm">
              {item.productVariant.name} | {item.quantity}
            </p>
          </div>
          <p className="text-sm font-bold lg:text-base">{formatCurrency(item.priceInCents)}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Layout com Accordion */}
      <div className="lg:hidden">
        <Accordion type="single" collapsible className="space-y-4">
          {orders.map((order) => (
            <AccordionItem key={order.id} value={order.id} className="border rounded-lg">
              <Card className="overflow-hidden border-0">
                <CardContent className="p-0">
                  <AccordionTrigger className="px-4 py-4 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <p className="font-semibold">Data do pedido</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <OrderItems items={order.items} />
                    <OrderSummary order={order} />
                  </AccordionContent>
                </CardContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-6">
                {/* Order Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-sm font-medium">Data do pedido</p>
                      <p className="font-semibold">{formatDate(order.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${statusMap[order.status].color}`} />
                        <span className="text-sm">{statusMap[order.status].label}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Pagamento</p>
                      <p className="text-sm">Cartão</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-blue-600">
                    Detalhes do Pedido
                  </Button>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item.productVariant.imageUrl}
                          alt={item.productVariant.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{item.productVariant.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.productVariant.name} | {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">{formatCurrency(item.priceInCents)}</p>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 flex justify-end">
                  <div className="w-80 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(order.totalPriceInCents)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transporte e Manuseio</span>
                      <span>Grátis</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxa Estimada</span>
                      <span>-</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(order.totalPriceInCents)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
