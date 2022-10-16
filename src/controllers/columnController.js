import columnService, { ERRORS } from '../services/columnService.js'

export default {
  async addColumn (req, res) {
    // @flow
    const rowId = parseInt(req.params.rowId)
    // TODO: use libraries like express-validator for validation.
    if (!rowId) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad row ID' })
    }

    try {
      const id = await columnService.addColumn(rowId)
      res.send({ status: 'OK', data: { id } })
    } catch (e) {
      console.error('Error in columnController::addColumn()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async deleteColumn (req, res) {
    // @flow
    const id = parseInt(req.params.columnId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad column ID' })
    }

    try {
      const deleteResults = await columnService.deleteColumn(id)
      if (deleteResults > 0) {
        res.send({ status: 'OK', data: 'Deleted' })
      } else if (deleteResults === ERRORS.NOT_FOUND) {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      } else if (deleteResults === ERRORS.ROW_IS_REFERENCED) {
        res.status(400).json({ status: 'ERROR', error: 'The column is used in some pages. Please first delete pages containing this column.' })
      } else {
        console.error('Unknown delete response in columnController::deleteColumn()', deleteResults)
        res.status(500).json({ status: 'ERROR', error: 'Unknown error occured' })
      }
    } catch (e) {
      console.error('Error in columnController::deleteColumn()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  }

}
