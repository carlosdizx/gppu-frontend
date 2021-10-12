<template>
  <v-container>
    <v-card>
      <v-card-title>Bienvenido, a la plataforma GCEU</v-card-title>
      <v-alert>
        En la parte superior izquierda de la pantalla encontrará una pestaña con
        la cual podrá navegar sobre las distintas ventanas que posee la
        aplicación.
      </v-alert>
      <v-alert>
        En el icono <v-icon>mdi-account</v-icon> podrá actualizar la información
        de su perfil. Si usted es un coordinador de prácticas podrá gestionar
        las habilidades que los estudiantes desean desempeñar y que las empresas
        buscan encontrar en los practicantes.
      </v-alert>
      <v-alert>
        Usted desempeña el cargo de {{ rol }} del programa {{ programa }} de la
        Universidad Mariana, recuerde que la información contenida en la
        plataforma está bajo responsabilidad de un grupo selecto de personas
        incluyendolo.
      </v-alert>
      <v-card-title> Tips </v-card-title>
      <v-alert>
        - No comparta sus credenciales de acceso. <br /><br />
        - Se le ha delegado la autorización a una parte de la información del
        proceso de gestión de prácticas, usted es el responsable de administrar
        esa información. <br /><br />
        - Antes de realizar cualquier acción sobre la plataforma asegúrese de
        qué es lo que realmente desea realizar, por ejemplo: una vez aprobado
        los datos de un estudiante o de una empresa no hay manera de
        revertirlos.
        <br /><br />
        - En caso de cometer algún error o presentarse alguna inconsistencia de
        la información comunicarse inmediatamente con el área encargada de la
        administración de la plataforma.
        <br /><br />
        - Si el dispositivo en el que esta leyendo esta información es de uso
        público o usted no es el propietario, es recomendable que cierre sesión
        una vez finalice sus labores y no guarde contraseñas. Para cerrar sesión
        haga click en el icono <v-icon>mdi-export</v-icon>.
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
import { OBTENER_DATOS_USUARIO } from "../../services/auth";

export default {
  name: "Welcome",
  data: () => ({
    rol: "",
    programa: "",
  }),
  methods: {
    async cargarInfoUsuario() {
      await OBTENER_DATOS_USUARIO().then((result) => {
        this.rol =
          result.data.rol === 1
            ? "Coordinador@ de prácticas"
            : result.data.rol === 2
            ? "Asesor/@"
            : "Super Admin";
        this.programa = result.data.programa;
      });
    },
  },
  async mounted() {
    await this.cargarInfoUsuario();
  },
};
</script>

<style scoped></style>
