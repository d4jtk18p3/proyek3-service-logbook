import mongoose from 'mongoose'
var Schema = mongoose.Schema;
var logbookSchema = new Schema({
    nama: String, 
    nim: Integer,
    kelas: String,
    kuliah_proyek: Integer,
    entri: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Entri' }
    ]
}, {
    timestamps: true
});

export default logbookSchema;