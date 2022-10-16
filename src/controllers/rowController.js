import rowService, { ERRORS } from '../services/rowService.js'

export default {
  async addRow (req, res) {
    // @flow
    const pageId = parseInt(req.params.pageId)
    // TODO: use libraries like express-validator for validation.
    if (!pageId) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad page ID' })
    }

    try {
      const id = await rowService.addRow(pageId)
      res.send({ status: 'OK', data: { id } })
    } catch (e) {
      console.error('Error in rowController::addRow()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async deleteRow (req, res) {
    // @flow
    const id = parseInt(req.params.rowId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad row ID' })
    }

    try {
      const deleteResults = await rowService.deleteRow(id)
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
