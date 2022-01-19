<template> 
<div class="app">
  <post-form  @create="createPost" />
    <post-list :posts="posts"/>
   
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
        }
    },
    methods: {
        createPost(post, second){
           this.posts.push(post);
        },
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