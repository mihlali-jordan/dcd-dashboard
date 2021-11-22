import jwt from 'jsonwebtoken'

// Utility functions
import { refreshAuthToken, setHTTPHeaders } from '../lib/utils'

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
      console.log('a')
      return res.status(401).json({
        success: false,
        message: 'Please sign in to get access',
      })
    }

    try {
      const decoded = jwt.verify(token, secret)
      setHTTPHeaders(req, token, decoded)

      return handler(req, res)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const { data } = await refreshAuthToken(req, res, refreshToken)
        const decodedToken = jwt.decode(data.access_token)
        setHTTPHeaders(req, data.access_token, decodedToken)

        return handler(req, res)
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid auth token',
        })
      }

      return res.status(401).json({
        success: false,
        message: 'Please log in to get access',
      })
    }
  }
}

export default withProtect
