import pageImageController from '../controllers/pageImageController.js'
import express from 'express'
const router = express.Router({ mergeParams: true })

router.post('/', pageImageController.addPageImage)

router.delete('/:imageElementId', pageImageController.deletePageImage)

// NOTE: row has no attribute except pageID so, get and update doesn't make sense

export default router
