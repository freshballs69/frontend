<template>
    <div class="page">
        <Button @click="$router.back()"><- Return back </Button>
        <h1 class="post-title">{{ post.data.title }}</h1>
        <img :src="post.data?.image" alt="" v-if="post.data.image">
        <div> {{ post.data.body }}</div>

        <span v-if="post?.data" style="margin-top: 20px;">Last update at {{new Date(post.data.updated_at).toLocaleString()}}</span>
    </div>
</template>


<script setup>
const route = useRoute();
const { fetchPostById } = usePosts();

const post = ref({
    data: { title: '', body: '' }
});

fetchPostById(route.params.id).then((p) => post.value = p);



</script>