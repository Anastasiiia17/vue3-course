<template>
    <div v-show="posts.length > 0">
        <h3>Список постов</h3>
    
        <transition-group name="post-list">
            <post-item 
            v-for="post in posts" 
            :post="post" 
            :key="post.id"
            @remove="$emit('remove', post)"
            />
        </transition-group>

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

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move{
    transition: transform 0.8s ease;
}
</style>