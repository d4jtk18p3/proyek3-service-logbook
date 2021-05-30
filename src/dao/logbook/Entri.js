import mongoose from 'mongoose'
import entriSchema from '../../models/logbook/Entri'
entriSchema.statics = {
  // postEntri: function (data, cb) {
  //   console.log(data)
  //   const Entri = new this(data)
  //   Entri.save(cb)
  // },

  postEntri: function (data) {
    return new Promise((resolve, reject) => {
      this.create(data, (err, result) => {
        if (err) {
          reject()
        } else {
          resolve({
            data: result
          })
        }
      })
    })
  },

  // getEntri: function (query, cb) {
  //   this.find(query, cb)
  // },

  getEntri: function (query) {
    return new Promise((resolve, reject) => {
      this.find(query, (err, documents) => {
        if(err) {
          reject()
        } else {
          resolve({
            data: documents
          })
        }
      })
    })
  },

  // updateEntri: function (query, updateData, cb) {
  //   this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb)
  // },

  updateEntri: function (query, updateData) {
    return new Promise((resolve, reject) => {
      this.findOneAndUpdate(query, { $set: updateData }, { new: true }, (err, result) => {
        if(err) {
          reject()
        } else {
          resolve({
            data: result
          })
        }
      })
    })
  },

  deleteEntri: function (query, cb) {
    this.findOneAndDelete(query, cb)
  }
}

// export function getEntri (query) {
//   return new Promise((resolve, reject) => {
//     entris = db.collection('entris')
//     entris.find(query).toArray((err, documents) => {
//       if(err) {
//         reject(err)
//       } else {
//         resolve({
//           data: JSON.stringify(documents),
//           statusCode: (documents.length > 0) ? 200 : 400
//         })
//       }
//     })
//   })
// }

const entriModel = mongoose.model('entri', entriSchema)
export default entriModel
