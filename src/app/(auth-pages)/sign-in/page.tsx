"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import {FcGoogle} from "react-icons/fc"
import { toast } from "sonner";
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      signIn("google", {
        redirectTo: "/dashboard",
        redirect: true
      });
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <CardTitle className="text-2xl font-bold text-center">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-center">
            Inicia sesión para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
            ) : (
              <>
                <FcGoogle className="h-5 w-5" />
                <span>Continuar con Google</span>
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-xs text-center text-muted-foreground">
            Al iniciar sesión, aceptas nuestros{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Términos de servicio
            </a>{" "}
            y{" "}
            <a
              href="#"
              className="underline underline-offset-2 hover:text-primary"
            >
              Política de privacidad
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
