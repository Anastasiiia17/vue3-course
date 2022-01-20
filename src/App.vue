<template> 
<div class="app">
    <h1>Страница с постами</h1>
    <!-- <input type="text" v-model.trim="modificatorValue">  -->
    <my-button @click="fetchPosts"> Получить посты</my-button>

    <my-button 
    @click="showDialog"
    >
    
     Создать пост</my-button>


    <my-dialog v-model:show="dialogVisible"> 

        <post-form  
        @create="createPost" 
        />

    </my-dialog>

    <post-list 
    :posts="posts"
    @remove="removePost"
    />
   
</div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from 'axios';

export default{
    components: {
        PostForm, PostList
    },

    data() {
        return{
            posts: [ ],
            dialogVisible: false,
            modificatorValue: '',
        }
    },
    methods: {
        createPost(post){
           this.posts.push(post);
           this.dialogVisible = false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible = true;
        },
        async fetchPosts(){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'); //ответ от запроса на сервер
                this.posts = response.data
                console.log(response)
            } catch (e) {
                alert('Ошибка')
            }
        }
    }
}
</script>


<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app{
    padding: 20px;
}


</style>