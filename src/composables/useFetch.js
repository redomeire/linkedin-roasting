const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function useFetch(url, options) {
  let data = null
  let error = null
  let isLoading = false
  
  try {
    isLoading = true
    error = null

    const response = await fetch(API_BASE_URL + url, options ?? {})
    if (!response.ok) {
      error = await response.json()
      console.log(error);
      return
    }

    data = await response.json()
  } 
  catch (errorResponse) {
    console.log("error", errorResponse)
    error = errorResponse
  } 
  finally {
    isLoading = false
    return { data, error, isLoading }
  }
}
