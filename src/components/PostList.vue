<template>
  <div v-if="this.posts.length > 0">
    <h1>Список постов</h1>
    <post-item
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @removePost="$emit('removePost', post)"
    />
  </div>
  <h1 v-else>Нет постов</h1>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: {
    PostItem,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
