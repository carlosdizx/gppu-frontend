<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="info darken-3" v-bind="attrs" v-on="on">
        <v-icon>mdi-briefcase-check-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Empresa {{ datos.nit }}</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-alert class="text-center" dense dark color="secondary">
            Datos de la empresa
          </v-alert>
          <v-text-field label="Nit" v-model="datos.nit" disabled />
          <v-text-field label="Nombre" v-model="datos.nombre" />
          <v-text-field label="Representante" v-model="datos.documento" />
          <v-text-field label="Celular" v-model="datos.celular" />
          <v-text-field label="Correo" v-model="datos.correo" />
          <v-text-field label="Pais" v-model="datos.pais" />
          <v-text-field label="Departamento" v-model="datos.departamento" />
          <v-text-field label="Ciudad" v-model="datos.ciudad" />
          <v-text-field label="Direccion" v-model="datos.direccion" />
          <v-combobox
            v-model="datos.programas"
            :items="programas"
            item-text="nombre"
            label="Programa académico"
            hide-selected
            small-chips
            dense
            outlined
            multiple
          />
          <v-alert class="text-center" dense dark color="secondary">
            Periodo de valides del convenio
          </v-alert>
          <CalendarioRango @fecha="fechas = $event" />
          {{ fechas }}
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red darken-4" dark @click="dialog = !dialog">
          Cerrar
        </v-btn>
        <v-btn
          :disabled="this.fechas.length !== 2"
          color="info"
          @click="aprobar"
        >
          Aprobar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CalendarioRango from "../../general/CalendarioRango";
import {
  APROBAR_CONVENIO_EMPRESA,
  ELIMINAR_EMPRESA,
} from "../../../services/recursos/empresaRS";
import Swal from "sweetalert2";
import { OBTENER_DATOS_USUARIO } from "../../../services/auth";
import { LISTAR_PROGRAMAS } from "../../../services/recursos/programaRS";
export default {
  name: "DocumentoAprobatorioEmpresa",
  components: { CalendarioRango },
  data: () => ({
    dialog: false,
    fechas: [],
    programas: [],
  }),
  props: {
    datos: Object,
  },
  methods: {
    async listadoProgramas() {
      await LISTAR_PROGRAMAS().then(
        (resultado) => (this.programas = Object.values(resultado.data))
      );
    },
    async aprobar() {
      if (this.fechas.length === 2) {
        const fecha_inicio = this.fechas[0];
        const fecha_fin = this.fechas[1];
        this.datos.inicio = fecha_inicio;
        this.datos.fin = fecha_fin;
        const convenios = [];
        let responsable = "";
        await OBTENER_DATOS_USUARIO().then((result) => {
          responsable = result.data.nombres + " " + result.data.apellidos;
        });
        const convenio = {
          inicio: fecha_inicio,
          fin: fecha_fin,
          generado: new Date()
            .toLocaleDateString()
            .toString()
            .replaceAll("/", "-"),
          responsable: responsable,
        };
        convenios.push(convenio);
        this.datos.convenios = convenios;
        await Swal.fire({
          title: "¿Aprobar convenio con esta empresa?",
          text:
            "Soy conciente de que la informacion es correcta " +
            `Nit: ${this.datos.nit}
           Nombre: ${this.datos.nombre}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#0f76b7",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, cumple con las validaciones!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const token = JSON.parse(localStorage.getItem("token"));
            this.datos.programas.forEach((programas) => {
              APROBAR_CONVENIO_EMPRESA(programas.id, this.datos);
            });
            await ELIMINAR_EMPRESA(this.datos.nit);
            await this.$emit("aprobado", true);
            await Swal.fire(
              "Aprobada!",
              "Felicitaciones por el nuevo convenio 🤝",
              "success"
            );
            this.dialog = !this.dialog;
          }
        });
      }
    },
  },
  mounted() {
    this.listadoProgramas();
  },
};
</script>

<style scoped></style>
