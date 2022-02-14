<template>
  <v-container fill-height fluid style="height: 100%">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card height="300px" width="100%" class="custom-card" elevation="5">
          <div class="text-h2">404</div>
          <br>
          <div class="text-h6 text--secondary">Page Not Found</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
<style scoped>
.custom-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
