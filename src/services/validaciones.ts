import Swal from "sweetalert2";

export const CONTIENE_ERROR = async (result: any) => {
  if (result.error) {
    if (result.error.message === "EMAIL_NOT_FOUND") {
      await Swal.fire(
        "Correo electronico no registrado",
        "Asegurate de ingresar un correo que ya se encuentre registrado",
        "error"
      );
    } else if (result.error.message === "INVALID_PASSWORD") {
      await Swal.fire(
        "Constraseña incorrecta",
        "Esa no es tu contraseña 👀",
        "error"
      );
    } else if (result.error.message === "EMAIL_EXISTS") {
      await Swal.fire("El correo ya se encuentra registrado", "", "error");
    } else if (result.error.message === "INVALID_EMAIL") {
      await Swal.fire(
        "Correo invalido",
        "Formato del correo es incorrecto",
        "error"
      );
    } else if (result.error.message === "MISSING_REFRESH_TOKEN") {
      await Swal.fire(
        "Sesion caducada",
        "Vuelve a ingresar tu correo y contraseña",
        "warning"
      );
    }
  }
};
