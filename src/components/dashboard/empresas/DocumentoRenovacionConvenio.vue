<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="lime" v-bind="attrs" v-on="on">
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>
    </template>
    <v-container>
      <v-card>
        <v-card-title>{{ datos.nombre }} | {{ datos.nit }}</v-card-title>
        <v-card-text>
          <CalendarioRango @fecha="fechas = $event" />
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            color="green accent-4"
            dark
            @click="renovar"
            :disabled="fechas.length < 2"
          >
            Renovar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script>
import { ACTUALIZAR_CONVENIO_EMPRESA } from "../../../services/recursos/empresaRS";
import CalendarioRango from "../../general/CalendarioRango";
import Swal from "sweetalert2";
export default {
  name: "DocumentoRenovacionConvenio",
  components: { CalendarioRango },
  data: () => ({
    dialog: false,
    fechas: [],
  }),
  props: {
    datos: Object,
  },
  methods: {
    async renovar() {
      await Swal.fire({
        title: "¿Renovar convenio con esta empresa?",
        text:
          "Soy conciente de que la informacion es correcta" +
          `Nit: ${this.datos.nit}
           Nombre: ${this.datos.nombre}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f76b7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, esa es la empresa!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fecha_inicio = this.fechas[0];
          const fecha_fin = this.fechas[1];
          this.datos.inicio = fecha_inicio;
          this.datos.fin = fecha_fin;
          this.datos.convenios.push({
            inicio: this.datos.inicio,
            fin: this.datos.fin,
            generado: new Date()
              .toLocaleDateString()
              .toString()
              .replaceAll("/", "-"),
          });
          this.datos.periodo = null;
          this.datos.dias = null;
          const token = JSON.parse(localStorage.getItem("token"));
          await ACTUALIZAR_CONVENIO_EMPRESA(token.localId, this.datos);
          this.$emit("renovado", true);
          await Swal.fire("Renovado!", "Felicitaciones 🤝", "success");
          this.dialog = !this.dialog;
        }
      });
    },
  },
};
</script>

<style scoped></style>
