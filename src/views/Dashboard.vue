<template>
  <div>
    <ToolbarNav />
    <NavDrawer />
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
};
</script>

<style scoped></style>
