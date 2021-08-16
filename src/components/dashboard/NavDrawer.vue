<template>
  <v-navigation-drawer v-model="isActive" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Empresa</v-list-item-title>
        <v-list-item-subtitle>Proinsalud</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link @click="changeElement(1)">
        <v-list-item-icon>
          <v-icon>mdi-city</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(2)">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Supervisores</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(3)">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes</v-list-item-title>
      </v-list-item>
    </v-list>
    {{ element }}
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  props: ["isActive"],
  data: () => ({
    element: null,
  }),
  methods: {
    changeElement(idItem) {
      this.$emit("changeDrawer", idItem);
    },
  },
};
</script>

<style scoped></style>
