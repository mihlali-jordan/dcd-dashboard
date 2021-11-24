import withProtect from '../../middleware/withProtect.js'
import { Axios } from '../../lib/config/axios.js'
import { httpMethodGuard } from '../../lib/utils'

const handler = async (req, res) => {
  httpMethodGuard(req, res, 'GET')

  try {
    const { data, status } = await Axios({
      method: 'GET',
      url: '/Vendors',
      params: {
        id: `eq.${req.userId}`,
        select: '*',
      },
    })

    return res.status(status).json({
      success: true,
      data,
    })
  } catch (err) {
    return res.status(err.response.status).json({
      success: false,
      message: err.message,
    })
  }
}

export default withProtect(handler)
