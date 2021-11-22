import axios from 'axios'
import { setAuthCookies } from '../../lib/utils'

export default async function handler(req, res) {
  console.log(req.body)
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SUPABASE_API_AUTH_ENDPOINT}/token`,
      { ...req.body },
      {
        params: {
          grant_type: 'password',
        },
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
      }
    )

    setAuthCookies(req, res, data)

    res.status(200).json({ message: 'Successfully authenticated' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Invalid Credentials' })
  }
}
