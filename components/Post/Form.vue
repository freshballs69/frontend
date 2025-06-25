<template>
    <form class="flex-column inputs post-form" @submit.prevent="doSave">
        <input type="text" v-model="title" placeholder="Enter title of your post..." required>
        <textarea v-model="body" placeholder="Enter body of your post..." rows="10" required></textarea>
         <div class="image-search-wrapper">
            <input type="text" v-model="imageSearchQuery" placeholder="Search image..." class="img-search-input">
            <button class="search-btn" type="button" @click="doImageSearch">Search...</button>
         </div>
         <div class="image-preview">
            <div class="image-skeleton" v-if="isImageLoading"></div>
            <div v-else-if="imageUrl" :style="`background: url('${imageUrl}') no-repeat center center / cover; height: 300px; width: 600px;`" ></div>
         </div>
         <div>
            <button class="save-button">Save</button>
         </div>
    </form>
</template>


<script setup>
const props = defineProps({
    onSave: {
        type: Function
    },
    title: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
});

const imageSearchQuery = ref('');
const imageUrl = ref(props.image || null);
const title = ref(props.title);
const body = ref(props.body);
const isImageLoading = ref(false);

const { searchImage } = useImageApi();


const doImageSearch = () => {
    if (!imageSearchQuery.value) {
        imageUrl.value = null;
        return;
    }

    isImageLoading.value = true;
    searchImage(imageSearchQuery.value).then((res) => {
        isImageLoading.value = false;

        if (res?.success) {
            imageUrl.value = res.data.url;
        } else {
            imageUrl.value = null;
        }
    }).catch((error) => {
        console.error('Image search error:', error);
        imageUrl.value = null;
    });
}

const doSave = () => {
    props.onSave({
        title: title.value,
        body: body.value,
        image: imageUrl.value,
    });
}

</script>