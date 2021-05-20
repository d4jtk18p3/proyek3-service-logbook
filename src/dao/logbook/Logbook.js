import mongoose from 'mongoose';
import logbookSchema from '../../models/logbook/Logbook';

logbookSchema.statics = {
    postLogbook : function(data, cb) {
        console.log(data)
        var Logbook = new this(data);
        Logbook.save(cb);
    },

    getById: function(query, cb) {
        this.find(query, cb);
    },

    updateLogbook: function(query, updateData, cb) {
        this.findOneAndUpdate(query, {$set: updateData},{new: true}, cb);
    },
}

var logbookModel = mongoose.model('logbook', logbookSchema);
export default logbookModel;