// @flow
import db from '../database/connection.js'

export const ERRORS = {
  ROW_IS_REFERENCED: -1,
  NOT_FOUND: 0
}

export default {
  async addRow (pageId: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('INSERT into rowcontainer(PageID) values(?)', [pageId])
      return rows.insertId
    } catch (e) {
      // TODO: catch constraint error
      console.error('Error in rowService::addRow()', e.message)
      throw e
    }
  },

  async deleteRow (id: number) : Promise<any> {
    try {
      const connection = await db()
      // TODO: update the sql to check pageId as well
      const [rows] = await connection.query('DELETE FROM rowcontainer WHERE id=?;', [id])
      return rows.affectedRows
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        return ERRORS.ROW_IS_REFERENCED
      } else {
        console.error('Error in rowService::deleteRow()', e.message)
        throw e
      }
    }
  }

}
