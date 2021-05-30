import mongoose from 'mongoose'
import entriSchema from '../../models/logbook/Entri'
entriSchema.statics = {
  postEntri: function (data) {
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

  getEntri: function (query) {
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

  updateEntri: function (query, updateData) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate(query, { $set: updateData }, { new: true }, (err, result) => {
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

  deleteEntri: function (query) {
    console.log('masuk delete dao')
    return new Promise((resolve, reject) => {
      this.findOneAndDelete(query, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            data: result
          })
        }
      })
    })
  }
}

const entriModel = mongoose.model('entri', entriSchema)
export default entriModel
