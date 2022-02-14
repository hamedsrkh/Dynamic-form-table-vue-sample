<template>
  <div>
    <component :is="pageType" :data="pageData"></component>
    <PageNotFound v-if="error" style="height: 85vh"/>
  </div>
</template>
<script>
import Loading from "../components/Loading";
import PageNotFound from "./PageNotFound";

export default {
  name: "Page",
  components: {
    PageNotFound,
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
      error: "",
    };
  },
  methods: {
    fetchPageConfig() {
      this.error = null;
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
        this.error = "404 / page does not exist";
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
