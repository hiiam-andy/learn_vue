<template>
  <my-button @click="$router.push('/about')">About</my-button>
  <post-form></post-form>
  <post-list></post-list>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

export default {
  components: {
    PostList,
    PostForm,
  },
};
</script>
