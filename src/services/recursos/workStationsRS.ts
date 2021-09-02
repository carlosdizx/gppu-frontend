import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
// const universidad = "uarena";

export const REGISTRO_WORKSTATION = async (estudiante: any) =>
  await INSTACIA.post(`empresas/convenios.json`, JSON.stringify(estudiante), {
    headers: {
      "Content-Type": "application/json",
    },
  });
