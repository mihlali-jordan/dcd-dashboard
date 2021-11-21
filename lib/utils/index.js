import jwt from 'jsonwebtoken'

export const isAuthenticated = token => {
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
          },
        }
      }
    }
  )
}

export const isNotAuthenticated = () => {}
