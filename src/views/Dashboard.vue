<template>
  <div>
    <ToolbarNav :nav="navigation" @changeDrawer="changeStateBar" />
    <NavDrawer
      :isActive="navigation"
      @changeDrawer="itemSelector"
      ref="NavDrawer"
    />
    <Welcome v-if="item === 0" />
    <ListadoEmpresa v-if="item === 1" />
    <ListadoEmpresaPendientesExpress v-if="item === 2" />
    <ListadoEmpresaAprobadas v-if="item === 3" />
    <ListadoEstudiantesPendientes v-if="item === 4" />
    <ListadoEstudiantesAprobados v-if="item === 5" />
    <ListadoEstudiantesPasantes v-if="item === 6" />
    <ListadoEmpresas v-if="item === 7" />
    <Asignacion v-if="item === 8" />
    <ListadoEgresados v-if="item === 9" />
  </div>
</template>

<script>
import ToolbarNav from "../components/toolbars/ToolbarNav";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Welcome from "@/components/dashboard/Welcome.vue";
import ListadoEmpresa from "../components/dashboard/empresas/ListadoEmpresaPendientes";
import ListadoEmpresaPendientesExpress from "../components/dashboard/empresas/ListadoEmpresaPendientesExpress";
import ListadoEmpresaAprobadas from "../components/dashboard/empresas/ListadoEmpresaAprobadas.vue";
import ListadoEstudiantesPendientes from "../components/dashboard/estudiantes/ListadoEstudiantesPendientes";
import ListadoEstudiantesAprobados from "../components/dashboard/estudiantes/ListadoEstudiantesAprobados";
import ListadoEstudiantesPasantes from "../components/dashboard/estudiantes/ListadoEstudiantesPasantes";
import Asignacion from "../components/dashboard/workstations/Asignacion";
import ListadoEmpresas from "../components/dashboard/workstations/ListadoEmpresas";
import ListadoEgresados from "../components/dashboard/egresados/ListadoEgresados";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
    Welcome,
    ListadoEmpresa,
    ListadoEmpresaPendientesExpress,
    ListadoEmpresaAprobadas,
    ListadoEstudiantesPendientes,
    ListadoEstudiantesAprobados,
    ListadoEstudiantesPasantes,
    Asignacion,
    ListadoEmpresas,
    ListadoEgresados,
  },
  data: () => ({
    item: 0,
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
