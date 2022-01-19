<template>
    <div>
        <h3>Список пользователей</h3>
    
        <post-item v-for="post in posts" :post="post" />

    </div>
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