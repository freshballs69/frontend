<template>
  <div class="page">
    <h1 class="thin">Posts</h1>

    <NuxtLink to="/posts/create">Create new post</NuxtLink>

    <div class="flex-column gap-10px margin-10px">
        <PostCardSkeleton v-for="n in 5" v-if="isLoading"/>
        <PostCard
            v-else
            v-for="post in posts"
            :key="post.id"
            :id="post.id"
            :title="post.title"
            :body="post.body"
        />
    </div>

    <div class="pagination-controls margin-10px">
      <Button @click="goToPrevPage" :disabled="!hasPrev">« Previous</Button>
      <span>Page {{ currentPage }} of {{ lastPage }}</span>
      <Button @click="goToNextPage" :disabled="!hasNext">Next »</Button>
    </div>
  </div>
</template>

<script setup>
const {
    isLoading,
    posts,
    fetchPosts,
    currentPage,
    lastPage,
    hasNext,
    hasPrev,
    goToNextPage,
    goToPrevPage,
} = usePosts()

const page = ref(1)

watchEffect(() => {
  fetchPosts(page.value)
})


</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
