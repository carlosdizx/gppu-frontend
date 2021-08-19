<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-date-picker v-model="dates" range></v-date-picker>
    </v-col>
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="dateRangeText"
        label="Rango"
        prepend-icon="mdi-calendar"
        readonly
      >
      </v-text-field>
      model: {{ dates }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CalendarioRango",
  data: () => ({
    dates: [],
  }),
  computed: {
    dateRangeText() {
      this.$emit("fecha", this.dates);
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style scoped></style>
