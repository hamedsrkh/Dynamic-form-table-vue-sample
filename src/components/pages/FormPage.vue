<template>
  <div>
    <h2 class="pb-2">Form</h2>
    <v-form @submit.prevent="submitForm">
      <component
        v-for="field in data.fields"
        :key="field.name"
        :is="field.Type + 'Input'"
        :name="field.name"
        :label="field.label"
        :value="form"
      ></component>
      <v-btn type="submit" color="primary" :loading="loading">Submit</v-btn>
    </v-form>
    <v-divider class="my-2"></v-divider>
    <DataTable
      v-if="tableData.rows.length > 0"
      :rows="tableData.rows"
      :headers="tableData.headers"
    />
    <v-snackbar
      v-model="snackbar.active"
      timeout="2000"
      :color="snackbar.color"
      right
      shaped
      bottom
      elevation="24"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar.active = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import TextField from "../FormComponents/TextField";
import Checkbox from "../FormComponents/Checkbox";
import DataTable from "../DataTable";

export default {
  props: ["data"],
  name: "FormPage",
  components: {
    textInput: TextField,
    checkboxInput: Checkbox,
    DataTable,
  },
  data() {
    return {
      form: {},
      loading: false,
      snackbar: {
        active: false,
        Text: "",
        color: "danger",
      },
      tableData: {
        headers: [],
        rows: [],
      },
    };
  },
  methods: {
    initializeForm() {
      let form = {};
      this.data.fields.forEach((field) => {
        let value = field.Type === "text" ? "" : false;
        form[field.name] = value;
      });
      this.form = form;
    },
    initializeTable() {
      this.tableData.headers = this.data.fields.map((field) => ({
        text: field.label,
        value: field.name,
      }));
    },
    submitForm() {
      (async () => {
        this.loading = true;
        const response = await fetch("/api" + `${this.data.submitApi}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.form),
        });
        const content = await response.json();
        if (content.message === "success") {
          this.snackbar = {
            active: true,
            text: this.data.onSuccess,
            color: "success",
          };
          this.tableData.rows.push(this.form);
          this.initializeForm();
        } else {
          this.snackbar = {
            active: true,
            text: this.data.onError,
            color: "red",
          };
        }
        this.loading = false;
      })();
    },
  },
  created() {
    this.initializeForm();
    this.initializeTable();
  },
};
</script>

<style scoped></style>
