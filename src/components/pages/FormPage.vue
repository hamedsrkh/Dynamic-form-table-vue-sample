<template>
  <div>
    <h2 class="pb-2">Form</h2>
    <v-form @submit="submitForm">
      <component
        v-for="field in data.fields"
        :key="field.name"
        :is="field.Type + 'Input'"
        :name="field.name"
        :label="field.label"
        @setFormInput="setFormInput"
      ></component>
      <v-btn color="primary">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import TextField from "../FormComponents/TextField";
import Checkbox from "../FormComponents/Checkbox";
export default {
  props: ["data"],
  name: "FormPage",
  components: {
    textInput: TextField,
    checkboxInput: Checkbox,
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    initializeForm() {
      let form = {};
      this.data.fields.forEach((field) => {
        form[field.name] = "";
      });
      this.form = form;
    },
    setFormInput(input) {
      this.form[input.name] = input.value;
    },
    submitForm() {
      console.log("form is submitted");
    },
  },
  created() {
    this.initializeForm();
  },
};
</script>

<style scoped></style>
