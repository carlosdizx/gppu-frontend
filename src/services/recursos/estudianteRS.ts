import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "uarena";

export const REGISTRO_ESTUDIANTE_PENDIENTE = async (estudiante: any) =>
  await INSTACIA.put(
    `estudiantes/pendientes/${estudiante.documento}.json`,
    JSON.stringify(estudiante),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_DATOS_ESTUDIANTE_PENDIENTE = async (datos: any) =>
  await INSTACIA.put(
    `estudiantes/pendientes/${datos.documento}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
