<template>
  <v-text-field
    @input="setFormData"
    :label="label"
    required
    v-model="value"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  props: ["name", "label"],
  data() {
    return {
      value: "",
    };
  },
  methods: {
    setFormData() {
      this.$emit("setFormInput", { name: this.name, value: this.value });
    },
  },
};
</script>
