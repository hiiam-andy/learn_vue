<template>
  <form @submit.prevent>
    <h4>Добавление поста</h4>
    <my-input v-focus v-model.trim="post.title" placeholder="Название" />
    <textarea v-model.trim="post.body" placeholder="Описание" />
    <my-button @click="createPost" class="btn">Добавить</my-button>
  </form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      // 'эмитим в родителя - название события для родителя, полезная нагрузка
      if (this.post.title && this.post.body) {
        this.$emit("create", this.post);
      } else {
        alert("не всё заполненно");
      }
      this.post = {
        title: "",
        body: "",
      };
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 2px solid gray;
}
input {
  margin-bottom: 5px;
}
.btn {
  align-self: flex-end;
}
</style>
