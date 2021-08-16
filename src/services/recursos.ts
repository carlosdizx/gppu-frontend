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
