<template>
  <div>
    <ToolbarNav :nav="navigation" @changeDrawer="changeStateBar" />
    <NavDrawer
      :isActive="navigation"
      @changeDrawer="itemSelector"
      ref="NavDrawer"
    />
    <ListadoEmpresa v-if="item === 1" />
    <ListadoEmpresaPendientesExpress v-if="item === 2" />
    <ListadoEmpresaAprobadas v-if="item === 3" />
    <ListadoEstudiantesPendientes v-if="item === 4" />
    <ListadoEstudiantesAprobados v-if="item === 5" />
    <ListadoEstudiantesPasantes v-if="item === 6" />
    <Asignacion v-if="item === 7" />
    <ListadoEgresados v-if="item === 8" />
  </div>
</template>

<script>
import ToolbarNav from "../components/toolbars/ToolbarNav";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import ListadoEmpresa from "../components/dashboard/empresas/ListadoEmpresaPendientes";
import ListadoEmpresaPendientesExpress from "../components/dashboard/empresas/ListadoEmpresaPendientesExpress";
import ListadoEmpresaAprobadas from "../components/dashboard/empresas/ListadoEmpresaAprobadas.vue";
import ListadoEstudiantesPendientes from "../components/dashboard/estudiantes/ListadoEstudiantesPendientes";
import ListadoEstudiantesAprobados from "../components/dashboard/estudiantes/ListadoEstudiantesAprobados";
import ListadoEstudiantesPasantes from "../components/dashboard/estudiantes/ListadoEstudiantesPasantes";
import Asignacion from "../components/dashboard/workstations/Asignacion";
import ListadoEgresados from "../components/dashboard/egresados/ListadoEgresados";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
    ListadoEmpresa,
    ListadoEmpresaPendientesExpress,
    ListadoEmpresaAprobadas,
    ListadoEstudiantesPendientes,
    ListadoEstudiantesAprobados,
    ListadoEstudiantesPasantes,
    Asignacion,
    ListadoEgresados,
  },
  data: () => ({
    item: 1,
    navigation: false,
  }),
  methods: {
    itemSelector(idItem) {
      this.item = idItem;
      this.navigation = false;
    },
    changeStateBar() {
      this.navigation = !this.navigation;
      this.$refs.NavDrawer.change();
    },
  },
});
</script>

<style scoped></style>
