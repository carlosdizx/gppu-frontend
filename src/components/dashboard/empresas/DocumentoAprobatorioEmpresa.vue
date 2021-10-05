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
          <v-text-field label="Nit" :value="datos.nit" disabled />
          <v-text-field label="Nombre" :value="datos.nombre" disabled />
          <v-text-field
            label="Representante"
            :value="datos.documento"
            disabled
          />
          <v-text-field label="Celular" :value="datos.celular" disabled />
          <v-text-field label="Correo" :value="datos.correo" disabled />
          <v-text-field label="Pais" :value="datos.pais" disabled />
          <v-text-field
            label="Departamento"
            :value="datos.departamento"
            disabled
          />
          <v-text-field label="Ciudad" :value="datos.ciudad" disabled />
          <v-text-field label="Direccion" :value="datos.direccion" disabled />
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
export default {
  name: "DocumentoAprobatorioEmpresa",
  components: { CalendarioRango },
  data: () => ({
    dialog: false,
    fechas: [],
  }),
  props: {
    datos: Object,
  },
  methods: {
    async aprobar() {
      if (this.fechas.length === 2) {
        const fecha_inicio = this.fechas[0];
        const fecha_fin = this.fechas[1];
        this.datos.inicio = fecha_inicio;
        this.datos.fin = fecha_fin;
        const convenios = [];
        const convenio = {
          inicio: fecha_inicio,
          fin: fecha_fin,
          generado: new Date()
            .toLocaleDateString()
            .toString()
            .replaceAll("/", "-"),
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
            await APROBAR_CONVENIO_EMPRESA(token.localId, this.datos);
            await ELIMINAR_EMPRESA(token.localId, this.datos.nit);
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
};
</script>

<style scoped></style>
