import mongoose from 'mongoose'
const Schema = mongoose.Schema
const logbookSchema = new Schema({
  nama: String,
  nim: Number,
  kelas: String,
  kuliah_proyek: Number,
  entri: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Entri' }
  ]
}, {
  timestamps: true
})

export default logbookSchema
