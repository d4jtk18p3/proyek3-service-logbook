import mongoose from 'mongoose'
let Schema = mongoose.Schema
let entriSchema = new Schema({
  tanggal: Date,
  kegiatan: String,
  hasil: String,
  kesan: String
}, {
  timestamps: true
})

export default entriSchema
