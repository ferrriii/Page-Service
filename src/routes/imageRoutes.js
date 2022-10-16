import imageController from '../controllers/imageController.js'
import express from 'express'
const router = express.Router()

router.get('/', imageController.getAllImages)

router.get('/:imageId', imageController.getOneImage)

router.post('/', imageController.addImage)

router.patch('/:imageId', imageController.UpdateImage)

// NOTE: since the image entity only has one url attribute, the PUT route which is for updating the entire image does not make sense
// so the PATCH is enough and no need to below route
// router.put('/:imageId', imageController.replaceImage)

router.delete('/:imageId', imageController.deleteImage)

export default router
