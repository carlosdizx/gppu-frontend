<template>
  <v-navigation-drawer v-model="nav" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Empresa</v-list-item-title>
        <v-list-item-subtitle>Proinsalud</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  data: () => ({
    nav: false,
  }),
};
</script>

<style scoped></style>
