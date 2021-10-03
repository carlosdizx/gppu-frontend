<template>
  <v-footer dark padless>
    <v-card flat tile class="cyan darken-4 lighten-1 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="item in items"
          :key="item.url"
          :href="item.url"
          icon
          role="link"
          target="_blank"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        © 2021 - 2026 Todos los derechos reservados. —
        <v-btn
          href="https://www.umariana.edu.co/index.html"
          target="_blank"
          text
        >
          <strong>Universidad Mariana</strong>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    items: [
      {
        icon: "mdi-facebook",
        url: "https://www.facebook.com/UniversidadMariana.Pasto",
      },
      { icon: "mdi-twitter", url: "https://twitter.com/UMarianaPasto" },
      {
        icon: "mdi-instagram",
        url: "https://instagram.com/universidadmariana/",
      },
      {
        icon: "mdi-youtube",
        url: "https://www.youtube.com/user/UniversidadMariana",
      },
    ],
  }),
};
</script>

<style scoped></style>
