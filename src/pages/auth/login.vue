<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="email">Email</label>
      <input 
        type="email"
        id="email"
        placeholder="Enter your email"
        style="margin: 20px 0;"
        v-model="formData.email"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        style="margin: 20px 0;"
        v-model="formData.password"
      />
      <button type="submit">
        Submit
      </button>
    </form>
    <p>
      Don't have account yet?
      <router-link to="/auth/register">
        Register
      </router-link>
    </p>
    <p style="color: red;" v-if="response.error">
      {{ response.error.message }}
    </p>
  </div>
</template>

<script setup>
import { useFetch } from "../../composables/useFetch"
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const response = reactive({
  data: null,
  error: null,
  isLoading: false
})
const formData = reactive({
  email: '',
  password: ''
})
const handleSubmit = async () => {
  console.log('submitted')
  console.log(formData)

  const { data, error, isLoading } = await useFetch('/auth/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(formData)
  })

  response.data = data
  response.error = error
  response.isLoading = isLoading

  if (!error) {
    window.localStorage.setItem('token', data.token)
    setTimeout(() => {
      router.push({ name: 'Home' })
    }, 1000);
    return
  }

  alert('error ' + error.message)
}
</script>
