import { INSTACIA } from "@/services/axios";

const API_KEY = "AIzaSyDO8hVE9rxb9oP38kTH4qRhqxUcHNtAi3w";
const URL_SING_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const URL_SING_IN_TOKEN = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
const URL_SING_UP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const REGISTRO_USUARIO = async (usuario: {
  email: string;
  password: string;
}) =>
  await (
    await fetch(URL_SING_UP, {
      method: "POST",
      body: JSON.stringify({
        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true,
      }),
    })
  ).json();

export const LOGUEAR_USUARIO = async (usuario: {
  email: string;
  password: string;
}) =>
  await (
    await fetch(URL_SING_IN, {
      method: "POST",
      body: JSON.stringify({
        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true,
      }),
    })
  ).json();
export const LOGUEAR_USUARIO_TOKEN = async (refreshToken: any) =>
  await (
    await fetch(URL_SING_IN_TOKEN, {
      method: "POST",
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })
  ).json();

export const RISGISTAR_DATOS_USUARIO = async (datos: any) => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.patch(
    `usuarios/${token.localId}/datos.json?auth=${token.idToken}`,
    JSON.stringify(datos),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const OBTENER_DATOS_USUARIO = async () => {
  const token = JSON.parse(<string>localStorage.getItem("token"));
  return await INSTACIA.get(
    `usuarios/${token.localId}/datos.json?auth=${token.idToken}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const LISTAR_USUARIOS = async () =>
  await INSTACIA.get(`usuarios.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const OBTENER_HABILIDADES = async (usuario: any) =>
  await INSTACIA.get(`usuarios/${usuario}/datos/habilidades.json`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
