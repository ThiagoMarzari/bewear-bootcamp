"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SignInForm } from "./components/sign-in";
import { SignUpForm } from "./components/sign-up";

function AuthenticationContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const defaultValue = tab === "signup" ? "sign-up" : "sign-in";

  return (
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
  );
}

export default function Authentication() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-5">
      <Suspense fallback={<div>Carregando...</div>}>
        <AuthenticationContent />
      </Suspense>
    </div>
  );
}
