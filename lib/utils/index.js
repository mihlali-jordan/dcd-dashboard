import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import axios from 'axios'

export const isAuthenticated = (token, otherProps) => {
  return jwt.verify(
    token,
    process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET,
    function (err, decoded) {
      if (err) {
        return {
          props: {},
          redirect: {
            destination: '/signin',
            parmanent: false,
          },
        }
      } else {
        return {
          props: {
            userID: decoded.sub,
            ...otherProps,
          },
        }
      }
    }
  )
}

export async function refreshAuthToken(req, res, refreshToken) {
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

  setAuthCookies(req, res, data)

  return data
}

export const httpMethodGuard = (req, res, reqType) => {
  const { method } = req

  if (method !== reqType) {
    return res.status(400).json({
      success: false,
      message: `Only ${reqType} requests are allowed`,
    })
  }
}

export function setAuthCookies(req, res, data) {
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
}

export function setHTTPHeaders(req, token, decodedToken) {
  req.userId = decodedToken.sub

  req.headers['Authorization'] = `Bearer ${token}`
  req.headers['apikey'] = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  req.headers['Content-Type'] = 'application/json'
}
