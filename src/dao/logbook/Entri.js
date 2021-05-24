import mongoose from 'mongoose'
import entriSchema from '../../models/logbook/Entri'

entriSchema.statics = {
  postEntri: function (data, cb) {
    console.log(data)
    const Entri = new this(data)
    Entri.save(cb)
  },

  getEntri: function (query, cb) {
    this.find(query, cb)
  },

  updateEntri: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb)
  },

  deleteEntri: function (query, cb) {
    this.findOneAndDelete(query, cb)
  }
}

const entriModel = mongoose.model('entri', entriSchema)
export default entriModel
