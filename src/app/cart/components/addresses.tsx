"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useCreateShippingAddressMutation } from "@/hooks/mutations/use-create-shipping-address";
import { useUserAddresses } from "@/hooks/queries/use-user-addresses";

const addressFormSchema = z.object({
  email: z.email("Email inválido"),
  firstName: z.string().min(1, "Primeiro nome é obrigatório"),
  lastName: z.string().min(1, "Sobrenome é obrigatório"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
  phone: z
    .string()
    .min(1, "Celular é obrigatório")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Celular deve estar no formato (00) 00000-0000"),
  cep: z
    .string()
    .min(1, "CEP é obrigatório")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 00000-000"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
});

type AddressFormSchema = z.infer<typeof addressFormSchema>;

interface AddressesProps {
  shippingAddress: typeof shippingAddressTable.$inferSelect[];
}

export default function Addresses({ shippingAddress }: AddressesProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const createShippingAddressMutation = useCreateShippingAddressMutation();

  //Passando o conteúdo do banco de dados para o hook
  const { data: addresses, isLoading: isLoadingAddresses } = useUserAddresses({ initialData: shippingAddress });

  const form = useForm<AddressFormSchema>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      cpf: "",
      phone: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  async function onSubmit(data: AddressFormSchema) {
    try {
      await createShippingAddressMutation.mutateAsync(data);
      toast.success("Endereço salvo com sucesso!");
      form.reset(); // Limpa o formulário após sucesso
      setSelectedAddress(null); // Reseta a seleção para mostrar todos os endereços
    } catch (error) {
      toast.error("Erro ao salvar endereço");
      console.error("Erro ao criar endereço:", error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
          {/* Endereços existentes */}
          {isLoadingAddresses ? (
            <div className="flex justify-center py-4">
              <div className="text-sm text-muted-foreground">Carregando endereços...</div>
            </div>
          ) : (
            addresses?.map((address) => (
              <Card key={address.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={address.id} id={address.id} />
                    <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                      <div className="text-sm font-medium">{address.recipientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {address.street}, {address.number}
                        {address.complement && `, ${address.complement}`}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {address.neighborhood}, {address.city} - {address.state}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        CEP: {address.zipCode}
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {/* Botão Adicionar novo endereço */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="add_new" id="add_new" />
                <Label htmlFor="add_new" className="cursor-pointer">Adicionar novo endereço</Label>
              </div>
            </CardContent>
          </Card>
        </RadioGroup>
        {selectedAddress === "add_new" && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Adicionar novo endereço</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu email"
                          disabled={createShippingAddressMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Primeiro Nome e Sobrenome */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primeiro Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu primeiro nome"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu sobrenome"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* CPF e Celular */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="###.###.###-##"
                            mask="_"
                            customInput={Input}
                            placeholder="000.000.000-00"
                            disabled={createShippingAddressMutation.isPending}
                            onValueChange={(values) => {
                              field.onChange(values.formattedValue);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <PatternFormat
                            format="(##) #####-####"
                            mask="_"
                            customInput={Input}
                            placeholder="(00) 00000-0000"
                            disabled={createShippingAddressMutation.isPending}
                            onValueChange={(values) => {
                              field.onChange(values.formattedValue);
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* CEP */}
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          mask="_"
                          customInput={Input}
                          placeholder="00000-000"
                          disabled={createShippingAddressMutation.isPending}
                          onValueChange={(values) => {
                            field.onChange(values.formattedValue);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Endereço */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o endereço"
                          disabled={createShippingAddressMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Número e Complemento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o número"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o complemento (opcional)"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Bairro, Cidade e Estado */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o bairro"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite a cidade"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite o estado"
                            disabled={createShippingAddressMutation.isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Botão de Submit */}
                <Button type="submit" disabled={createShippingAddressMutation.isPending} className="w-full">
                  {createShippingAddressMutation.isPending ? "Salvando..." : "Continuar com o pagamento"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
