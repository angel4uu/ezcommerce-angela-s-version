import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { CarruselProducts } from "./CarruselProducts";
import { ArrowUpRight } from "lucide-react";

interface UserData {
  name: string;
  profilePhoto: string;
  qrCode: string;
  institutionalCode: string;
  faculty: string;
  email: string;
  password: string;
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
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUserData({
      name: "Juan Rodriguez Alvarado",
      profilePhoto: "Mi_foto_perfil.png",
      qrCode: "Mi_QR.png",
      institutionalCode: "18264926",
      faculty: "FCB",
      email: "hey@unmsm.com",
      password: "password",
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Guardando datos...", userData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Mi información</title>
      </Helmet>

      <div className="flex flex-col justify-center items-start gap-7 self-stretch my-6">
        <h3 className="text-2xl font-semibold">Mi Información</h3>
        <form className="flex flex-col items-start gap-6 self-stretch">
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
          <div className="flex self-stretch gap-12">
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
          <div className="flex self-stretch gap-12">
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
            <Input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              disabled={!isEditing}
            ></Input>
          </Label>
          <div>
            {isEditing ? (
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  className="bg-[rgba(0,54,105,1)] hover:bg-[rgba(0,54,105,0.9)]"
                >
                  Guardar datos
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className="border-[rgba(0,54,105,1)] text-[rgba(0,54,105,1)]"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleEdit}
                className="bg-[rgba(0,54,105,1)] hover:bg-[rgba(0,54,105,0.9)]"
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
        <h3 className="text-2xl font-semibold">Notificaciones</h3>
        <Label className="my-6 flex py-1 px-4 justify-between text-lg font-medium">
          Permitir notificaciones
          <Switch className="data-[state=checked]:bg-[rgba(0,54,105,1)]" />
        </Label>
      </div>
      <div className="flex flex-col w-full gap-6 self-stretch my-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Productos comprados</h3>
          <div className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full cursor-pointer">
            <ArrowUpRight className="text-2xl" />
          </div>
        </div>
        <CarruselProducts></CarruselProducts>
      </div>
      <div className="flex flex-col w-full gap-6 self-stretch my-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Productos vendidos</h3>
          <div className="bg-[rgba(183,183,183,0.30)] p-2 rounded-full cursor-pointer">
            <ArrowUpRight className="text-2xl" />
          </div>
        </div>
        <CarruselProducts></CarruselProducts>
      </div>
      <div className="mb-24">
        <h3 className="text-2xl font-semibold">Eliminar cuenta</h3>
        <div className="flex justify-between items-center">
          <Label className="my-6 flex py-1 px-4 justify-between text-lg font-medium lg:items-center sm:items-start">
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
