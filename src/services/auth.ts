const API_KEY = "AIzaSyDO8hVE9rxb9oP38kTH4qRhqxUcHNtAi3w";
const URL_SING_IN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const URL_SING_IN_TOKEN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${API_KEY}`;
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
