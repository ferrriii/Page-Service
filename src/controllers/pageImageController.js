import pageImageService, { ERRORS } from '../services/pageImageService.js'

export default {
  async addPageImage (req, res) {
    // @flow
    const columnId = parseInt(req.params.columnId)
    // TODO: use libraries like express-validator for validation.
    if (!columnId) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad column ID' })
    }
    const imageId = parseInt(req.body.imageId)
    // TODO: use libraries like express-validator for validation.
    if (!imageId) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad imageId ID' })
    }

    try {
      const id = await pageImageService.addPageImage(columnId, imageId)
      res.send({ status: 'OK', data: { id } })
    } catch (e) {
      console.error('Error in pageImageController::addPageImage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async deletePageImage (req, res) {
    // @flow
    const id = parseInt(req.params.imageElementId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad image element ID' })
    }

    try {
      const deleteResults = await pageImageService.deletePageImage(id)
      if (deleteResults > 0) {
        res.send({ status: 'OK', data: 'Deleted' })
      } else if (deleteResults === ERRORS.NOT_FOUND) {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      } else if (deleteResults === ERRORS.ROW_IS_REFERENCED) {
        res.status(400).json({ status: 'ERROR', error: 'The row is used in some pages. Please first delete pages containing this row.' })
      } else {
        console.error('Unknown delete response in rowController::deleteRow()', deleteResults)
        res.status(500).json({ status: 'ERROR', error: 'Unknown error occured' })
      }
    } catch (e) {
      console.error('Error in rowController::deleteRow()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  }

}
