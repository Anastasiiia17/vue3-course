<template>
    <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    
        <post-item 
        v-for="post in posts" 
        :post="post" 
        :key="post.id"
        @remove="$emit('remove', post)"
        />

    </div>
    <h2 v-show="posts.length === 0" style="color: red">
    Список постов пуст
    </h2>

</template>

<script>
import PostItem from './PostItem.vue'
export default {
  components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true, //обязательный
        }
    }
}
</script>

<style scoped>
.post{
    padding: 15px;
    border: 1px solid teal;
    margin-top: 15px;
}
</style>