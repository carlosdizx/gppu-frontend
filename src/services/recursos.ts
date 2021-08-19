import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "uarena";

export const REGISTRO_DATOS_EMPRESA = async (datos: any) =>
  await INSTACIA.put(
    `empresas/pendientes/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_DATOS_EXPRESS_EMPRESA = async (datos: any) =>
  await INSTACIA.put(
    `empresas/express/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const EMPRESA_YA_REGISTRADA = async (nit: any) => {
  const resultado = await INSTACIA.get(`empresas/pendientes/${nit}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resultado.data;
};

export const REGISTRO_ARCHIVOS_EMPRESA = async (
  nit: any,
  archivo: any,
  nombre: any
) => {
  const refDoc = STORAGE.ref().child(
    `${universidad}/empresas/${nit}/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};

export const LISTAR_EMPRESAS_PENDIENTES = async () =>
  await INSTACIA.get(`empresas/pendientes.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ELIMINAR_EMPRESAS = async (nit: any) =>
  await INSTACIA.delete(`empresas/pendientes/${nit}.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const LISTAR_ARCHIVOS_EMPRESA = async (nit: any, nombre: any) =>
  await STORAGE.ref()
    .child(`${universidad}/empresas/${nit}/${nombre}_${nit}`)
    .getDownloadURL();
