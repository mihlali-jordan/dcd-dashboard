import withProtect from '../../../middleware/withProtect.js'
import { httpMethodGuard } from '../../../lib/utils'
import { Axios } from '../../../lib/config/axios.js'

const handler = async (req, res) => {
  httpMethodGuard(req, res, 'POST')

  try {
    const { status } = await Axios({
      method: 'POST',
      url: '/Products',
      data: {
        ...req.body,
        vendor_id: req.userId,
      },
    })

    return res.status(status).json({
      success: true,
    })
  } catch (err) {
    return res.status(err.response.status).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
}

export default withProtect(handler)
