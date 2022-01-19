<template> 
<div class="app">
    <h1>Страница с постами</h1>
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

export default{
    components: {
        PostForm, PostList
    },

    data() {
        return{
            posts: [
                {id: 1, title: 'Javascript', body: 'Описание поста 1' },
                {id: 1, title: 'Javascript2', body: 'Описание поста 2' },
                {id: 1, title: 'Javascript3', body: 'Описание поста 3' },

            ],
            dialogVisible: false,
        }
    },
    methods: {
        createPost(post, second){
           this.posts.push(post);
           this.dialogVisible = false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog(){
            this.dialogVisible = true;
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