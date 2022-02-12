<template>
  <div>
    <keep-alive>
      <component :is="page" :data="page"></component>
    </keep-alive>
    <v-btn
      color="primary"
      @click="page === 'FormPage' ? (page = 'TablePage') : (page = 'FormPage')"
    >
      toggle pages
    </v-btn>
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
      page: "FormPage",
    };
  },
};
</script>

<style scoped></style>
