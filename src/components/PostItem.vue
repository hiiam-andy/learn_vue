<template>
  <div class="post">
    <div>
      <strong> {{ post.id }}</strong>
      <div>
        Название <span>{{ post.title }}</span>
      </div>
      <div>
        Описание <span>{{ post.body }}</span>
      </div>
    </div>
    <div class="buttons">
      <my-button class="btn" @click="$router.push(`/posts/${post.id}`)">
        Открыть
      </my-button>
      <my-button class="btn" @click="$emit('removePost', post)">
        удалить
      </my-button>
    </div>
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
.buttons {
  align-self: flex-end;
}
.btn {
  margin-left: 5px;
}
</style>
