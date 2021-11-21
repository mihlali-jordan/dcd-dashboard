import withProtect from '../../middleware/withProtect.js'

const handler = async (req, res) => {
  const { method, user } = req

  if (method !== 'GET') {
    return res.status(400).json({
      success: false,
      message: 'Only GET requests are allowed',
    })
  }

  return res.status(200).json({
    success: true,
    data: { ...user.user },
  })
}

export default withProtect(handler)
