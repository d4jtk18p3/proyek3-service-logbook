import mongoose from 'mongoose'
const Schema = mongoose.Schema
const logbookSchema = new Schema({
  nama: String,
  nim: String,
  kode_kelas: Number,
  kelas_proyek: String,
  entri: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Entri' }
  ]
}, {
  timestamps: true
})

export default logbookSchema
