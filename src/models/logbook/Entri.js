import mongoose from 'mongoose'
var Schema = mongoose.Schema;
var entriSchema = new Schema({
    tanggal: Date, 
    kegiatan: String,
    hasil: String,
    kesan: String,
}, {
    timestamps: true
});

export default entriSchema;
