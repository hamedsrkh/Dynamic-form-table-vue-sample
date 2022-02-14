<template>
  <v-text-field
    :label="label"
    required
    v-model="value[name]"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  props: ["name", "label", "value"],
};
</script>
