import mongoose from 'mongoose'
let Schema = mongoose.Schema
let logbookSchema = new Schema({
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
