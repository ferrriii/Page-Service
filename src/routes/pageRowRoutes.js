import rowController from '../controllers/rowController.js'
import express from 'express'
// merge params to access page id
const router = express.Router({ mergeParams: true })

router.post('/', rowController.addRow)

router.delete('/:rowId', rowController.deleteRow)

// NOTE: row has no attribute except pageID so, get and update doesn't make sense

export default router
