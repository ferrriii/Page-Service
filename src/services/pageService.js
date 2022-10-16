// @flow
import db from '../database/connection.js'
import { pageDbRecordsToArray } from '../utils/pagUtils.js'

export const ERRORS = {
  ROW_IS_REFERENCED: -1,
  NOT_FOUND: 0
}

export default {
  async getAllPages () : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query(`
SELECT pages.id pageId, pages.title title, rowcontainer.id rowId, columncontainer.id columnId, columncontainer.RowID parentRowId, images.ID imgId, images.url imgUrl FROM pages 
left JOIN rowcontainer ON rowcontainer.pageid = pages.id
left JOIN columncontainer ON columncontainer.RowID = rowcontainer.ID
left JOIN imageelements ON imageelements.ColumnID = columncontainer.id
left JOIN images ON imageelements.ImageID = images.id
-- WHERE pages.id = 1
UNION 
SELECT pages.id pageId, pages.title title, rowcontainer.id rowId, columncontainer.id columnId, columncontainer.RowID parentRowId, images.ID imgId, images.url imgUrl FROM pages 
right JOIN rowcontainer ON rowcontainer.pageid = pages.id
right JOIN columncontainer ON columncontainer.RowID = rowcontainer.ID
right JOIN imageelements ON imageelements.ColumnID = columncontainer.id
left JOIN images ON imageelements.ImageID = images.id
-- where pages.id = 1
`)
      return pageDbRecordsToArray(rows)
    } catch (e) {
      console.error('Error in pageService::getAllPages()', e.message)
      throw e
    }
  },

  async getOnePage (id: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query(`
SELECT pages.id pageId, pages.title title, rowcontainer.id rowId, columncontainer.id columnId, columncontainer.RowID parentRowId, images.ID imgId, images.url imgUrl FROM pages 
left JOIN rowcontainer ON rowcontainer.pageid = pages.id
left JOIN columncontainer ON columncontainer.RowID = rowcontainer.ID
left JOIN imageelements ON imageelements.ColumnID = columncontainer.id
left JOIN images ON imageelements.ImageID = images.id
WHERE pages.id = ?
UNION 
SELECT pages.id pageId, pages.title title, rowcontainer.id rowId, columncontainer.id columnId, columncontainer.RowID parentRowId, images.ID imgId, images.url imgUrl FROM pages 
right JOIN rowcontainer ON rowcontainer.pageid = pages.id
right JOIN columncontainer ON columncontainer.RowID = rowcontainer.ID
right JOIN imageelements ON imageelements.ColumnID = columncontainer.id
left JOIN images ON imageelements.ImageID = images.id
where pages.id = ?
`, [id, id])
      return pageDbRecordsToArray(rows)[0]
    } catch (e) {
      console.error('Error in pageService::getOnePage()', e.message)
      throw e
    }
  },

  async addPage (title: string) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('INSERT into pages(title) values(?)', [title])
      return rows.insertId
    } catch (e) {
      console.error('Error in pageService::addPage()', e.message)
      throw e
    }
  },

  async updatePage (id: number, title: string): Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('UPDATE pages SET title=? where id=?', [title, id])
      return rows.affectedRows
    } catch (e) {
      console.error('Error in pageService::updatePage()', e.message)
      throw e
    }
  },

  async deletePage (id: number) : Promise<any> {
    try {
      const connection = await db()
      const [rows] = await connection.query('DELETE FROM pages WHERE id=?;', [id])
      return rows.affectedRows
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2') {
        return ERRORS.ROW_IS_REFERENCED
      } else {
        console.error('Error in pageService::deletePage()', e.message)
        throw e
      }
    }
  },

  async purgePage (id: number): any {
    // TODO: remove the page hierachy including all children
    throw new Error('not implemented')
  }

}
