export function pageDbRecordsToArray (rows) {
  const pageObject = {}
  rows.forEach(record => {
    pageObject[record.pageId] = {
      ...pageObject[record.pageId],
      id: record.pageId,
      title: record.title,
      rowIds: [
        ...(pageObject[record.pageId]?.rowIds ?? []),
        ...(record.rowId ? [record.rowId] : [])
      ],
      columns: [
        ...(pageObject[record.pageId]?.columns ?? []),
        ...(record.columnId ? [{ id: record.columnId, parentRow: record.parentRowId }] : [])
      ],
      images: [
        ...(pageObject[record.pageId]?.images ?? []),
        ...(record.imgId ? [{ parentColumnId: record.columnId, imageId: record.imgId, imageUrl: record.imgUrl }] : [])
      ]
    }
  })

  return Object.values(pageObject)
}
