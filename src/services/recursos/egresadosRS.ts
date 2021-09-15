import { INSTACIA } from "@/services/axios";

export const REGISTRO_EGRESADO = async (datos: any) =>
  await INSTACIA.put(
    `egresados/${datos.documento}_${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
