import { Helmet } from "react-helmet-async";
import personaGestion from "../../assets/persona_gestion.png";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {getFileURL} from "../../utils/helpers";

const formSchema = z.object({
  nombres: z
    .string({message: "Nombres inválidos"})
    .max(50, { message: "Nombres deben tener como máximo 50 carácteres" }),
  apellido_paterno: z
    .string({message: "Apellido inválido"})
    .max(30, { message: "Apellido debe tener como máximo 30 carácteres" }),
  apellido_materno: z
    .string({message: "Apellido inválido"})
    .max(30, { message: "Apellido debe tener como máximo 30 carácteres" }),
  codigo: z
    .string({message: "Código inválido"})
    .max(8, { message: "Código debe tener como máximo 8 carácteres" }),
  qr_yape: z
    .instanceof(FileList)
    .optional()
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true; 
      const file = fileList[0];
      return file && file.type.startsWith("image/"); 
    }, { message: "El archivo debe ser una imagen." }),
  facultad: z
    .string({required_error:"Seleccione una facultad"})
    .max(100, { message: "Facultad debe tener como máximo 100 carácteres" }),
  correo: z
    .string({ message: "Email inválido" })
    .email({ message: "Email inválido" })
    .max(50, { message: "Email debe tener como máximo 50 carácteres" }),
  contrasenna: z
    .string({ message: "Contraseña inválida" })
    .min(6, { message: "Contraseña debe tener como mínimo 6 carácteres" }),
});

type FormFields = z.infer<typeof formSchema>;

export const RegisterPage = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres:"",
      apellido_paterno:"",
      apellido_materno:"",
      codigo:"",
      qr_yape:undefined,
      correo: "",
      contrasenna: "",
    },
  });
  const fileRef = form.register("qr_yape");

  async function onSubmit(values: FormFields) {
    const fileInput = form.getValues("qr_yape");
  
    if (fileInput && fileInput[0]) {
      const selectedFile = fileInput[0]; 
      try{
        const url= await getFileURL(selectedFile,"qr_yape_images");
        const updatedValues = { ...values, qr_yape: url };
        console.log("Datos del formulario con URL de QR:", updatedValues);
      }
      catch(error){
        console.error("Error al obtener el URL del archivo:", error);
      };
    } 
    else {
      console.log("Datos del formulario:", values);
    }
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
            <div className="bg-[rgba(118,165,222,0.51)] p-6 md:h-full flex flex-col justify-between">
              <div className="bg-white h-full py-2 px-12 flex flex-col">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <img
                      src="/Ezcommerce-logo-light.png"
                      className="h-16"
                    />
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
                    className="flex flex-col h-full justify-around"
                  >
                    <FormField
                      name="nombres"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Nombres
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombres"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:flex justify-between gap-1 ">
                      <FormField
                        name="apellido_paterno"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">
                              Apellido paterno
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apellido paterno"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="apellido_materno"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">
                              Apellido materno
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Apellido materno"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />                      
                    </div>
                    <div className="md:flex justify-between gap-1">
                      <FormField
                        name="codigo"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">
                              Código institucional
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Código"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="qr_yape"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">
                              QR Yape
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                {...fileRef}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />                      
                    </div>
                    <FormField
                      name="facultad"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Facultad
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una facultad"/>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="FISI">FISI</SelectItem>
                              <SelectItem value="FIEE">FIEE</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      name="contrasenna"
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
    </>
  );
}
