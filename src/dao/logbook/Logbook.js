import mongoose from 'mongoose'
import logbookSchema from '../../models/logbook/Logbook'

logbookSchema.statics = {
  postLogbook: function (data) {
    return new Promise((resolve, reject) => {
      this.create(data, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            data: result
          })
        }
      })
    })
  },
  getLogbook: function (query) {
    return new Promise((resolve, reject) => {
      this.find(query, (err, documents) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            data: documents
          })
        }
      })
    })
  },

  updateEntriLogbook: function (query, updateData) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate(query, { $set: updateData }, { new: true }, (err, documents) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            data: documents
          })
        }
      })
    })
  }
}

const logbookModel = mongoose.model('logbook', logbookSchema)
export default logbookModel
