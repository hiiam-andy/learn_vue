<template>
  <div class="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}
</style>
