<template>
  <div>
    <component :is="pageType" :data="pageData"></component>
  </div>
</template>
<script>
import Loading from "../components/Loading";

export default {
  name: "Page",
  components: {
    Loading,
    FormPage: () => ({
      component: import(
        /* webpackChunkName: "form-page" */ "../components/pages/FormPage.vue"
      ),
      loading: Loading,
    }),
    TablePage: () => ({
      component: import(
        /* webpackChunkName: "table-page" */ "../components/pages/TablePage.vue"
      ),
      loading: Loading,
    }),
  },
  data() {
    return {
      pageType: "",
      pageData: undefined,
    };
  },
  methods: {
    fetchPageConfig() {
      fetch(`/api/${this.$route.params.page}/uiconfig`)
        .then((res) => res.json())
        .then((data) => {
          this.initializePage(data);
        });
    },
    initializePage(data) {
      if (data.Type === "table") {
        this.pageType = "TablePage";
        this.pageData = data;
      } else if (data.Type === "form") {
        this.pageType = "FormPage";
        this.pageData = data;
      } else {
        this.pageType = "";
      }
    },
  },
  watch: {
    "$route.params.page": {
      handler: function () {
        this.fetchPageConfig();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style scoped></style>
