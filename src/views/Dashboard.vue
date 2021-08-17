<template>
  <div>
    <ToolbarNav :nav="navigation" @changeDrawer="changeStateBar" />
    <NavDrawer :isActive="navigation" @changeDrawer="itemSelector" />
    <h1 v-if="item === 1">componente Empresas</h1>
    <h1 v-if="item === 2">componente Supervisores</h1>
    <h1 v-if="item === 3">componente Estudiantes</h1>
  </div>
</template>

<script lang="ts">
import ToolbarNav from "@/components/dashboard/ToolbarNav.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
  },
  data: () => ({
    item: 1,
    navigation: false,
  }),
  methods: {
    itemSelector(idItem: any) {
      this.item = idItem;
      this.navigation = false;
    },
    changeStateBar() {
      this.navigation = !this.navigation;
    },
  },
});
</script>

<style scoped></style>
