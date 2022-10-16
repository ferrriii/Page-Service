import imageService, { ERRORS } from '../services/imageService.js'

export default {
  async getAllImages (req, res) {
    try {
      res.send({ status: 'OK', data: await imageService.getAllImages() })
    } catch (e) {
      console.error('Error in imageController::getAllImages()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async getOneImage (req, res) {
    // @flow
    const id = parseInt(req.params.imageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad image ID' })
    }

    try {
      const img = await imageService.getOneImage(id)
      if (img) {
        res.send({ status: 'OK', data: img })
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      }
    } catch (e) {
      console.error('Error in imageController::getOneImage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async addImage (req, res) {
    // @flow
    const url = req.body.url
    if (!url) {
      return res.status(400).json({ status: 'ERROR', error: 'URL cannot be empty' })
    }

    try {
      const id = await imageService.addImage(url)
      res.send({ status: 'OK', data: { id } })
    } catch (e) {
      console.error('Error in imageController::addImage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async UpdateImage (req, res) {
    // @flow
    const id = parseInt(req.params.imageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad image ID' })
    }
    const url = req.body.url
    if (!url) {
      return res.status(400).json({ status: 'ERROR', error: 'URL cannot be empty' })
    }

    try {
      const img = await imageService.updateImage(id, url)
      if (img) {
        res.send({ status: 'OK', data: 'Updated' })
      } else {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      }
    } catch (e) {
      console.error('Error in imageController::UpdateImage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  },

  async deleteImage (req, res) {
    // @flow
    const id = parseInt(req.params.imageId)
    // TODO: use libraries like express-validator for validation.
    if (!id) {
      return res.status(400).json({ status: 'ERROR', error: 'Bad image ID' })
    }

    try {
      const deleteResults = await imageService.deleteImage(id)
      if (deleteResults > 0) {
        res.send({ status: 'OK', data: 'Deleted' })
      } else if (deleteResults === ERRORS.NOT_FOUND) {
        res.status(404).json({ status: 'ERROR', error: 'Not Found' })
      } else if (deleteResults === ERRORS.ROW_IS_REFERENCED) {
        res.status(400).json({ status: 'ERROR', error: 'The image is used in some pages. Please first delete pages containing this image.' })
      } else {
        console.error('Unknown delete response in imageController::deleteImage()', deleteResults)
        res.status(500).json({ status: 'ERROR', error: 'Unknown error occured' })
      }
    } catch (e) {
      console.error('Error in imageController::deleteImage()', e.message)
      // WARNING: in production, we should display display a general error message for security reasons
      res.status(500).json({ status: 'ERROR', error: e.message })
    }
  }

}
