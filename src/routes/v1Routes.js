import express from 'express'
import v1Pages from './pageRoutes.js'
import v1Images from './imageRoutes.js'
import v1PageRows from './pageRowRoutes.js'
import v1PageColumns from './pageColumnRoutes.js'
import v1PageImages from './pageImageRoutes.js'
import v1PageTexts from './pageTextRoutes.js'

const router = express.Router()

router.use('/pages', v1Pages)

router.use('/pages/:pageId/rows', v1PageRows)
router.use('/pages/:pageId/rows/:rowId/columns', v1PageColumns)
router.use('/pages/:pageId/rows/:rowId/columns/:columnId/images', v1PageImages)
router.use('/pages/:pageId/rows/:rowId/columns/:columnId/texts', v1PageTexts)

// router.use('/pages/:pageId/rows/:rowId/columns/:columnId/images/:imageElementId', v1Pages)
router.use('/images', v1Images)

export default router
