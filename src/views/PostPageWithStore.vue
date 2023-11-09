<template>
  <!-- <div>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('increment')">Прибавить</my-button>
      <my-button @click="$store.commit('decrement')">Убавить</my-button>
    </div>
  </div>
  <div>
    <h1>{{ $store.state.isAuth ? "Авторизован" : "Не авторизован" }}</h1>
    <my-button @click="$store.commit('auth')">Авторизовать</my-button>
  </div> -->

  <div class="container">
    <my-dialog v-model:show="dialogVisible">
      <!-- подписка на событие из дочернего, из которого получили данные -->
      <post-form @create="createPost"></post-form>
    </my-dialog>

    <div class="app_btns">
      <my-button @click="showDialog">Добавить пост</my-button>
      <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
      ></my-input>
      <my-select
        v:model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>

    <div>
      <h1 v-if="isPostsLoading">Загрузка...</h1>
      <post-list
        :posts="sortedAndSearchedPosts"
        @removePost="removePost"
        v-else
      >
      </post-list>
    </div>
    <div class="observer" v-intersection="this.fetchMorePosts"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
  },

  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      fetchPosts: "post/fetchPosts",
      fetchMorePosts: "post/fetchMorePosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    removePost(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },

  mounted() {
    this.fetchPosts();
  },
  beforeUnmount() {
    this.setPage(1);
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
};
</script>

<style>
.app_btns {
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
.page {
  border: 1px solid gray;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}
.current_page {
  border: 3px solid teal;
}
.observer {
  height: 20px;
  background-color: lightskyblue;
}
</style>
