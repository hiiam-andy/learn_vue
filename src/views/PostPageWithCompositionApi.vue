<template>
  <!-- <div>
    <h1>{{ likes }}</h1>
    <div>
      <my-button @click="increment">Прибавить</my-button>
      <my-button @click="decrement">Убавить</my-button>
    </div>
  </div> -->

  <div class="container">
    <!-- подписка на событие из дочернего, из которого получили данные -->
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>

    <div class="app_btns">
      <my-button @click="showDialog">Добавить пост</my-button>
      <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
      <my-select v-model="selectedSort" :options="sortOptions" />
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

    <!-- <div class="observer" v-intersection="this.fetchMorePosts"></div> -->
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyButton from "@/components/UI/MyButton.vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
  },

  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);
    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
  },
  // setup(props) {
  //   const likes = ref(2);
  //   const increment = () => {
  //     likes.value += 1;
  //   };
  //   const decrement = () => {
  //     likes.value -= 1;
  //   };
  //   return { likes, increment, decrement };
  // },
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
