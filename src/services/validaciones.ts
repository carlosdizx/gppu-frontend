import Swal from "sweetalert2";
import store from "../store";
export const CONTIENE_ERROR = async (result: any) => {
  if (result.error) {
    if (result.error.message === "EMAIL_NOT_FOUND") {
      await Swal.fire(
        "Correo electronico no registrado",
        "Asegurate de ingresar un correo que ya se encuentre registrado",
        "error"
      );
      await store.dispatch(
        "registrarError",
        "Asegurate de ingresar un correo que ya se encuentre registrado"
      );
    } else if (result.error.message === "INVALID_PASSWORD") {
      await Swal.fire(
        "Constraseña incorrecta",
        "Esa no es tu contraseña 👀",
        "error"
      );
      await store.dispatch("registrarError", "Verificar contraseña");
    } else if (result.error.message === "EMAIL_EXISTS") {
      await Swal.fire(
        "Ya registrado",
        "El correo ya se encuentra registrado",
        "error"
      );
      await store.dispatch(
        "registrarError",
        "El correo ya se encuentra registrado"
      );
    } else if (result.error.message === "INVALID_EMAIL") {
      await Swal.fire(
        "Correo invalido",
        "Formato del correo es incorrecto",
        "error"
      );
      await store.dispatch("registrarError", "El formato no es el adecuado");
    } else if (result.error.message === "MISSING_REFRESH_TOKEN") {
      await Swal.fire(
        "Sesion caducada",
        "Vuelve a ingresar tu correo y contraseña",
        "warning"
      );
      await store.dispatch("registrarError", "Sesion expirada");
    }
  } else {
    await store.dispatch("registrarError", null);
  }
};
