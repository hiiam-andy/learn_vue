import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import PostView from "../views/PostView.vue";
import OnePostView from "../views/OnePostView.vue";
import MainView from "../views/MainView.vue";

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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
