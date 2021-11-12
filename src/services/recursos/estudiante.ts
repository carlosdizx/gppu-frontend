import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "universidad_mariana";

export const REGISTRO_ESTUDIANTE_PENDIENTE = async (
  programa: any,
  estudiante: any
) =>
  await INSTACIA.put(
    `usuarios/${programa}/estudiantes/${estudiante.documento}.json`,
    JSON.stringify(estudiante),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const ESTUDIANTE_YA_REGISTRADO = async (
  programa: any,
  documento: any
) => {
  const resultado = await INSTACIA.get(
    `usuarios/${programa}/estudiantes/${documento}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return resultado.data;
};

export const REGISTRO_DATOS_ESTUDIANTE_PENDIENTE = async (
  programa: any,
  datos: any,
  documento: any
) =>
  await INSTACIA.put(
    `usuarios/${programa}/estudiantes/${documento}/datos.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_ARCHIVO_ESTUDIANTE = async (
  programa: any,
  documento: any,
  archivo: any,
  nombre: any
) => {
  const refDoc = STORAGE.ref().child(
    `${universidad}/${programa}/estudiantes/${documento}/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};

export const ELIMINAR_ESTUDIANTE = async (programa: any, documento: any) =>
  await INSTACIA.delete(`usuarios/${programa}/estudiantes/${documento}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ACTUUALIZAR_ESTUDIANTE_PENDIENTE = async (
  programa: any,
  estudiante: any
) =>
  await INSTACIA.patch(
    `usuarios/${programa}/estudiantes/${estudiante.documento}.json`,
    JSON.stringify(estudiante),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const APROBAR_ESTUDIANTE = async (programa: any, datos: any) =>
  await INSTACIA.patch(
    `usuarios/${programa}/estudiantes/${datos.documento}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const LISTAR_ESTUDIANTES = async (programa: any) =>
  await INSTACIA.get(`usuarios/${programa}/estudiantes.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ESTUDIANTE_PASANTE = async (programa: any, datos: any) =>
  await INSTACIA.patch(
    `usuarios/${programa}/estudiantes/${datos.documento}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const LISTAR_ARCHIVO_ESTUDIANTE = async (
  programa: any,
  documento: any,
  nombre: any
) =>
  await STORAGE.ref()
    .child(
      `${universidad}/${programa}/estudiantes/${documento}/${nombre}_${documento}`
    )
    .getDownloadURL();
