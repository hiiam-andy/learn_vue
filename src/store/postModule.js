import axios from "axios";

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) =>
        a[state.selectedSort]?.localeCompare(b[state.selectedSort])
      );
    },

    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setIsPostsLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setIsPostsLoading", true);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(res.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", res.data);
      } catch (e) {
        console.log(e);
      } finally {
        commit("setIsPostsLoading", false);
      }
    },

    async fetchMorePosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit("setPosts", [...state.posts, ...res.data]);
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true,
};
