import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "uarena";

export const REGISTRO_ESTUDIANTE_PENDIENTE = async (estudiante: any) =>
  await INSTACIA.post(
    `empresas/convenios/${estudiante.documento}.json`,
    JSON.stringify(estudiante),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
