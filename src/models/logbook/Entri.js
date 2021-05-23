import mongoose from 'mongoose'
const Schema = mongoose.Schema
const entriSchema = new Schema({
  tanggal: Date,
  kegiatan: String,
  hasil: String,
  kesan: String
}, {
  timestamps: true
})

export default entriSchema
