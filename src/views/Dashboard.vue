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
    <h1 v-if="item === 4">componente Estudiantes</h1>
  </div>
</template>

<script>
import ToolbarNav from "@/components/dashboard/ToolbarNav.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import ListadoEmpresa from "../components/cruds/ListadoEmpresaPendientes";
import ListadoEmpresaPendientesExpress from "../components/cruds/ListadoEmpresaPendientesExpress";
import ListadoEmpresaAprobadas from "../components/cruds/ListadoEmpresaAprobadas.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
    ListadoEmpresa,
    ListadoEmpresaPendientesExpress,
    ListadoEmpresaAprobadas,
  },
  data: () => ({
    item: 1,
    navigation: false,
    filas: [
      { nit: 1, nombre: "Arena 1", estado: "estado 1" },
      { nit: 2, nombre: "Arena 2", estado: "estado 2" },
      { nit: 3, nombre: "Arena 3", estado: "estado 2" },
      { nit: 4, nombre: "Arena 4", estado: "estado 3" },
    ],
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
