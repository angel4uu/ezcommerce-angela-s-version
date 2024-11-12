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
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { getFileURL } from "../../utils/helpers";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { createUser } from "@/api/api";

const formSchema = z.object({
  first_name: z
    .string({ message: "Nombres inválidos" })
    .min(1,{message:"Nombres inválidos"})
    .max(50, { message: "Nombres deben tener como máximo 50 carácteres" }),
  last_name: z
    .string({ message: "Apellidos inválidos" })
    .min(1,{message:"Apellidos inválidos"})
    .max(30, { message: "Apellidos deben tener como máximo 30 carácteres" }),
  code: z
    .string({ message: "Código inválido" })
    .min(1,{message:"Código inválido"})
    .max(8, { message: "Código debe tener como máximo 8 carácteres" }),
  qr_yape: z
    .union([
      z.instanceof(FileList).refine(
        (fileList) => {
          if (!fileList || fileList.length === 0) return true;
          const file = fileList[0];
          return file && file.type.startsWith("image/");
        },
        { message: "El archivo debe ser una imagen." }
      ),
      z.string()
    ])
    .optional()
    .nullable(),
  escuela: z
    .number({required_error: "Seleccione una escuela"}),
  email: z
    .string({ message: "Email inválido" })
    .email({ message: "Email inválido" })
    .max(50, { message: "Email debe tener como máximo 50 carácteres" }),
  password: z
    .string({ message: "Contraseña inválida" })
    .min(6, { message: "Contraseña debe tener como mínimo 6 carácteres" }),
  username:z
    .string()
});

type FormFields = z.infer<typeof formSchema>;

export const RegisterPage = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      first_name:"",
      last_name:"",
      code:"",
      qr_yape:null,
      escuela:0,
      email:"",
      password:"",
      username:""
    }
  });

  const fileRef = form.register("qr_yape");

  async function onSubmit(values: FormFields) {
    const fileInput = form.getValues("qr_yape");
    let updatedValues = { ...values };

    //If qr, obtain url
    if (fileInput && fileInput[0]) {
      const selectedFile = fileInput[0];
      try {
        const url = await getFileURL(selectedFile as File , "qr_yape_images");
        updatedValues = { ...values, qr_yape: url };
      } 
      catch (error) {
        console.log("Error al obtener el URL del archivo:",error);
        return;
      }
    } 
    else {
      updatedValues = { ...values, qr_yape: null };
    }
    
    //Set username as email
    updatedValues = { ...updatedValues, username: updatedValues.email};

    try{
      const { qr_yape, ...rest } = updatedValues;
      await createUser(rest);
      toast.success("Su cuenta fue registrada con éxito");
    }
    catch(error){
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
                    className="flex flex-col h-full justify-around"
                  >
                    <FormField
                      name="first_name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Nombres</FormLabel>
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
                    <FormField
                      name="last_name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Apellidos</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apellidos"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:flex justify-between gap-1">
                      <FormField
                        name="code"
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
                              QR Yape {`(opcional)`}
                            </FormLabel>
                            <FormControl>
                              <Input type="file" {...fileRef} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      name="escuela"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Escuela</FormLabel>
                          <Select
                            onValueChange={(value)=>field.onChange(Number(value))}
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger >
                                <SelectValue placeholder="Selecciona una escuela" />
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
                      name="email"
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
                      name="password"
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
                      className="bg-secondaryLight hover:bg-secondaryLightHovered w-full"
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
      <Toaster />
    </>
  );
};
