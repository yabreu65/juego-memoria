import { createRouter, createWebHistory } from "vue-router";
import HelloWord from "./components/HelloWorld.vue";
import Entrar from "./components/Entrar.vue";

const routes = [
    { path: "/", name: "entrar", props: true, component: Entrar },
    {
        name: "helloword",
        path: "/helloword/:id",
        component: HelloWord,
    },
];

const router = new createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
