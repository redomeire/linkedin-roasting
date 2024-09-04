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
          style="width: 100%; margin-bottom: 20px;"
          v-model="username"
        />
        <button type="submit">
          Roast🔥
        </button>
      </form>
      <p style="color: red;" v-if="response.error">
        {{ response.error }}
      </p>
    </div>
</template>

<script setup>
import { reactive, defineModel, defineProps } from 'vue'
import { useFetch } from '../../../composables/useFetch'

const resultText = defineModel('resultText')
const username = defineModel('username')

const response = reactive({
  data: null,
  error: null,
  isLoading: false
})

const handleSubmit = async () => {
  const { data, error, isLoading } = await useFetch('/thread/create', {
    method: 'POST',
    body: JSON.stringify({
      username: username.value
    }),
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    }
  })

  response.error = error
  response.isLoading = isLoading

  if (!error) {
    username.value = ''
    props.resultText = data.answer.text
    console.log(data, error, isLoading)
  }

  alert('error ' + error.message)
}
</script>
