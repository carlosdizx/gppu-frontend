<template>
  <div>
    <ToolbarNav :nav="navigation" @changeDrawer="changeStateBar" />
    <NavDrawer
      :isActive="navigation"
      @changeDrawer="itemSelector"
      ref="NavDrawer"
    />
    <TablaCompuesta
      v-if="item === 10000"
      titulo="Empresa"
      :columnas="[
        { text: 'Nit', value: 'nit' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Estado', value: 'estado' },
      ]"
    />
    <TablaSimple
      v-show="item === 1"
      titulo="Empresas CRUD"
      :filas="filas"
      :columnas="Object.keys(filas[0])"
    />
    <h1 v-show="item === 2">componente Supervisores</h1>
    <h1 v-show="item === 3">componente Estudiantes</h1>
  </div>
</template>

<script>
import ToolbarNav from "@/components/dashboard/ToolbarNav.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import TablaCompuesta from "@/components/general/TablaCompuesta.vue";
import TablaSimple from "@/components/general/TablaSimple.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
    TablaCompuesta,
    TablaSimple,
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
