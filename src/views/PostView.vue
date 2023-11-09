<template>
  <div class="container">
    <my-dialog v-model:show="dialogVisible">
      <!-- подписка на событие из дочернего, из которого получили данные -->
      <post-form @create="createPost"></post-form>
    </my-dialog>
    <div class="app_btns">
      <my-button @click="showDialog">Добавить пост</my-button>
      <my-input v-model="searchQuery" placeholder="Поиск..."></my-input>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <div>
      <h1 v-if="this.isPostsLoading">Загрузка...</h1>
      <post-list
        :posts="sortedAndSearchedPosts"
        @removePost="removePost"
        v-else
      >
      </post-list>
    </div>
    <!-- <div class="page_wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          current_page: page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
    <div class="observer" ref="observer"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
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
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
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

    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
        this.posts = res.data;
      } catch (e) {
        this.isPostsLoading = false;
      } finally {
        this.isPostsLoading = false;
      }
    },

    async fetchMorePosts() {
      try {
        this.page += 1;
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(res.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...res.data];
      } catch (e) {
        console.log(e);
      }
    },

    showDialog() {
      this.dialogVisible = true;
    },
  },

  mounted() {
    this.fetchPosts();
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.fetchMorePosts();
      }
      /* Content excerpted, show below */
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      );
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((a, b) => {
    //     a[newValue]?.localeCompare(b[newValue]);
    //   });
    // },
    // page() {
    //   this.fetchPosts();
    // },
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
