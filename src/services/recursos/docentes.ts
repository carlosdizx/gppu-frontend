import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";

export const REGISTRO_DOCENTE_PENDIENTE = async (programa: any, docente: any) =>
  await INSTACIA.put(
    `usuarios/${programa}/docentes/${docente.documento}.json`,
    JSON.stringify(docente),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const DOCENTE_YA_REGISTRADO = async (programa: any, documento: any) => {
  const resultado = await INSTACIA.get(
    `usuarios/${programa}/docentes/${documento}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return resultado.data;
};
