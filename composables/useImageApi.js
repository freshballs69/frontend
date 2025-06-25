export const useImageApi = () => {
  const config = useRuntimeConfig()

  const searchImage = async (searchQuery) => {
    const response = await $fetch(`${config.public.apiBase}api/images/search`, {
      method: 'POST',
      body: {
        query: searchQuery,
      },
    })
    return response
  }

  return {
    searchImage,
  }
}
