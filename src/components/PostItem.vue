<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>

        <div class="post__btns">
         <my-button>Удалить</my-button>   

        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>