import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import PostView from "../views/PostView.vue";
import OnePostView from "../views/OnePostView.vue";
import MainView from "../views/MainView.vue";
import PostPageWithStore from "../views/PostPageWithStore.vue";
import PostPageWithCompositionApi from "../views/PostPageWithCompositionApi.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/posts",
    name: "posts",
    component: PostView,
  },
  {
    path: "/posts/:id",
    name: "onePost",
    component: OnePostView,
  },
  {
    path: "/store",
    name: "store",
    component: PostPageWithStore,
  },
  {
    path: "/composition",
    name: "composition",
    component: PostPageWithCompositionApi,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
