<template>
  <div>
    <ToolbarNav :nav="navigation" @changeDrawer="changeStateBar" />
    <NavDrawer
      :isActive="navigation"
      @changeDrawer="itemSelector"
      ref="NavDrawer"
    />
    <TablaSimple
      v-if="item === 1"
      titulo="Empresa"
      :columnas="[
        { text: 'Nit', value: 'nit' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Estado', value: 'estado' },
      ]"
    />
    <h1 v-if="item === 2">componente Supervisores</h1>
    <h1 v-if="item === 3">componente Estudiantes</h1>
  </div>
</template>

<script>
import ToolbarNav from "@/components/dashboard/ToolbarNav.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import TablaSimple from "@/components/general/TablaSimple";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
    TablaSimple,
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
