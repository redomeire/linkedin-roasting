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
          required
        />
        <label for="fullname">Full Name</label>
        <input 
          type="text"
          id="fullname"
          placeholder="Enter your name"
          style="margin: 20px 0;"
          v-model="formData.name"
          required
        />
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          style="margin: 20px 0;"
          v-model="formData.password"
          required
        />
        <button type="submit">
          Submit
        </button>
    </form>
    <p>
      already have account?
      <router-link to="/auth/login">
        Login
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { useFetch } from '../../composables/useFetch'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const ruter = useRouter()
const response = reactive({
  data: null,
  error: null,
  isLoading: false
})
const formData = reactive({
  email: '',
  name: '',
  password: ''
})
const handleSubmit = async () => {
  console.log('submitted')
  console.log(formData)
  const { data, error, isLoading } = await useFetch('/auth/register', {
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
    setTimeout(() => {
      ruter.push({ name: 'Login' })
    }, 1000);
    return
  }

  alert('error ' + error.message)
}
</script>
