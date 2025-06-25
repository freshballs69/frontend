<template>
    <div class="post-card">
        <div class="title-wrapper">
            <NuxtLink :to="`/posts/${id}`" class="styless">
                <h2 class="title">{{ title }}</h2>
            </NuxtLink>
            <div class="actions">
                <NuxtLink :to="`/posts/${id}/edit/`"  class="styless">
                    <Icon class="edit-icon" name="pencil"></Icon>
                </NuxtLink>
                <Button @click="deletePostById(id, true)">
                    <Icon class="delete-icon" name="trash"></Icon>
                </Button>
            </div>
        </div>
        <div class="body">
            {{ body }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});
const { deletePostById } = usePosts();
</script>