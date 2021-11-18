import axios from 'axios'

export const getHeaders = (authToken) => {
  if (authToken) {
    return {
      Authorization: `Bearer ${authToken}`,
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  } else {
    return {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  }
}

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_API_ENDPOINT,
  headers: getHeaders(),
})
