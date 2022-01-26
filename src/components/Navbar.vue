<template>
    <div class="navbar">
    <div @click="$router.push('/')">Course</div>
    <div class="navbar__btns"> 
        <my-button @click="$router.push('/posts')">Посты</my-button>
        <my-button @click="$router.push('/about')">О нас</my-button>
    </div>  
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.navbar {
    height: 50px;
    background-color: lightgray;
    display: flex;
    align-items: center;
    padding: 0px 15px;
}

.navbar__btns{
     margin-left: auto;
}
</style>