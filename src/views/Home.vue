<template>
  <div>
    <h1>Home</h1>
    <div>
      <v-btn color="primary" to="/">Home</v-btn>
      <v-btn color="secondary" to="/posts">Posts</v-btn>
      <v-btn color="success" to="/users">Users</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {

  },
};
</script>
