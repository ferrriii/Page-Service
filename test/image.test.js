// set test db
process.env.DB_HOST = process.env.DB_TEST_HOST || 'localhost'
process.env.DB_USER = process.env.DB_TEST_USER || 'root'
process.env.DB_PASS = process.env.DB_TEST_PASS || ''
process.env.DB_DATBASE = process.env.DB_TEST_DATBASE || 'page'

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index.js')

// const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

describe('Images Routes', async () => {
  before(async () => {
    console.log('preprating test db. TODO: start transaction')
  })
  after(async () => {
    console.log('cleaning test db. TODO: rollBack transaction')
  })

  it('Image CRUD', async () => {
    // BDD test

    // get initial image count (do not asusme it's 0)
    const listResBefore = await chai.request(app).get('/api/v1/images')
    expect(listResBefore).to.have.status(200)
    expect(listResBefore.body).have.property('data')
    const imageCountBefore = listResBefore.body.data.length

    // add image
    const imgUrl = 'http://imageurl/'
    const resAdd = await chai.request(app).post('/api/v1/images').send({ url: imgUrl })
    expect(resAdd).to.have.status(200)
    expect(resAdd.body).have.property('data').have.property('id').that.is.greaterThan(0)
    const imageId = resAdd.body.data.id

    // check if added image is reflected on the image list
    const listResAfter = await chai.request(app).get('/api/v1/images')
    expect(listResAfter).to.have.status(200)
    expect(listResAfter.body).have.property('data').that.have.lengthOf(imageCountBefore + 1)

    // check if can retrieve image
    const getImageRes = await chai.request(app).get(`/api/v1/images/${imageId}`)
    expect(getImageRes).to.have.status(200)
    expect(getImageRes.body).have.property('data').have.property('ID').that.is.equal(imageId)
    expect(getImageRes.body).have.property('data').have.property('URL').that.is.equal(imgUrl)

    // delete image
    const deleteImageRes = await chai.request(app).delete(`/api/v1/images/${imageId}`)
    expect(deleteImageRes).to.have.status(200)

    // check if deleting the image is reflected on the image list
    const listResAfterDelete = await chai.request(app).get('/api/v1/images')
    expect(listResAfterDelete).to.have.status(200)
    expect(listResAfterDelete.body).have.property('data').that.have.lengthOf(imageCountBefore)

    // check if image does not exist
    const getImageAfterDeletionRes = await chai.request(app).get(`/api/v1/images/${imageId}`)
    expect(getImageAfterDeletionRes).to.have.status(404)
  })
})
