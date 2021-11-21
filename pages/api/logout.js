import Cookies from 'cookies'
import withProtect from '../../middleware/withProtect.js'

const handler = async (req, res) => {
  const { method } = req

  if (method !== 'POST') {
    return res.status(400).json({
      success: false,
      message: 'Only POST requests are allowed',
    })
  }

  const cookies = new Cookies(req, res)

  cookies.set('authToken', '', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
  })

  cookies.set('refreshToken', '', {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return res.status(200).json({
    success: true,
    data: {},
  })
}

export default withProtect(handler)
