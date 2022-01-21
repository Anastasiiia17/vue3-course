<template> 
<div class="app">
    <h1>Страница с постами</h1>
    <!-- <input type="text" v-model.trim="modificatorValue">  -->
    <my-button @click="fetchPosts"> Получить посты</my-button>

    <div class="app__btns">
        <my-button 
        @click="showDialog"
        >
        Создать пост
        </my-button>
    <my-select
        v-model="selectedSort"
        :options="sortOptions"
    />
    </div>

    <my-dialog v-model:show="dialogVisible"> 

        <post-form  
        @create="createPost" 
        />

    </my-dialog>

    <post-list 
    :posts="sortedPosts"
    @remove="removePost"
    v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка... </div>
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
            isPostsLoading: false,
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию' }
            ]
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
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10'); //ответ от запроса на сервер
                this.posts = response.data
                console.log(response)
            } catch (e) {
                alert('Ошибка')
            }finally{
                this.isPostsLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
        }
    }

    // watch: {
    //     selectedSort(newValue){
    //         this.posts.sort((post1, post2) => {
    //             return post1[this.selectedSort]?.localeCompare(post2[newValue])
    //             })
    //         //this.selectedSort и newValue в этом случае будут одним и тем же
    //         }
    // },
    
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

.app__btns{
    display: flex;
    justify-content: space-between;
}

</style>