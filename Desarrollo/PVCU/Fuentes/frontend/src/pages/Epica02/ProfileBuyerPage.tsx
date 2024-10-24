import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { CarruselProducts } from "./CarruselProducts";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

interface UserData {
  name: string;
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

export const ProfileBuyerPage = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
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
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUserData({
      name: "Juan Rodriguez Alvarado",
      profilePhoto: "Mi_foto_perfil.png",
      qrCode: "Mi_QR.png",
      institutionalCode: "18264926",
      faculty: "FCB",
      email: "hey@unmsm.com",
      password: "password",
      isMarca: false,
      nameMarca: "Electrónica SM",
      logoMarca: "Mi_Logo.png",
      descriptionMarca:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in mauris eget sem mollis fringilla eu non magna. Ut bibendum nisl eget congue malesuada.",
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Guardando datos...", userData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Mi información</title>
      </Helmet>

      <div className="flex flex-col justify-center items-start gap-7 self-stretch my-6">
        <div className="self-stretch">
          <h3 className="text-2xl font-semibold text-terciaryLight">
            Mi Información
          </h3>
          <p className="mt-4 text-[#555] text-[16px]">
            Aquí puedes observar tus datos y productos
          </p>
        </div>
        <form className="flex flex-col items-start gap-6 self-stretch">
          {userData.isMarca ? (
            <div className="flex flex-col items-start gap-6 self-stretch">
              <Label className="flex flex-col gap-2 self-stretch">
                Nombre de la Marca
                <Input
                  id="nameMarca"
                  name="nameMarca"
                  value={userData.nameMarca}
                  onChange={handleChange}
                  disabled={!isEditing}
                ></Input>
              </Label>
              <Label className="flex flex-col gap-2 self-stretch">
                Logo de la Marca
                <Input
                  id="logoMarca"
                  name="logoMarca"
                  value={userData.logoMarca}
                  onChange={handleChange}
                  disabled={!isEditing}
                ></Input>
              </Label>
              <Label className="flex flex-col gap-2 self-stretch">
                Descripción de la Marca
                <Textarea
                  id="descriptionMarca"
                  name="descriptionMarca"
                  value={userData.descriptionMarca}
                  onChange={handleChange}
                  disabled={!isEditing}
                ></Textarea>
              </Label>
            </div>
          ) : (
            ""
          )}
          <Label className="flex flex-col gap-2 self-stretch">
            Nombres y apellidos
            <Input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              disabled={true}
            ></Input>
          </Label>
          <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
            <Label className="flex flex-col gap-2 w-full">
              Mi foto de perfil
              <Input
                id="profilePhoto"
                name="profilePhoto"
                value={userData.profilePhoto}
                onChange={handleChange}
                disabled={!isEditing}
              ></Input>
            </Label>
            <Label className="flex flex-col gap-2 w-full">
              Mi QR
              <Input
                id="qrCode"
                name="qrCode"
                value={userData.qrCode}
                onChange={handleChange}
                disabled={!isEditing}
              ></Input>
            </Label>
          </div>
          <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
            <Label className="flex flex-col gap-2 w-full">
              Código institucional
              <Input
                id="institutionalCode"
                name="institutionalCode"
                value={userData.institutionalCode}
                onChange={handleChange}
                disabled={true}
              ></Input>
            </Label>
            <Label className="flex flex-col gap-2 w-full">
              Facultad
              <Input
                id="faculty"
                name="faculty"
                value={userData.faculty}
                onChange={handleChange}
                disabled={true}
              ></Input>
            </Label>
          </div>
          <Label className="flex flex-col gap-2 self-stretch">
            Correo electrónico
            <Input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              disabled={true}
            ></Input>
          </Label>
          <Label className="flex flex-col gap-2 self-stretch">
            Contraseña
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={handleChange}
                disabled={!isEditing}
              ></Input>
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
          </Label>
          <div>
            {isEditing ? (
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
                >
                  Guardar datos
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSave}
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
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-terciaryLight">
          Notificaciones
        </h3>
        <Label className="my-6 flex py-1 px-4 justify-between items-center text-lg font-medium">
          Permitir notificaciones
          <Switch className="data-[state=checked]:bg-secondaryLight" />
        </Label>
      </div>
      <div className="flex flex-col w-full gap-6 self-stretch my-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-terciaryLight">
            Productos comprados
          </h3>
          <Link
            to="/purchasing-management"
            className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full"
          >
            <ArrowUpRight className="text-2xl text-terciaryLight" />
          </Link>
        </div>
        <CarruselProducts></CarruselProducts>
      </div>
      <div className="flex flex-col w-full gap-6 self-stretch my-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-terciaryLight">
            Productos vendidos
          </h3>
          <Link
            to=""
            className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full cursor-pointer"
          >
            <ArrowUpRight className="text-2xl text-terciaryLight" />
          </Link>
        </div>
        <CarruselProducts></CarruselProducts>
      </div>
      <div className="mb-24">
        <h3 className="text-2xl font-semibold mb-6 text-terciaryLight">
          Eliminar cuenta
        </h3>
        <div className="flex justify-between items-start sm:items-center">
          <Label className="flex py-1 px-4 justify-between text-lg font-medium lg:items-center sm:items-start">
            Una vez que elimines tu cuenta, no podrás volver atrás. Asegúrate de
            hacerlo.
          </Label>
          <Button
            variant="outline"
            className="border-[#E33B2E] text-[#E33B2E] hover:bg-[#E33B2E] hover:text-white"
          >
            Eliminar cuenta
          </Button>
        </div>
      </div>
    </>
  );
};
