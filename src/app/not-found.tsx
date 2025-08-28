import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-primary/20 text-8xl font-bold select-none sm:text-9xl">404</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">Página não encontrada</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Ops! A página que você está procurando não existe ou foi movida.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg border p-4">
              <div className="text-muted-foreground mb-2 flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Sugestões:</span>
              </div>
              <ul className="text-muted-foreground space-y-1 text-left text-sm">
                <li>• Verifique se o endereço está correto</li>
                <li>• Volte à página inicial</li>
                <li>• Use o menu para navegar</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Ir para início
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="bg-primary/5 absolute -top-40 -right-32 h-80 w-80 rounded-full blur-3xl" />
          <div className="bg-secondary/5 absolute -bottom-40 -left-32 h-80 w-80 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
