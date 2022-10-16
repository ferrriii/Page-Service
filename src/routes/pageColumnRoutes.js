import columnController from '../controllers/columnController.js'
import express from 'express'
// merge params to access page id
const router = express.Router({ mergeParams: true })

router.post('/', columnController.addColumn)

router.delete('/:columnId', columnController.deleteColumn)

// NOTE: column has no attribute except rowId so, get and update doesn't make sense

export default router
