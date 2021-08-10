import { INSTACIA } from "@/services/axios";

export const REGISTRO_EMPRESA = async (usuario: any, datos: any) =>
  await INSTACIA.put(
    `empresas/pendientes/${datos.nit}.json?=auth=${usuario.idToken}`,
    datos,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
