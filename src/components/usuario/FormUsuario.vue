<template>
  <v-container>
    <v-card-text>
      <v-card>
        <v-card-title>{{ rol }}</v-card-title>
        <v-card-text>
          <v-form autocomplete="off">
            <v-alert dense dark>{{ programa }}</v-alert>
            <v-text-field label="Nombres" v-model="nombres" />
            <v-text-field label="Apellidos" v-model="apellidos" />
            <v-text-field label="Documento" v-model="documento" />
            <v-text-field type="number" label="Celular" v-model="celular" />
            <v-text-field label="Dirección" v-model="direccion" />
            <v-combobox
              v-model="habilidades"
              :items="habilidades"
              item-text="documento"
              label="Habilidades para los estudiantes practicantes"
              hide-selected
              small-chips
              dense
              outlined
              multiple
            />
            <v-btn @click="registrar" color="success" block>
              Registrar datos
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-container>
</template>

<script>
import {
  OBTENER_DATOS_USUARIO,
  RISGISTAR_DATOS_USUARIO,
} from "../../services/auth";
import Swal from "sweetalert2";

export default {
  name: "FormUsuario",
  data: () => ({
    nombres: "",
    apellidos: "",
    documento: "",
    celular: "",
    direccion: "",
    programa: "",
    rol: "",
    habilidades: [],
  }),
  methods: {
    async registrar() {
      const usuario = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        documento: this.documento,
        celular: this.celular,
        direccion: this.direccion,
        habilidades: this.habilidades,
      };
      await RISGISTAR_DATOS_USUARIO(usuario).then((result) => {
        if (result.status === 200) {
          Swal.fire(
            "Datos actualizados",
            "Los datos de Coordinador@ de prácticas han sido actualizados",
            "success"
          );
        }
      });
    },
  },
  async mounted() {
    await OBTENER_DATOS_USUARIO().then((result) => {
      if (result.data) {
        this.nombres = result.data.nombres;
        this.apellidos = result.data.apellidos;
        this.documento = result.data.documento;
        this.celular = result.data.celular;
        this.direccion = result.data.direccion;
        this.programa = result.data.programa;
        this.rol = result.data.rol === 1 ? "Coordinador@ de prácticas" : "";
        this.habilidades = result.data.habilidades;
      }
    });
  },
};
</script>

<style scoped></style>
