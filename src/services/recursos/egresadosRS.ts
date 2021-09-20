import { INSTACIA } from "@/services/axios";

export const REGISTRO_EGRESADO = async (nombre: string, datos: any) =>
  await INSTACIA.post(`egresados.json`, JSON.stringify(datos), {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const LISTAR_EGRESADOS = async () =>
  await INSTACIA.get(`egresados.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
