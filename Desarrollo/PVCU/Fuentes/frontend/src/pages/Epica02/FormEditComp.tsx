import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { formSchema } from "./FormEditSchema";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface UserData {
  nameStudent: string;
  profilePhoto: string;
  qrCode: string;
  institutionalCode: string;
  faculty: string;
  email: string;
  password: string;
  isMarca: boolean;
  nameMarca: string;
  logoMarca: string;
  descriptionMarca: string;
}

export function FormEditComp() {
  const [isMarca, setIsMarca] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    nameStudent: "Juan Pérez",
    profilePhoto: "http://example.com/photo.jpg",
    qrCode: "http://example.com/qrcode.jpg",
    institutionalCode: "12345",
    faculty: "Ingeniería",
    email: "juan.perez@example.com",
    password: "password123",
    isMarca: false,
    nameMarca: "Electrónica SM",
    logoMarca: "http://example.com/logo.png",
    descriptionMarca: "lorem ipsum",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    form.reset(userData);
    setIsEditing(false);
  };

  /*const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameStudent: "",
      profilePhoto: "",
      qrCode: "",
      institutionalCode: "",
      faculty: "",
      email: "",
      password: "",
      isMarca: false,
      nameMarca: "",
      logoMarca: "",
      descriptionMarca: "",
    },
  });*/

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData,
  });

  useEffect(() => {
    // Datos ficticios
    setIsMarca(userData.isMarca);
    form.reset(userData);
  }, [userData, form]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setUserData({ ...userData, ...values });
    console.log(values);
    setShowPassword(false);
    setIsEditing(false);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-6 self-stretch"
      >
        {isMarca ? (
          <div className="flex flex-col items-start gap-6 self-stretch">
            <FormField
              control={form.control}
              name="nameMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Nombre de la marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de la marca"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Logo de la Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enlace al logo de la marca"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Descripcion de la Marca</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción de la Marca"
                      className="h-24"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          ""
        )}
        <FormField
          control={form.control}
          name="nameStudent"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Nombres y apellidos</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nombres y apellidos"
                  disabled={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
          <FormField
            control={form.control}
            name="profilePhoto"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mi foto de perfil</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enlace a la imagen de su foto de perfil"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qrCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mi QR</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enlace a la imagen de su código QR de su Yape"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
          <FormField
            control={form.control}
            name="institutionalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Código institucional</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Código institucional"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Facultad</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Facultad a la que pertenece"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Correo institucional</FormLabel>
              <FormControl>
                <Input
                  placeholder="Correo institucional"
                  disabled={true}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Contraseña"
                    type={showPassword ? "text" : "password"}
                    disabled={!isEditing}
                    {...field}
                  />
                  {showPassword ? (
                    <EyeOff
                      className="absolute top-2 right-4 cursor-pointer"
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                    ></EyeOff>
                  ) : (
                    <Eye
                      className="absolute top-2 right-4 cursor-pointer"
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                    ></Eye>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<Button type="submit">Submit</Button>*/}
        <div>
          {isEditing ? (
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
              >
                Guardar datos
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-secondaryLight text-secondaryLight"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEdit}
              className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
            >
              Editar datos
            </Button>
          )}
          <p className="text-[#555] mt-4 text-sm font-medium">
            Recuerda que solo puedes editar datos que no formen parte de tu
            organización.
          </p>
        </div>
      </form>
    </Form>
  );
}
