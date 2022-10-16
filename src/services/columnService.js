// @flow
import db from '../database/connection.js'

export const ERRORS = {
  ROW_IS_REFERENCED: -1,
  NOT_FOUND: 0
}

export default {
  async addColumn (rowId: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('INSERT into columncontainer(RowID) values(?)', [rowId])
      return rows.insertId
    } catch (e) {
      // TODO: catch constraint error
      console.error('Error in columnService::addColumn()', e.code, e.message)
      throw e
    }
  },

  async deleteColumn (id: number) : Promise<any> {
    try {
      const connection = await db()
      // TODO: update the sql to check pageId and columnId as well
      const [rows] = await connection.query('DELETE FROM columncontainer WHERE id=?;', [id])
      return rows.affectedRows
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        return ERRORS.ROW_IS_REFERENCED
      } else {
        console.error('Error in columnService::deleteColumn()', e.message)
        throw e
      }
    }
  }

}
