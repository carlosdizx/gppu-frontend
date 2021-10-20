<template>
  <v-dialog v-model="dialog" persistent max-width="800">
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="orange darken-2" text v-bind="attrs" v-on="on">
        Politicas y normativas
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <h1>Políticas de Tratamiento de la Información de datos</h1>
        <br />
        <br />
        <h2>1. Responsables del tratamiento de los datos</h2>
        <v-divider />
        <h3>Universidad Mariana</h3>
        NIT: 800092198-5 <br />
        Dirección: Calle 18 No. 34-104 Pasto (N) <br />
        Correo electrónico: informacion@umariana.edu.co <br />
        Teléfono: (057) + 7244460 - Cel. 3127306850 <br />
        <v-divider />
        <h3>CUEEN</h3>
        NIT: 800092198-5 <br />
        Dirección: Sede VIPRI – Cr. 33 No. 5 - 121 Las Acacias, Bloque 5 Oficina
        201 <br />
        Correo electrónico: cueenarino_2011@hotmail.com <br />
        Teléfono: Cel. 3103890788 <br />
        <v-divider />
        <br /><br />
        <h2>2. Tratamiento y finalidad</h2>
        <v-divider />
        El tratamiento a la información que realizará la Universidad Mariana con
        el aval de CUEEN, será:
        <br /><br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </v-card-text>
    </v-card>
    <v-btn color="red darken-4" dark @click="dialog = !dialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-dialog>
</template>

<script>
export default {
  name: "DocumentoPoliticas",
  data: () => ({
    dialog: false,
  }),
};
</script>

<style scoped></style>
