import { INSTACIA } from "@/services/axios";
import { STORAGE } from "@/main";
const UNIVERSIDAD = "universidad_mariana";
const JURIDICA = "";

export const REGISTRO_DATOS_EMPRESA = async (datos: any) =>
  await INSTACIA.put(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/pendientes/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_DATOS_EXPRESS_EMPRESA = async (datos: any) =>
  await INSTACIA.put(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/express/${datos.nit}.json`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const LISTAR_EMPRESAS_EXPRESS = async (programa: any) =>
  await INSTACIA.get(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/express.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const ELIMINAR_EMPRESA_EXPRESS = async (nit: any) =>
  await INSTACIA.delete(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/express/${nit}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const EMPRESA_PENDIENTE_YA_REGISTRADA = async (nit: any) =>
  await INSTACIA.get(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/pendientes/${nit}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const EMPRESA_APROBADA_YA_REGISTRADA = async (nit: any) =>
  await INSTACIA.get(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/aprobadas/${nit}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const REGISTRO_ARCHIVO_EMPRESA = async (
  nit: any,
  archivo: any,
  nombre: any
) => {
  const refDoc = STORAGE.ref().child(
    `${UNIVERSIDAD}/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/${nit}/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};

export const REGISTRAR_ARCHIVO_CONVENIO = async (
  nit: any,
  archivo: any,
  nombre: any
) => {
  const refDoc = STORAGE.ref().child(
    `${UNIVERSIDAD}/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/${nit}/convenios/${nombre}`
  );
  const metadata = { contentType: "application/pdf" };
  return refDoc.put(archivo, metadata);
};

export const LISTAR_EMPRESAS_PENDIENTES = async () =>
  await INSTACIA.get(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/pendientes.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const ELIMINAR_EMPRESA = async (nit: any) =>
  await INSTACIA.delete(
    `usuarios/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/pendientes/${nit}.json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const LISTAR_ARCHIVOS_EMPRESA = async (nit: any, nombre: any) =>
  await STORAGE.ref()
    .child(
      `${UNIVERSIDAD}/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/${nit}/${nombre}_${nit}`
    )
    .getDownloadURL();

export const LISTAR_ARCHIVO_CONVENIO_EMPRESA = async (nit: any, nombre: any) =>
  await STORAGE.ref()
    .child(
      `${UNIVERSIDAD}/cDA0hgL9k6SQaTyHHS4PYuFmQeZ2/empresas/${nit}/convenios/${nombre}`
    )
    .getDownloadURL();

export const APROBAR_CONVENIO_EMPRESA = async (programa: any, datos: any) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.put(
    `usuarios/${programa}/empresas/aprobadas/${datos.nit}.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const APROBAR_EMPRESA = async (programa: any, datos: any) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.patch(
    `usuarios/${programa}/empresas/aprobadas/${datos.nit}.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const ACTUALIZAR_CONVENIO_EMPRESA = async (
  programa: any,
  datos: any
) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.patch(
    `usuarios/${programa}/empresas/aprobadas/${datos.nit}.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const LISTAR_EMPRESAS_APROBADAS = async (programa: any) =>
  await INSTACIA.get(`usuarios/${programa}/empresas/aprobadas.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const ASIGNAR_PASANTE_APROBADAS = async (programa: any, datos: any) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.patch(
    `usuarios/${programa}/empresas/aprobadas/${datos.nit}.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
