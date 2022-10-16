// @flow
import db from '../database/connection.js'

export const ERRORS = {
  ROW_IS_REFERENCED: -1,
  NOT_FOUND: 0
}

export default {
  async getAllImages () : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('SELECT * from images')
      return rows
    } catch (e) {
      console.error('Error in imageService::getAllImages()', e.message)
      throw e
    }
  },

  async getOneImage (id: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('SELECT * from images where id = ? LIMIT 1', [id])
      return rows[0]
    } catch (e) {
      console.error('Error in imageService::getOneImage()', e.message)
      throw e
    }
  },

  async addImage (url: string) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('INSERT into images(url) values(?)', [url])
      return rows.insertId
    } catch (e) {
      console.error('Error in imageService::addImage()', e.message)
      throw e
    }
  },

  async updateImage (id: number, url: string): Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('UPDATE images SET url=? where id=?', [url, id])
      return rows.affectedRows
    } catch (e) {
      console.error('Error in imageService::updateImage()', e.message)
      throw e
    }
  },

  async deleteImage (id: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('DELETE FROM images WHERE id=?;', [id])
      return rows.affectedRows
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        return ERRORS.ROW_IS_REFERENCED
      } else {
        console.error('Error in imageService::deleteImage()', e.message)
        throw e
      }
    }
  }

}
