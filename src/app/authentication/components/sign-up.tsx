"use client"

import z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().trim().min(3, "Nome inválido"),
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha inválida"),
  confirmPassword: z.string().min(8, "Senha inválida"),
}).refine((data) => {
  return data.password === data.confirmPassword
}, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

type FormSchema = z.infer<typeof formSchema>


export function SignUpForm() {
  const router = useRouter()
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: FormSchema) {

    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    }, {
      onRequest: (ctx) => {
        //show loading
      },
      onSuccess: () => {
        toast.success("Conta criada com sucesso")
        router.push("/")

      },
      onError: (error) => {
        toast.error(error.error.message)
      },
    })

  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>
            Crie sua conta para começar a usar o sistema.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite sua senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirme sua senha" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </CardContent>
            <CardFooter>
              <Button type="submit">Criar conta</Button>
            </CardFooter>
          </form>
        </Form>

      </Card >
    </>
  )
}
