import Main from "@/pages/Main";
import PostsPage from "@/pages/PostsPage";
const { createRouter, createWebHistory } = require("vue-router")


const routes =[
    {
        path: '/',
        component: Main
    },
     {
        path: '/posts',
        component: PostsPage
    },
    
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;