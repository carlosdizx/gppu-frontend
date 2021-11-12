import { INSTACIA } from "@/services/axios";

export const LISTAR_PROGRAMAS = async () =>
  await INSTACIA.get(`programas.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
