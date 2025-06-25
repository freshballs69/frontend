<template>
    <div class="page">
        <Button @click="$router.back()"><- Return back </Button>
        <h1 class="thin">Create new post</h1>
        
        <PostForm :onSave="handleCreation"></PostForm>
    </div>
</template>


<script setup lang="js">

const { createPost } = usePosts();

const handleCreation = (data) => {
    createPost(data).then(() => {
        alert("Created ok!");
    }).catch((err) => {
        console.log(err);
        alert("Failed!!");
    });
}

</script>

