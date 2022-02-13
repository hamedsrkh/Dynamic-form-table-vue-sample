<template>
  <div>
    <h3>Table</h3>
    <DataTable :headers="headers" :rows="rows" />
  </div>
</template>

<script>
import DataTable from "../DataTable";
export default {
  components: { DataTable },
  props: ["data"],
  name: "Table",
  data() {
    return {
      headers: [],
      rows: [],
    };
  },
  methods: {
    async initializeTable() {
      this.headers = this.data.headers.map((header, index) => ({
        text: header,
        value: this.data.values[index],
      }));
      await fetch("/api" + `${this.data.fetchApi}`)
        .then((res) => res.json())
        .then((data) => {
          this.rows = data[this.$route.params.page];
        });
    },
  },
  async created() {
    await this.initializeTable();
  },
};
</script>

<style scoped></style>
