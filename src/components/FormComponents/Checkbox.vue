<template>
  <v-checkbox v-model="value[name]" :label="label"></v-checkbox>
</template>

<script>
export default {
  name: "Checkbox",
  props: ["name", "label", "value"],
};
</script>
