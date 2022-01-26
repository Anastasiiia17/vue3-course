<template> 
<div>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <!-- <h1>{{ $store.state.likes }}</h1>
    <input type="text" v-model.trim="modificatorValue">  -->
   <my-input
   v-model="searchQuery"
   placeholder="Поиск..."
   v-focus
   />
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
    :posts="sortedAndSearchedPosts"
    @remove="removePost"
    v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка... </div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--<div class="page__wrapper"> 
        <div 
            v-for="pageNumber in totalPages" 
            :key="pageNumber"
            class="page-number"
            :class="{
                'current-page' : page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >
            {{ pageNumber }}
        </div>
    </div> -->

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
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию' },
            ]
        }
    },

    methods: {
        createPost(post){
           this.posts.push(post);
           this.dialogVisible = false;
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog(){
            this.dialogVisible = true;
        },
        // changePage(pageNumber){
        //     this.page = pageNumber
        //     this.fetchPosts()
        // },
        async fetchPosts(){
            try{
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                    params: { 
                    _page: this.page,
                    _limit: this.limit,
                    }
                }); //ответ от запроса на сервер
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data
            } catch (e) {
                alert('Ошибка')
            }finally{
                this.isPostsLoading = false;
            }
        },

        async loadMorePosts(){
            try{
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?', {
                    params: { 
                    _page: this.page,
                    _limit: this.limit,
                    }
                }); //ответ от запроса на сервер
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert('Ошибка')
            }
        }
    },
    mounted() {
        this.fetchPosts();
        console.log(this.$refs.observer); //нашли объект в DOM
        // const options = {
        // rootMargin: '0px',
        // threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //  if (entries[0].isIntersecting && this.page < this.totalPages){
        //      this.loadMorePosts()
        //  }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
                })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },

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
.app__btns{
    display: flex;
    justify-content: space-between;
}
.page__wrapper{
    display: flex;
    margin-top: 15px;
}
.page-number{
    border: 1px solid teal;
    color: teal;
    padding: 5px 10px;
    margin: 1px;
}
.current-page{
    background-color: teal; 
    border: 2px solid teal;
    color: white;
}
.observer{
    height: 30px;
    background: gray;
}
</style>