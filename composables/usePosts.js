export const usePosts = () => {
    const config = useRuntimeConfig()

    const isLoading = useState('is-loading', () => true);

    const lastApiResponse = useState('last-api-response', () => null);


    const fetchPosts = async(page = 1) => {
        isLoading.value = true;
        const response = await $fetch(`${config.public.apiBase}api/posts/?page=${page}`);
        lastApiResponse.value = response;
        isLoading.value = false;
    }

    const createPost = async({title, body, image}) => {
        const response = await $fetch(`${config.public.apiBase}api/posts/`, {
            method: 'POST',
            body: {title, body, image},
        });
        return response;
    }

    const updatePost = async(postId, {title, body, image}) => {
        const response = await $fetch(`${config.public.apiBase}api/posts/${postId}`, {
            method: 'PUT',
            body: {title, body, image},
        });
        return response;
    }

    const fetchPostById = async(postId) => {
        const response = await $fetch(`${config.public.apiBase}api/posts/${postId}/`)
        return response
    }
    
    const deletePostById = async(postId, refetch = false) => {
        const response = await $fetch(`${config.public.apiBase}api/posts/${postId}/`, {method: "DELETE"});
        if (refetch){
            await fetchPosts();
        }
        return response;
    }

    const posts = computed(() => lastApiResponse.value?.data);
    const meta = computed(() => lastApiResponse.value?.meta || {});
    const currentPage = computed(() => meta.value.current_page || 1);
    const lastPage = computed(() => meta.value.last_page || 1);
    const hasNext = computed(() => currentPage.value < lastPage.value);
    const hasPrev = computed(() => currentPage.value > 1);

    const goToNextPage = async () => {
        if (hasNext.value) {
            await fetchPosts(currentPage.value + 1);
        }
    };

    const goToPrevPage = async () => {
        if (hasPrev.value) {
            await fetchPosts(currentPage.value - 1);
        }
    };

    return {
        posts,
        fetchPosts,
        currentPage,
        lastPage,
        hasNext,
        hasPrev,
        goToNextPage,
        goToPrevPage,
        createPost,
        updatePost,
        fetchPostById,
        deletePostById,
        isLoading
    };
}