import jwt from 'jsonwebtoken'

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

export const httpMethodGuard = (req, res, reqType) => {
  const { method } = req

  if (method !== reqType) {
    return res.status(400).json({
      success: false,
      message: `Only ${reqType} requests are allowed`,
    })
  }
}
