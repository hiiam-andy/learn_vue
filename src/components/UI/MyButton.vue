<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  border: 1px solid gray;
  padding: 5px 15px;
  background: none;
  cursor: pointer;
}
</style>
