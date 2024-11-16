import { Helmet } from "react-helmet-async";
import personaGestion from "../../assets/persona_gestion.png";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getFileURL } from "../../utils/helpers";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { createUser,escuelaProfesional  } from "@/api/api";
import { Link } from "react-router-dom";


const formSchema = z.object({
  id_escuela: z.number(),
  username: z.string(),
  email: z.string().email("Correo electrónico inválido"),
  nombres: z.string().min(1, "Nombres son requeridos"),
  apellido_p: z.string().min(1, "Apellido paterno es requerido"),
  apellido_m: z.string().min(1, "Apellido materno es requerido"),
  celular: z.string().min(9, "Celular debe tener al menos 9 dígitos"),
  codigo: z.string().min(1, "Código de estudiante es requerido"),
  
  codigoqr: z.string().url("URL inválida").optional().or(z.literal("")),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const RegisterPage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      nombres: "",
      apellido_p: "",
      apellido_m: "",
      celular: "",
      codigo: "",
      codigoqr: "",
      password: "",
      id_escuela: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fileInput = form.getValues("codigoqr");
    let updatedValues = { ...values };
    
    // Aquí iría la lógica para enviar formData al servidor
    //Set username as email
    updatedValues = { ...updatedValues, username: updatedValues.email };
    console.log("Datos del formulario:", updatedValues);
    try {
      const { codigoqr, ...rest } = updatedValues;
      
      await createUser(rest as any);
      toast.success("Su cuenta fue registrada con éxito");
    } catch (error) {
      toast.error("Se produjo un error al crear su cuenta");
      console.error("Error creating user:", error);
    }
    
  }

  // const [escuelas, setEscuelas] = useState([]);
  // const fetchEscuelas = async () => {
  //   try {
  //     const response = await escuelaProfesional ();
  //     setEscuelas(response.data);
  //   } catch (error) {
  //     console.error("Error fetching escuelas:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchEscuelas();
  // }, []);
  // console.log(escuelas);
  return (
    <>
      <Helmet>
        <title>Registrarse</title>
      </Helmet>

      <div className=" h-screen py-2 px-10 md:px-20 lg:px-36 ">
        <div className=" h-full flex gap-14">
          <div className="bg-slate-600 h-full w-full flex-1  hidden lg:flex">
            <img src={personaGestion} className="object-cover w-full" />
          </div>

          <div className="flex-1 h-full">
            <div className="bg-secondaryLightOpacity opacity-100 p-6 md:h-full flex flex-col justify-between">
              <div className="bg-white h-full py-2 px-12 flex flex-col">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <img src="/Ezcommerce-logo-light.png" className="h-16" />
                  </div>
                  <p className="text-secondaryLight text-center text-sm font-semibold">
                    Crear tu cuenta
                  </p>
                  <p className="text-secondaryLight text-center text-sm">
                    Llena tus datos en el siguiente formulario
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="id_escuela"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Escuela Profesional</FormLabel>
                          <Select
                            onValueChange={(value)=>field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu escuela" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="1">
                                Ingeniería de sistemas
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="correo@ejemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nombres"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombres</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombres" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apellido_p"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido paterno</FormLabel>
                          <FormControl>
                            <Input placeholder="Apellido paterno" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apellido_m"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido materno</FormLabel>
                          <FormControl>
                            <Input placeholder="Apellido materno" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="celular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <Input placeholder="Número de celular" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="codigo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código de estudiante</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Código de estudiante"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="codigoqr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código QR</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0] || "")
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Opcional: Sube una imagen del código QR
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Contraseña"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Crear cuenta
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="bg-terciaryDark flex flex-col text-center py-2">
                <p>
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login">
                    <span className="text-secondaryLight font-semibold">
                      Inicia sesión
                    </span>
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
