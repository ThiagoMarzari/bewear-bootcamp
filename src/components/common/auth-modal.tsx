"use client";

import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Acesse sua conta
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Para continuar, você precisa fazer login ou criar uma conta
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full rounded-full" size="lg">
            <Link href="/authentication?tab=signin" onClick={onClose}>
              <LogIn className="mr-2 h-4 w-4" />
              Fazer Login
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full rounded-full" size="lg">
            <Link href="/authentication?tab=signup" onClick={onClose}>
              <UserPlus className="mr-2 h-4 w-4" />
              Cadastrar-se
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}