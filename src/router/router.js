import Main from "@/pages/Main";
import PostsPage from "@/pages/PostsPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
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
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    },
    
    
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;