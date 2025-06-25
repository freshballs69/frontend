<template>
    <Button @click="$router.back()"><- Return back </Button>
    You are editing post with id {{ $route.params.id }}
    <PostForm :onSave="handleUpdate" v-if="post" :title="post.data.title" :body="post.data.body" :image="post.data.image"></PostForm>
    <div v-else>Loading....</div>
</template>

<script setup>

const post = ref(null);

const { fetchPostById, updatePost } = usePosts();
const route = useRoute()


fetchPostById(route.params.id).then((p) => {
    post.value = p;
});

const handleUpdate = (updated) => {
    updatePost(route.params.id, updated).then((r) => {
        alert('Updated ok!');
    }).catch((err) => {
        console.log(err);
        alert("error on console.");
    })
}

</script>