import mysql from 'mysql2/promise'

let conn

export default async function () {
  if (conn) return conn
  // create the connection to database
  try {
    conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_DATBASE || 'page'
    })
  } catch (e) {
    console.error('Database Error Occured', e.message)
    throw e
  }

  return conn
}

// export default connection
