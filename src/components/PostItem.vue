<template>
  <div class="post">
    <div>
      <div>
        Название <span>{{ post.title }}</span>
      </div>
      <div>
        Описание <span>{{ post.body }}</span>
      </div>
    </div>
    <my-button class="btn" @click="$emit('removePost', post)"
      >удалить</my-button
    >
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    required: true,
  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 15px;
}
.btn {
  align-self: flex-end;
}
</style>
