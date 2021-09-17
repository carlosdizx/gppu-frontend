<template>
  <v-navigation-drawer v-model="nav" absolute>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Admin</v-list-item-title>
        <v-list-item-subtitle>Martha Nubia Carrillo</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-alert color="info darken-2" dark dense>Empresas</v-alert>
      <v-list-item link @click="changeElement(1)">
        <v-list-item-icon>
          <v-icon>mdi-domain-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas pendientes</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(2)">
        <v-list-item-icon>
          <v-icon>mdi-clock-fast</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas express</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(3)">
        <v-list-item-icon>
          <v-icon>mdi-domain</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Empresas aprobadas</v-list-item-title>
      </v-list-item>

      <v-alert color="deep-purple darken-1" dark dense>Estudiantes</v-alert>

      <v-list-item link @click="changeElement(4)">
        <v-list-item-icon>
          <v-icon>mdi-school-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes pendientes</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(5)">
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes aprobados</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="changeElement(6)">
        <v-list-item-icon>
          <v-icon>mdi-account-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Estudiantes practicantes</v-list-item-title>
      </v-list-item>

      <v-alert color="pink darken-1" dark dense>Puestos de práctica</v-alert>

      <v-list-item link @click="changeElement(7)">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-check</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Asignar practicantes</v-list-item-title>
      </v-list-item>

      <v-alert color="amber darken-2" dark dense>Egresados</v-alert>

      <v-list-item link @click="changeElement(8)">
        <v-list-item-icon>
          <v-icon>mdi-account-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Egresados</v-list-item-title>
      </v-list-item>
    </v-list>
    {{ element }}
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer",
  data: () => ({
    element: null,
    nav: false,
  }),
  methods: {
    changeElement(idItem) {
      this.$emit("changeDrawer", idItem);
    },
    change() {
      this.nav = !this.nav;
    },
  },
};
</script>

<style scoped></style>
