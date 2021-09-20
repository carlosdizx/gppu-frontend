<template>
  <div>
    <v-toolbar dark color="cyan darken-4" flat>
      <router-link v-if="back" to="/" v-slot="{ navigate }" custom>
        <v-btn icon role="link" @click="navigate">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </router-link>
      <v-toolbar-title>{{ titulo }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="url" v-slot="{ navigate }" custom>
        <v-btn role="link" @click="navigate" icon>
          <v-icon>{{ icono }}</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-tabs background-color="cyan darken-4" center-active dark>
      <v-tab v-for="(tab, i) in tabs" :key="i" @click="cambiarIndex(i + 1)">
        <v-icon>{{ tab }}</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data: () => ({
    indice: 1,
  }),
  props: {
    titulo: String,
    icono: String,
    url: String,
    tabs: Array,
    back: Boolean,
  },
  methods: {
    cambiarIndex(i) {
      this.indice = i;
      this.$emit("indice", this.indice);
    },
  },
};
</script>
