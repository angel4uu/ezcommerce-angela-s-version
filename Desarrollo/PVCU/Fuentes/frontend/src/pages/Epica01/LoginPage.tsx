import { Helmet } from "react-helmet-async";
import personaComputadora from "../../assets/persona_computadora.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  correo: z
    .string({ message: "Email inválido" })
    .email({ message: "Email inválido" })
    .max(50, { message: "Email debe tener como máximo 50 carácteres" }),
  contrasena: z
    .string({ message: "Contraseña inválida" })
    .min(6, { message: "Contraseña debe tener como mínimo 6 carácteres" }),
});

type FormFields = z.infer<typeof formSchema>;

export const LoginPage = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contrasena: "",
    },
  });

  function onSubmit(values: FormFields) {
    console.log(values);
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className=" h-screen py-10 px-10 md:px-20 lg:px-36 ">
        <div className=" h-full flex gap-10">
          <div className="bg-slate-600 h-full w-full flex-1  hidden lg:flex">
            <img src={personaComputadora} className="object-cover w-full" />
          </div>

          <div className="flex-1 py-8 h-full">
            <div className="bg-[rgba(118,165,222,0.51)] p-10 h-full flex flex-col justify-between">
              <div className="bg-white h-full py-6 px-12 flex flex-col">
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    <img
                      src="/Ezcommerce-logo-light.png"
                      className="h-16 md:h-20"
                    />
                  </div>
                  <p className="text-secondaryLight text-center text-sm font-semibold">
                    Inicia sesión con tu correo institucional
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col h-full justify-around"
                  >
                    <FormField
                      name="correo"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Correo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="usuario@unmsm.edu.pe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="contrasena"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Contraseña
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduce tu contraseña"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="bg-secondaryLight hover:bg-secondaryLight hover:opacity-95 w-full"
                    >
                      Iniciar sesión
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="bg-terciaryDark flex flex-col text-center py-3 gap-4">
                <p>
                  ¿No tienes cuenta?{" "}
                  <Link to="/register">
                    <span className="text-secondaryLight font-semibold">
                      Regístrate
                    </span>
                  </Link>{" "}
                </p>
                <p>¿Olvidaste tu contraseña?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
