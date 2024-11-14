import { Helmet } from "react-helmet-async";
import personaGestion from "../../assets/persona_gestion.png";
import { useState } from "react";
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
import { createUser } from "@/api/api";
import { Link } from "react-router-dom";

const formSchema = z.object({
  id_escuela: z.string().min(1, "Escuela Profesional es requerida"),
  username: z.string(),
  email: z.string().email("Correo electrónico inválido"),
  nombres: z.string().min(1, "Nombres son requeridos"),
  apellido_p: z.string().min(1, "Apellido paterno es requerido"),
  apellido_m: z.string().min(1, "Apellido materno es requerido"),
  celular: z.string().min(9, "Celular debe tener al menos 9 dígitos"),
  codigo: z.string().min(1, "Código de estudiante es requerido"),
  fecha_nacimiento: z.date({
    required_error: "Fecha de nacimiento es requerida",
  }),
  codigoqr: z.string().url("URL inválida").optional().or(z.literal("")),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const RegisterPage = () => {
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_escuela: "",
      username: "",
      email: "",
      nombres: "",
      apellido_p: "",
      apellido_m: "",
      celular: "",
      codigo: "",
      codigoqr: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const fileInput = form.getValues("codigoqr");
    let updatedValues = { ...values };
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, String(value));
      }
    });
    
    console.log('Form data:', Object.fromEntries(formData));
    // Aquí iría la lógica para enviar formData al servidor
    //Set username as email
    updatedValues = { ...updatedValues, username: updatedValues.email };

    try {
      const { codigoqr, ...rest } = updatedValues;
      await createUser(rest as any);
      toast.success("Su cuenta fue registrada con éxito");
    } catch (error) {
      toast.error("Se produjo un error al crear su cuenta");
    }
    console.log("Datos del formulario:", updatedValues);
  }

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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona tu escuela" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="escuela1">
                                Escuela 1
                              </SelectItem>
                              <SelectItem value="escuela2">
                                Escuela 2
                              </SelectItem>
                              <SelectItem value="escuela3">
                                Escuela 3
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
                      name="fecha_nacimiento"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha de nacimiento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Selecciona una fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
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
