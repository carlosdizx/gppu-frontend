import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "uarena";

export const REGISTRO_ESTUDIANTE_PENDIENTE = async (estudiante: any) =>
  await INSTACIA.put(
    `estudiantes/${estudiante.documento}.json`,
    JSON.stringify(estudiante),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const ESTUDIANTE_YA_REGISTRADO = async (documento: any) => {
  const resultado = await INSTACIA.get(`estudiantes/${documento}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resultado.data;
};

export const REGISTRO_DATOS_ESTUDIANTE_PENDIENTE = async (
  datos: any,
  documento: any
) =>
  await INSTACIA.put(
    `estudiantes/${documento}/datos.json`,
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
    `${universidad}/estudiantes/${documento}/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};

export const LISTAR_ESTUDIANTES_PENDIENTES = async () =>
  await INSTACIA.get(`estudiantes.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ELIMINAR_ESTUDIANTE = async (documento: any) =>
  await INSTACIA.delete(`estudiantes/${documento}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const APROBAR_ESTUDIANTE = async (datos: any) =>
  await INSTACIA.patch(
    `estudiantes/${datos.documento}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const LISTAR_ESTUDIANTES_APROBADOS = async () =>
  await INSTACIA.get(`estudiantes.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ESTUDIANTE_PASANTE = async (datos: any) =>
  await INSTACIA.patch(
    `estudiantes/${datos.documento}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
