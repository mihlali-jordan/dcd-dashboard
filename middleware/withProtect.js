import jwt from 'jsonwebtoken'
import axios from 'axios'

const getUser = async (id, url) => {
  const { data } = await axios.get(url, {
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    baseURL: process.env.NEXT_PUBLIC_SUPABASE_API_ENDPOINT,
    params: {
      id: `eq.${id}`,
      select: '*',
    },
  })

  return { user: data[0] }
}

const withProtect = handler => {
  return async (req, res) => {
    let token
    let refreshToken
    const secret = process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET

    if (req.cookies && req.cookies.authToken) {
      token = req.cookies.authToken
      refreshToken = req.cookies.refreshToken
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please sign in to get access',
      })
    }

    try {
      const decoded = jwt.verify(token, secret)

      const vendor = await getUser(decoded.sub, '/Vendors')

      if (!vendor) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token does not exist',
        })
      }

      req.user = vendor

      return handler(req, res)
    } catch (err) {
      // Handle expired token
      if (err.name === 'JsonWebTokenExpired') {
        const { data } = await axios.post(
          '/token',
          {
            refresh_token: refreshToken,
          },
          {
            params: {
              grant_type: 'refresh_token',
            },
            baseURL: process.env.NEXT_PUBLIC_SUPABASE_API_AUTH_ENDPOINT,
          }
        )

        // set refresh token and token
      }

      return res.status(401).json({
        success: false,
        message: 'Please log in to get access',
      })
      // Get user profile from db
    }
  }
}

export default withProtect
