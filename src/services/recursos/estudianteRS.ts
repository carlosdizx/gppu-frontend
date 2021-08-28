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

export const REGISTRO_DATOS_ESTUDIANTE_PENDIENTE = async (
  datos: any,
  documento: any
) =>
  await INSTACIA.put(
    `estudiantes/pendientes/${documento}/datos.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_ARCHIVO_ESTUDIANTE = async (
  documento: any,
  archivo: any,
  nombre: any
) => {
  const refDoc = STORAGE.ref().child(
    `${universidad}/estudiantes/pendientes/${documento}/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};
