<template>
  <div>
    <ToolbarNav :nav="nav" @changeDrawer="changeStateBar" />
    <NavDrawer :isActive="nav" @changeDrawer="itemSelector" />
    <h1 v-if="item == 1">componente Empresas</h1>
    <h1 v-if="item == 2">componente Supervisores</h1>
    <h1 v-if="item == 3">componente Estudiantes</h1>
  </div>
</template>

<script lang="ts">
import ToolbarNav from "@/components/dashboard/ToolbarNav.vue";
import NavDrawer from "@/components/dashboard/NavDrawer.vue";
export default {
  name: "Dashboard",
  components: {
    ToolbarNav,
    NavDrawer,
  },
  data() {
    return {
      item: null,
      nav: false,
    };
  },
  methods: {
    itemSelector(idItem) {
      this.item = idItem;
      this.nav = false;
    },
    changeStateBar() {
      this.nav = !this.nav;
    },
  },
};
</script>

<style scoped></style>
