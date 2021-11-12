import { INSTACIA } from "@/services/axios";

export const REGISTRO_EGRESADO = async (
  programa: any,
  nombre: string,
  datos: any
) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.post(
    `usuarios/${programa}/egresados.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const LISTAR_EGRESADOS = async (programa: any) =>
  await INSTACIA.get(`usuarios/${programa}/egresados.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
