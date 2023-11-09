<template>
  <div class="navbar">
    <div @click="$router.push('/')">TEST VUE3</div>
    <div class="navbar__buttons">
      <my-button @click="$router.push('/about')">Суть</my-button>
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/store')">with Store</my-button>
      <my-button @click="$router.push('/composition')"
        >with CompositionApi</my-button
      >
    </div>
  </div>
</template>

<script>
import MyButton from "./UI/MyButton.vue";
export default {
  components: { MyButton },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  margin-bottom: 10px;
}
button {
  margin-left: 10px;
}
</style>
