import mongoose from 'mongoose';
import entriSchema from '../../models/logbook/Entri';

entriSchema.statics = {
    postEntri : function(data, cb) {
        console.log(data)
        var Entri = new this(data);
        Entri.save(cb);
    },

    getById: function(query, cb) {
        this.find(query, cb);
    },

    Entri: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },

    deleteEntri: function(query, cb) {
        this.findOneAndDelete(query,cb);
    }
}

var entriModel = mongoose.model('entri', entriSchema);
export default entriModel;