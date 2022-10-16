// @flow
import db from '../database/connection.js'

export const ERRORS = {
  ROW_IS_REFERENCED: -1,
  NOT_FOUND: 0
}

export default {
  async addPageImage (columnId:number, imageId: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('INSERT into imageelements(ColumnID, ImageID) values(?,?)', [columnId, imageId])
      return rows.insertId
    } catch (e) {
      // TODO: catch constraint error
      console.error('Error in pageImageService::addPageImage()', e.message)
      throw e
    }
  },

  async deletePageImage (id: number) : Promise<any> {
    try {
      const connection = await db()
      // TODO: update the sql to check pageId, columnid and rowid as well
      const [rows] = await connection.query('DELETE FROM imageelements WHERE id=?;', [id])
      return rows.affectedRows
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        return ERRORS.ROW_IS_REFERENCED
      } else {
        console.error('Error in pageImageService::deletePageImage()', e.message)
        throw e
      }
    }
  }

}
