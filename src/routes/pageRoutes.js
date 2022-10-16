import pageController from '../controllers/pageController.js'
import express from 'express'
const router = express.Router()

router.get('/', pageController.getAllPages)

router.get('/:pageId', pageController.getOnePage)

router.post('/', pageController.addPage)

router.patch('/:pageId', pageController.UpdatePage)

router.delete('/:pageId', pageController.deletePage)

export default router
