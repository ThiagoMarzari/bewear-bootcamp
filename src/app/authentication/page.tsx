"use client";

import { useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in";
import { SignUpForm } from "./components/sign-up";

export default function Authentication() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const defaultValue = tab === "signup" ? "sign-up" : "sign-in";

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-5">
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
