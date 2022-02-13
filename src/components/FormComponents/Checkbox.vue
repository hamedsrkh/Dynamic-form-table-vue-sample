<template>
  <v-checkbox v-model="value" :label="label" @change="setFormData"></v-checkbox>
</template>

<script>
export default {
  name: "Checkbox",
  props: ["name", "label"],
  data() {
    return {
      value: false,
    };
  },
  methods: {
    setFormData() {
      this.$emit("setFormInput", { name: this.name, value: this.value });
    },
  },
};
</script>
