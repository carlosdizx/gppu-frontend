import { INSTACIA } from "@/services/axios";

export const REGISTRO_EGRESADO = async (nombre: string, datos: any) =>
  await INSTACIA.put(`egresados/${nombre}.json`, JSON.stringify(datos), {
    headers: {
      "Content-Type": "application/json",
    },
  });
