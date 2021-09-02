import { INSTACIA } from "@/services/axios";

export const REGISTRO_ESTUDIANTE_EN_EMPRESA = async (datos: any) =>
  await INSTACIA.put(
    `empresas/aprobadas/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
