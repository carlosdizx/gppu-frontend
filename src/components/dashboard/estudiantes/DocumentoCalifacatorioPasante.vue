<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab small color="success darken-1" v-bind="attrs" v-on="on">
        <v-icon>mdi-account-details</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-form>
          <v-alert dense color="blue-grey" dark>Datos estudiante</v-alert>
          <v-text-field label="Nombres" disabled v-model="datos.nombres" />
          <v-text-field label="Apellidos" disabled v-model="datos.apellidos" />
          <v-text-field label="Doumento" disabled v-model="datos.documento" />
          <v-alert dense color="blue-grey" dark>Datos empresa</v-alert>
          <v-text-field label="Nombre" disabled v-model="empresa.nombre" />
          <v-text-field label="Nit" disabled v-model="empresa.nit" />

          <v-alert dense color="blue-grey" dark>
            COMPETENCIA APTITUDINAL
          </v-alert>
          ¿Acata las normas y principios de la entidad?
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion1"
          />
          <v-alert dense color="blue-grey" dark>
            COMPETENCIA ACTITUDINAL
          </v-alert>
          Es responsable en el cumplimiento de su horario de trabajo
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion2"
          />
          Es responsable en el cumplimiento de sus tareas
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion3"
          />
          Espíritu de colaboración
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion4"
          />
          Relaciones interpersonales
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion5"
          />
          Se adapta con facilidad
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion6"
          />
          <v-alert dense color="blue-grey" dark>COMPETENCIA TÉCNICA</v-alert>
          <v-textarea
            label="Favor listar y describir competencias técnicas en las cuales se ha desempeñado el practicante"
            counter
            v-model="competencias"
          />
          De acuerdo con los factores técnicos descritos anteriormente. ¿Cómo
          considera usted que ha sido el desempeño del estudiante en éste corte?
          <v-slider
            thumb-color="success"
            thumb-label
            max="5"
            v-model="valoracion7"
          />
          <v-alert dense color="blue-grey" dark>EVALUACIÓN GENERAL</v-alert>
          <v-textarea
            label="¿Qué aspectos destaca del estudiante?"
            counter
            v-model="aspectos_pro"
          />
          <v-textarea
            label="¿Qué aspectos son susceptibles de mejora por parte del estudiante?"
            counter
            v-model="aspectos_por"
          />
          <v-radio-group
            v-model="radio"
            label="¿Qué calificación usted le asigna al practicante?"
          >
            <v-radio :key="-1" label="Cancelado" value="Cancelado" />
            <v-radio :key="0" label="Reasignación" value="Reasignación" />
            <v-radio
              v-for="n in 10"
              :key="n"
              :label="`${(n / 2).toFixed(2)}`"
              :value="`${(n / 2).toFixed(2)}`"
            />
          </v-radio-group>
          <v-textarea label="Comentario" counter v-model="comentario" />
          <v-btn
            :disabled="!radio"
            label=""
            @click="registrarEgresado"
            block
            color="success accent-4"
          >
            Registrar calificacion
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
import {
  ASIGNAR_PASANTE_APROBADAS,
  LISTAR_EMPRESAS_APROBADAS,
} from "../../../services/recursos/empresaRS";
import { REGISTRO_EGRESADO } from "../../../services/recursos/egresadosRS";
import Swal from "sweetalert2";
import {
  ACTUUALIZAR_ESTUDIANTE_PENDIENTE,
  ELIMINAR_ESTUDIANTE,
} from "../../../services/recursos/estudianteRS";

export default {
  name: "DocumentoCalifacatorioPasante",
  data: () => ({
    dialog: false,
    empresa: {},
    valoracion1: null,
    valoracion2: null,
    valoracion3: null,
    valoracion4: null,
    valoracion5: null,
    valoracion6: null,
    valoracion7: null,
    competencias: "",
    aspectos_pro: "",
    aspectos_por: "",
    comentario: "",
    radio: null,
  }),
  props: {
    datos: Object,
  },
  methods: {
    async cargarEmpresa() {
      const token = JSON.parse(localStorage.getItem("token"));
      const resultado = await LISTAR_EMPRESAS_APROBADAS(token.localId);
      const empresas = Object.values(resultado.data);
      for (const empresa of empresas) {
        const pasantes = empresa.pasantes;
        if (pasantes) {
          for (const pasante of pasantes) {
            if (this.datos.documento === pasante.documento) {
              this.empresa = empresa;
            }
          }
        }
      }
    },
    async reasignarEstudiante() {
      if (this.radio === "Reasignación") {
        this.datos.estado = 2;
        const token = JSON.parse(localStorage.getItem("token"));
        await ACTUUALIZAR_ESTUDIANTE_PENDIENTE(token.localId, this.datos);
        let pasantes = this.empresa.pasantes;
        pasantes = pasantes.filter(
          (pasante) => pasante.documento !== this.datos.documento
        );
        this.empresa.pasantes = pasantes;
        await ASIGNAR_PASANTE_APROBADAS(token.localId, this.empresa);
        this.$emit("reasinado", true);
        return true;
      }
      return false;
    },
    async registrarEgresado() {
      if (!(await this.reasignarEstudiante())) {
        const datos = {
          documento: this.datos.documento,
          nombres: this.datos.nombres,
          apellidos: this.datos.apellidos,
          celular: this.datos.telefono,
          correo: this.datos.correo,
          calificacion: {
            valoracion1: this.valoracion1,
            valoracion2: this.valoracion2,
            valoracion3: this.valoracion3,
            valoracion4: this.valoracion4,
            valoracion5: this.valoracion5,
            valoracion6: this.valoracion6,
            valoracion7: this.valoracion7,
            valoracionFinal: this.radio,
            competencias: this.competencias,
            aspectos_pro: this.aspectos_pro,
            aspectos_por: this.aspectos_por,
            comentario: this.comentario,
          },
          empresa: {
            nit: this.empresa.nit,
            nombre: this.empresa.nombre,
          },
        };
        const nombre =
          new Date().toLocaleDateString().replaceAll("/", "-") +
          "-" +
          datos.documento;
        const token = JSON.parse(localStorage.getItem("token"));
        let pasantes = this.empresa.pasantes;
        pasantes = pasantes.filter(
          (pasante) => pasante.documento !== this.datos.documento
        );
        this.empresa.pasantes = pasantes;
        await ASIGNAR_PASANTE_APROBADAS(token.localId, this.empresa);
        await REGISTRO_EGRESADO(token.localId, nombre, datos).then(
          async (result) => {
            if (result.status === 200) {
              const token = JSON.parse(localStorage.getItem("token"));
              await ELIMINAR_ESTUDIANTE(token.localId, datos.documento);
              this.$emit("reasinado", true);
              await Swal.fire(
                "Proceso finalizado 🏁",
                "Registro exitoso",
                "success"
              );
              await this.cargarEmpresa();
              this.dialog = !this.dialog;
            }
          }
        );
      }
    },
  },
  mounted() {
    this.cargarEmpresa();
  },
};
</script>

<style scoped></style>
