<template>
  <my-dialog v-model:show="dialogVisible">
    <!-- подписка на событие из дочернего, из которого получили данные -->
    <post-form @create="createPost"></post-form>
  </my-dialog>
  <div class="app_btns">
    <my-button @click="showDialog">Добавить пост</my-button>
    <my-select v-model="selectedSort" :options="sortOptions" />
  </div>
  <div>
    <h1 v-if="this.isPostsLoading">Загрузка...</h1>
    <post-list :posts="sortedPosts" @removePost="removePost" v-else>
    </post-list>
  </div>
</template>
<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        this.posts = res.data;
      } catch (e) {
        this.isPostsLoading = false;
        console.log(e);
      } finally {
        this.isPostsLoading = false;
      }
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },

  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      );
    },
  },
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((a, b) => {
  //       a[newValue]?.localeCompare(b[newValue]);
  //     });
  //   },
  // },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app_btns {
  display: flex;
  justify-content: space-between;
}
</style>
