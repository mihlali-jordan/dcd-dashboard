import withProtect from '../../../middleware/withProtect.js'
import { httpMethodGuard } from '../../../lib/utils'
import { Axios } from '../../../lib/config/axios.js'

const handler = async (req, res) => {
  /**
   * @Update
   */
  if (req.method === 'PATCH') {
    httpMethodGuard(req, res, 'PATCH')
    try {
      const { status } = await Axios({
        method: 'PATCH',
        url: '/Products',
        data: req.body,
        params: {
          id: `eq.${req.query.id}`,
        },
      })

      return res.status(200).json({
        success: true,
      })
    } catch (err) {
      return res.status(err.response.status).json({
        success: false,
        message: err.message,
      })
    }
  }

  /**
   * @Delete
   */
  if (req.method === 'DELETE') {
    httpMethodGuard(req, res, 'DELETE')
    try {
      const { status } = await Axios({
        method: 'DELETE',
        url: '/Products',
        params: {
          id: `eq.${req.query.id}`,
        },
      })

      return res.status(status).json({
        success: true,
      })
    } catch (err) {
      return res.status(err.response.status).json({
        success: false,
        message: err.message,
      })
    }
  }
}

export default withProtect(handler)
