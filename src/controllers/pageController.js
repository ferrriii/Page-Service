import pageService, { ERRORS } from '../services/pageService.js'

export default {
  async getAllPages (req, res) {
    try {
      res.send({ status: 'OK', data: await pageService.getAllPages() })
    } catch (e) {
      console.error('Error in pageController::getAllPages()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async getOnePage (req, res) {
    // @flow
    const id = parseInt(req.params.pageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad page ID' })
    }

    try {
      const img = await pageService.getOnePage(id)
      if (img) {
        res.send({ status: 'OK', data: img })
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      }
    } catch (e) {
      console.error('Error in pageController::getOnePage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async addPage (req, res) {
    // @flow
    const title = req.body.title
    if (!title) {
      return res.status(400).json({ status: 'ERROR', error: 'title cannot be empty' })
    }

    try {
      const id = await pageService.addPage(title)
      res.send({ status: 'OK', data: { id } })
    } catch (e) {
      console.error('Error in pageController::addPage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async UpdatePage (req, res) {
    // @flow
    const id = parseInt(req.params.pageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad page ID' })
    }
    const title = req.body.title
    if (!title) {
      return res.status(400).json({ status: 'ERROR', error: 'URL cannot be empty' })
    }

    try {
      const response = await pageService.updatePage(id, title)
      if (response) {
        res.send({ status: 'OK', data: 'Updated' })
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      }
    } catch (e) {
      console.error('Error in pageController::UpdatePage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async deletePage (req, res) {
    // @flow
    const id = parseInt(req.params.pageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad page ID' })
    }

    try {
      const deleteResults = await pageService.deletePage(id)
      if (deleteResults > 0) {
        res.send({ status: 'OK', data: 'Deleted' })
      } else if (deleteResults === ERRORS.NOT_FOUND) {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      } else if (deleteResults === ERRORS.ROW_IS_REFERENCED) {
        res.status(400).json({ status: 'ERROR', error: 'The page is not empty! Please remove all children including rows, columns and images first.' })
      } else {
        console.error('Unknown delete response in pageController::deletePage()', deleteResults)
        res.status(500).json({ status: 'ERROR', error: 'Unknown error occured' })
      }
    } catch (e) {
      console.error('Error in pageController::deletePage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  }

}
