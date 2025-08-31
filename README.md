# BeWear Bootcamp 👟

Um e-commerce moderno de roupas e calçados esportivos desenvolvido com as mais recentes tecnologias web.

## 🚀 Tecnologias e Bibliotecas

### Frontend

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes baseada em Radix UI
- **Lucide React** - Ícones SVG

### Formulários e Validação

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Validação de esquemas TypeScript-first
- **@hookform/resolvers** - Integração entre React Hook Form e Zod
- **react-number-format** - Formatação de inputs numéricos

### Estado e Dados

- **TanStack React Query** - Gerenciamento de estado servidor
- **nuqs** - Gerenciamento de query parameters

### Banco de Dados

- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM TypeScript-first

### Autenticação

- **Better Auth** - Sistema de autenticação moderno
- **Google OAuth** - Login com Google

### Pagamentos

- **Stripe** - Processamento de pagamentos

### UI/UX

- **Radix UI** - Componentes primitivos acessíveis
- **Class Variance Authority** - Utilitário para variantes de componentes
- **Sonner** - Notificações toast
- **tw-animate-css** - Animações CSS com Tailwind

## 📁 Estrutura do Projeto

```
bewear-bootcamp/
├── .cursor/                    # Configurações do Cursor IDE
├── .trae/                      # Configurações do Trae AI
├── .vscode/                    # Configurações do VS Code
├── public/                     # Arquivos estáticos
│   ├── logo.svg
│   ├── banner-*.png
│   └── *.svg                   # Ícones de marcas
├── src/
│   ├── actions/                # Server Actions do Next.js
│   │   ├── add-cart-product/
│   │   ├── create-checkout-session/
│   │   ├── get-categories/
│   │   └── .../
│   ├── app/                    # App Router do Next.js
│   │   ├── api/                # API Routes
│   │   ├── authentication/     # Páginas de autenticação
│   │   ├── cart/               # Páginas do carrinho
│   │   ├── category/           # Páginas de categoria
│   │   ├── checkout/           # Páginas de checkout
│   │   ├── my-orders/          # Páginas de pedidos
│   │   ├── product-variant/    # Páginas de produtos
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout raiz
│   │   └── page.tsx            # Página inicial
│   ├── components/             # Componentes React
│   │   ├── common/             # Componentes compartilhados
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── data/                   # Camada de dados
│   │   ├── categories/
│   │   └── products/
│   ├── db/                     # Configuração do banco
│   │   ├── index.ts            # Instância do Drizzle
│   │   ├── schema.ts           # Esquemas das tabelas
│   │   └── seed.ts             # Dados de exemplo
│   ├── hooks/                  # Hooks customizados
│   │   ├── mutations/          # Hooks de mutação
│   │   └── queries/            # Hooks de consulta
│   ├── lib/                    # Utilitários e configurações
│   │   ├── auth.ts             # Configuração Better Auth
│   │   ├── auth-client.ts      # Cliente de autenticação
│   │   └── utils.ts            # Utilitários gerais
│   ├── providers/              # Providers React
│   │   └── react-query.tsx     # Provider do React Query
│   └── utils/                  # Utilitários específicos
│       └── money.ts            # Formatação monetária
├── components.json             # Configuração shadcn/ui
├── drizzle.config.ts          # Configuração Drizzle
├── next.config.ts             # Configuração Next.js
├── package.json               # Dependências e scripts
├── tailwind.config.js         # Configuração Tailwind
└── tsconfig.json              # Configuração TypeScript
```

## ⚙️ Requisitos do Sistema

- **Node.js** 18.17 ou superior
- **npm**, **yarn**, **pnpm** ou **bun**
- **PostgreSQL** 12 ou superior
- **Conta Stripe** (para pagamentos)
- **Conta Google Cloud** (para OAuth, opcional)

## 🛠️ Configuração e Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd bewear-bootcamp
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Banco de dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/bewear_db"

# Aplicação
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Better Auth
BETTER_AUTH_SECRET="seu-secret-muito-seguro"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="seu-google-client-id"
GOOGLE_CLIENT_SECRET="seu-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Configure o banco de dados

```bash
# Execute as migrações
npx drizzle-kit push

# (Opcional) Popule com dados de exemplo
npx tsx src/db/seed.ts
```

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📚 Exemplos de Implementação

### Server Action com Validação

```typescript
// src/actions/add-cart-product/schema.ts
import { z } from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.string().uuid(),
  quantity: z.number().min(1).max(10),
});

export type AddProductToCartSchema = z.infer<typeof addProductToCartSchema>;

// src/actions/add-cart-product/index.ts
("use server");

import { db } from "@/db";
import { addProductToCartSchema } from "./schema";

export async function addProductToCart(data: AddProductToCartSchema) {
  const validatedData = addProductToCartSchema.parse(data);
  // Lógica da server action...
}
```

### Hook de Mutação com React Query

```typescript
// src/hooks/mutations/use-add-to-cart.ts
import { useMutation } from "@tanstack/react-query";
import { addProductToCart } from "@/actions/add-cart-product";

export function useAddToCart() {
  return useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      // Invalidar queries relacionadas
    },
  });
}

export const getAddToCartMutationKey = () => ["add-to-cart"];
```

### Componente com Formulário

```typescript
// Componente usando React Hook Form + Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ProductForm() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { quantity: 1 },
  });

  const mutation = useAddToCart();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(mutation.mutate)}>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          Adicionar ao Carrinho
        </Button>
      </form>
    </Form>
  );
}
```

### Esquema do Banco de Dados

```typescript
// src/db/schema.ts
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const productTable = pgTable("product", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id").references(() => categoryTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const productVariantTable = pgTable("product_variant", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => productTable.id),
  color: text("color").notNull(),
  priceInCents: integer("price_in_cents").notNull(),
});
```

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run start        # Inicia servidor de produção

# Linting
npm run lint         # Executa ESLint

# Banco de dados
npx drizzle-kit push      # Aplica mudanças no schema
npx drizzle-kit studio    # Interface visual do banco
npx tsx src/db/seed.ts    # Popula dados de exemplo
```

## 🔐 Funcionalidades Implementadas

- ✅ **Autenticação** - Login/registro com email e Google OAuth
- ✅ **Catálogo de Produtos** - Listagem e filtros por categoria
- ✅ **Carrinho de Compras** - Adicionar, remover e gerenciar itens
- ✅ **Checkout** - Processo completo de compra
- ✅ **Pagamentos** - Integração com Stripe
- ✅ **Endereços** - Gerenciamento de endereços de entrega
- ✅ **Pedidos** - Histórico de compras do usuário
- ✅ **Responsivo** - Design adaptável para todos os dispositivos

## 📱 Design System

O projeto utiliza um design system consistente baseado em:

- **Cores**: Paleta neutra com acentos em azul
- **Tipografia**: Font Geist otimizada
- **Espaçamento**: Sistema baseado em múltiplos de 4px
- **Componentes**: Biblioteca shadcn/ui com customizações

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**BeWear Bootcamp** - Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.
