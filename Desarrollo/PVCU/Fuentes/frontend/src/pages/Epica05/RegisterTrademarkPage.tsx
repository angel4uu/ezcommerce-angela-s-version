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
import { useTrademark } from "@/hooks/useTrademark";
import { getFileURL } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  nombre: z
    .string({ message: "Nombre inválido" })
    .min(1, { message: "Nombre inválido" }),
  logo: z
    .union([
      z.instanceof(FileList).refine(
        (fileList) => {
          if (!fileList || fileList.length === 0) return true;
          const file = fileList[0];
          return file && file.type.startsWith("image/");
        },
        { message: "El archivo debe ser una imagen." }
      ),
      z.string(),
    ])
    .optional()
    .nullable(),
  descripcion: z
    .string({ message: "Descripción inválida" })
    .min(1, { message: "Descripción inválida" }),
  facebook: z.string({ message: "Facebook inválido" }).optional(),
  instagram: z.string({ message: "Instagram inválido" }).optional(),
  tiktok: z.string({ message: "Instagram inválido" }).optional(),
  otra_red_social: z.string({ message: "Red social inválida" }).optional(),
  activado: z.boolean(),
  fecha_activacion:z.string(),
  fecha_vencimiento:z.string(),
});

type FormFields = z.infer<typeof formSchema>;

export const RegisterTrademark = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      logo: null,
      descripcion: "",
      facebook: undefined,
      instagram: undefined,
      tiktok: undefined,
      otra_red_social: undefined,
      activado: false,
      fecha_activacion:"",
      fecha_vencimiento:"",
    },
  });

  const fileRef = form.register("logo");
  const { setMarca } = useTrademark();
  const navigate=useNavigate();

  async function onSubmit(values: FormFields) {
    const fileInput = form.getValues("logo");
    let updatedValues = { ...values };

    //If qr, obtain url
    if (fileInput && fileInput[0]) {
      const selectedFile = fileInput[0];
      try {
        const url = await getFileURL(selectedFile as File, "logo_images");
        updatedValues = { ...values, logo: url };
      } catch (error) {
        console.log("Error al obtener el URL del archivo:", error);
        return;
      }
    } else {
      updatedValues = { ...values, logo: null };
    }

    //post marca
    setMarca(updatedValues);
    console.log(updatedValues);
    toast.success("Marca registrada con éxito");
    navigate("/pay-plan");
  }

  return (
    <>
      <Helmet>
        <title>Registrar marca</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl">Registrar marca</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-5 flex flex-col gap-4">
            <FormField
              name="nombre"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Nombre de la marca
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escribe tu marca"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="logo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base">
                    Logo {`(opcional)`}
                  </FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="descripcion"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Descripcion de lo que ofreces
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coloca la descripción de los productos y/o servicios que brindas."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <p className="text-base">Redes sociales</p>
              <FormField
                name="facebook"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enlace a Facebook"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instagram"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enlace a Instagram"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="tiktok"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enlace a Tiktok"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="otra_red_social"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Otra red social"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="bg-secondaryLight hover:bg-secondaryLightHovered self-end w-1/3"
            >
              Registrar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
