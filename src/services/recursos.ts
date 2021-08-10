import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const universidad = "uarena";

export const REGISTRO_DATOS_EMPRESA_PENDIENTE = async (datos: any) =>
  await INSTACIA.put(
    `empresas/pendientes/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_ARCHIVOS_EMPRESA_PENDIENTE = async (archivo: any) => {
  console.log(archivo);
  const refDoc = STORAGE.ref().child(`${universidad}/${archivo.name}`);
  const metadata = { contentType: "img/jpeg" };
  return refDoc.put(archivo, metadata);
};
