import axios from 'axios'
import Cookies from 'cookies'

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

    const cookies = new Cookies(req, res)
    cookies.set('authToken', data.access_token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    cookies.set('refreshToken', data.refresh_token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    res.status(200).json({ message: 'Successfully authenticated' })
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: 'Invalid Credentials' })
  }
}
