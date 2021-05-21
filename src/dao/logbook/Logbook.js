import mongoose from 'mongoose'
import logbookSchema from '../../models/logbook/Logbook'

logbookSchema.statics = {
  postLogbook: function (data, cb) {
    console.log(data)
    let Logbook = new this(data)
    Logbook.save(cb)
  },

  getLogbook: function (query, cb) {
    this.find(query, cb)
  },

  updateEntriLogbook: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: { updateData } }, { new: true }, cb)
  }
}

let logbookModel = mongoose.model('logbook', logbookSchema)
export default logbookModel
