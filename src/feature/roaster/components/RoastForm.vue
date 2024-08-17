<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <label
          style="display: block; margin-bottom: 20px;"
          for="username"
        >
         Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          v-model="username"
        />
        <button type="submit">
          Roast🔥
        </button>
      </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '../../../composables/useFetch'

const username = ref('')
const handleSubmit = () => {
  alert('your username is : ' + username.value)

  const { data, error, isLoading } = useFetch('/api/roast', {
    
  })
}
</script>
