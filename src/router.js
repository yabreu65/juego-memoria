import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Game from "./components/Game.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: "Memory Master - Inicio"
        }
    },
    {
        path: "/game/:difficulty",
        name: "game",
        component: Game,
        meta: {
            title: "Memory Master - Juego"
        },
        beforeEnter: (to, _from, next) => {
            const difficulty = parseInt(to.params.difficulty);
            if (difficulty >= 1 && difficulty <= 3) {
                next();
            } else {
                next({ name: 'home' });
            }
        }
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach((to) => {
    document.title = to.meta.title || "Memory Master";
});

export default router;
