"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      signIn("google", {
        redirectTo: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.name, error.message);
      }
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md shadow-lg bg-black">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-center text-white">
            Inicia sesión para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6 bg-black"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
            ) : (
              <>
                <FcGoogle className="h-5 w-5" />
                <span className="text-white">Continuar con Google</span>
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
