import { INSTACIA } from "@/services/axios";

export const REGISTRO_EMPRESA = async (token: any, datos: any) =>
  await INSTACIA.put(
    `empresas/pendientes/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
